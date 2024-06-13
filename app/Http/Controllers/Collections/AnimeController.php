<?php

namespace App\Http\Controllers\Collections;

use App\Http\Controllers\Controller;
use App\Models\Anime;
use App\Models\AnimeUserStatus;
use App\Models\AnimeVideo;
use App\Models\Tag;
use Auth;
use Illuminate\Http\Request;

class AnimeController extends Controller
{
//    public function setRating(Request $request)
//    {
//        $anime = Anime::find($request->id);
//
//    }
//
//    public function getRandomAnime($limit)
//    {
//        $anime = Anime::inRandomOrder()->limit($limit)->get();
////        $anime = 1;
//
//        return response($anime, 200);
//    }

    public function createAnimeByShiki(Request $request): void
    {
//        return response($request);
        $rating = '';
        if ($request['rating'] === 'g') $rating = '0+';
        elseif ($request['rating'] === 'pg') $rating = '6+';
        elseif ($request['rating'] === 'pg_13') $rating = '13+';
        elseif ($request['rating'] === 'r') $rating = '16+';
        elseif ($request['rating'] === 'r_plus') $rating = '18+';
        elseif ($request['rating'] === 'rx') $rating = 'Rx';
        else $rating = '0+';
        $genres = $request['genres'];

        $animeTitle_ru = $request['russian'];

        $anime = Anime::where('title_ru', $animeTitle_ru)->orWhere('title_original', $request['name'])->first();

//        return response($anime);
        if (!$anime) {
            $anime = new Anime();
        }
        $anime->title_ru = $request['russian'];
        $anime->title_en = $request['english'][0] ?? ' ';
        $anime->title_original = $request['name'];
        $anime->kind = $request['kind'];
        $anime->description = $request['description'];
        $anime->description_short = $request['description_short'];
        $anime->episode_time = $request['duration'];
        $anime->censure = 0;
        $anime->image = 'https://shikimori.me/' . $request['image']['preview'];
        $anime->announce_date = $request['aired_on'];
        $anime->release_date = $request['released_on'];
        $anime->episodes_released = $request['episodes_aired'] === 0 ? $request['episodes'] : $request['episodes_aired'];
        $anime->episodes_total = $request['episodes'];
        $anime->author = null;
        $anime->mal_id = $request['myanimelist_id'];
        $anime->shiki_id = $request['id'];
        $anime->shiki_score = $request['score'];
        $anime->rating = $rating;
        $anime->style = 0;
        $anime->save();

        foreach ($genres as $genre) {
            $tag = Tag::where('name', $genre['russian'])->first();
            $addedTags = $anime->genres;
            if ($tag && !$addedTags->contains('name', $genre['russian'])) {
                $anime->genres()->attach($tag->id);
            }
        }
    }

    public function createAnime(Request $request)
    {
        $anime = new Anime();
        $this->animeFields($request, $anime);
        $anime->save();
        return response($anime);
    }

    public function getAllAnime(): \Illuminate\Foundation\Application|\Illuminate\Http\Response|\Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory
    {
        $anime = Anime::get();
        foreach ($anime as $collection) {
            $collection->tags->makeHidden('pivot');
            $collection->genres->makeHidden('pivot');
            $collection->studios->makeHidden('pivot');
            $collection->status = $collection->animeStatus();
            $collection->videosCount = $collection->links()->count();

        }
        return response($anime, 200);
    }

    public function getRandomAnimeList()
    {
        $query = Anime::query();
        $query->inRandomOrder();

        $currentYear = date('Y');
        $userBirthday = Auth::user()->birthday ?? $currentYear;
        $userYear = date('Y', strtotime($userBirthday));
        $userOld = $currentYear - $userYear;
        if ($userOld < 18) {
            $query->where('rating', '!=', 'Rx');
        }
//        $query->whereDoesntHave('status', function ($query) {
//           $query->whereIn('status', 4);
//        });

        $anime = $query->limit(10)->get();

        foreach ($anime as $collection) {
//            $collection->tags->makeHidden('pivot');
//            $collection->genres->makeHidden('pivot');
//            $collection->studios->makeHidden('pivot');
            $collection->status = $collection->animeStatus();
//            $collection->videosCount = $collection->links()->count();
        }

        return response($anime);
    }

    public function getAnimeDuplies()
    {
        $anime = Anime::all();
        $animeUniq = $anime->unique('title_original');
        $duplies = $anime->diff($animeUniq);

        return response($duplies);
    }

    public function deleteDupliesAnime(Request $request)
    {
        $anime = Anime::all();
        $animeUniq = $anime->unique('title_original');
        $duplies = $anime->diff($animeUniq);
        foreach ($duplies as $duplie) {
            $tags = $duplie->tags;
            foreach ($tags as $tag) {
                $duplie->genres()->detach($tag->id);
                $duplie->tags()->detach($tag->id);
            }
            $duplie->delete();
        }
    }

    public function getPaginatedAnime(Request $request)
    {
        $tags = $request->tags;
        $title = $request->title;
        $rating = $request->rating;
        $IPP = $request->IPP ?? 15;
        $sort = $request->sort ?? 'id';
        $years = $request->years;
        $kind = $request->kind;

        $query = Anime::query();
        if (!empty($title)) {
            $query->where(function ($query) use ($title) {
                $query->where('title_ru', 'like', '%' . $title . '%')
                    ->orWhere('title_en', 'like', '%' . $title . '%')
                    ->orWhere('title_original', 'like', '%' . $title . '%');
            });
        }
        if (!empty($years)) {
            $query->whereYear('release_date', '>=', $years['start'])->whereYear('release_date', '<=', $years['end']);
        }
        if (!empty($tags)) {
            $query->whereHas('tags', function ($query) use ($tags) {
                $query->whereIn('name', $tags);
            })
                ->orWhereHas('genres', function ($query) use ($tags) {
                    $query->whereIn('name', $tags);
                });
        }
        if (!empty($rating)) {
            $query->where('rating', $rating);
        }
        if (!empty($sort)) {
            if ($sort === 'release_date') {
                $query->orderByDesc($sort);
            } else $query->orderBy($sort);
        }
        //тип сортировки OVA, TV, MUSIC ...
        if ($kind) {
            $query->where('kind', 'like', $kind);
        }

        $currentYear = date('Y');
        $userBirthday = Auth::user()->birthday ?? $currentYear;
        $userYear = date('Y', strtotime($userBirthday));
        $userOld = $currentYear - $userYear;
        if ($userOld < 18) {
            $query->where('rating', '!=', 'Rx');
        }

        $collections = $query->paginate($IPP);

        foreach ($collections as $collection) {
            $collection->tags->makeHidden('pivot');
            $collection->genres->makeHidden('pivot');
//            $collection->studios->makeHidden('pivot');
            $collection->status = $collection->animeStatus();
//            $collection->videosCount = $collection->videos()->count();
        }
        return response($collections, 200);
    }

    public function getAnimeById($id)
    {
        $collection = Anime::find($id);
        $collection->tags->makeHidden('pivot');
        $collection->genres->makeHidden('pivot');
//        $collection->studios->makeHidden('pivot');
//        $collection->ratings = $collection->ratings();
        $collection->videosCount = $collection->videos()->count();

        return response($collection, 200);
    }

    public function getAnimeVideos($id)
    {
//        $passkey = $this->checkPasskey($request);
//        if ($passkey) {
        $videos = Anime::find($id)->videos()->orderBy('episode')->get();
        if ($videos->isEmpty()) return response(null);
        return response($videos);
//        }
    }

    public function deleteAnimeVideo($id)
    {
        $videos = AnimeVideo::find($id)->delete();
    }

    public function setAnimeStatus(Request $request)
    {
        $animeUserStatus = AnimeUserStatus::where('anime_id', $request->animeID)
            ->where('user_id', Auth::user()->id)
            ->first();
        if (!$animeUserStatus) {
            $animeUserStatus = new AnimeUserStatus();
            $animeUserStatus->anime_id = $request->animeID;
            $animeUserStatus->user_id = Auth::user()->id;
        }
        $animeUserStatus->status = $request->status;
        $animeUserStatus->save();

        return response(['userStatus' => $animeUserStatus]);

    }

    public function updateAnime(Request $request)
    {
        $requestAnime = $request['anime'];
        $requestVideos = $request->videos;
        $anime = Anime::find($requestAnime['id']);

        $this->animeFields($request['anime'], $anime);
        $anime->save();

        if ($requestVideos) {
            foreach ($requestVideos as $video) {
                $videoEdit = AnimeVideo::find($video['id']);
                if ($videoEdit) {
                    $videoEdit->link = $video['link'];
                    $videoEdit->platform = $video['platform'];
                    $videoEdit->iframe = $video['iframe'];
                    $videoEdit->episode = $video['episode'];
                    $videoEdit->save();
                } else {
                    $newVideo = new AnimeVideo();
                    $newVideo->link = $video['link'];
                    $newVideo->platform = $video['platform'];
                    $newVideo->iframe = $video['iframe'];
                    $newVideo->episode = $video['episode'];
                    $newVideo->save();;
                    $anime->links()->attach($newVideo->id);
                }
            }
        }
    }

    public function addTag(Request $request)
    {
        $tagType = $request->tagType;
        $titleId = $request->titleId;
        $collection = Anime::find($titleId);
        $tagId = $request->tagId;
//return [$collection->tags, $collection->genres];
        if ($tagType === 'genre') {
            if ($collection->tags->contains('genre_id', $tagId)) {
                $collection->tags()->detach($tagId);
            }
            $collection->genres()->attach($tagId);
        } else {
            if ($collection->genres->contains('tag_id', $tagId)) {
                $collection->genres()->detach($tagId);
            }
            $collection->tags()->attach($tagId);
//            return [$collection->genres->contains('id', '=', $tagId)];
        }
    }

    public function removeTag(Request $request)
    {
        $collection = Anime::find($request->titleId);
        $tagType = $request->tagType;
        if ($tagType === 'genre') $collection->genres()->detach($request->tagId);
        else $collection->tags()->detach($request->tagId);
    }

    public function setWatchedEpisode($id, $symbol)
    {
        $anime = Anime::find($id);
        $animeStatus = $anime->animeStatus()->first();
        $totalEp = $anime->episodes_total;
        $userWatchedEps = $animeStatus->watched_episodes ?? 0;
        $status = $animeStatus->status ?? null;

        if ($symbol === 'plus') {
            if (is_null($animeStatus)) {
                $newStatus = new AnimeUserStatus();
                $newStatus->anime_id = $id;
                $newStatus->user_id = Auth::user()->id;
                $newStatus->watched_episodes = 1;
                if ($totalEp === 1) {
                    $newStatus->status = 6;
                } else $newStatus->status = 1;
                $newStatus->save();
                return ['userStatus' => $newStatus];
            } else {
                if ($totalEp > $userWatchedEps) {
                    $animeStatus->watched_episodes += 1;
                }
                if ($status !== 0) {
                    if (!$anime->animeStatus() || $userWatchedEps - 1 !== $totalEp) {
                        $animeStatus->status = 1;
                    }
                    if ($totalEp === $userWatchedEps + 1) {
                        $animeStatus->status = 6;
                    }
                }
            }

        } else {
            if ($userWatchedEps > 0) {
                $animeStatus->watched_episodes -= 1;
            }
            if ($status !== 0) {
                if ($userWatchedEps - 1 !== $totalEp) {
                    $animeStatus->status = 1;
                }
                if ($userWatchedEps - 1 === 0) {
                    $animeStatus->status = 2;
                }
            }
        }
        $animeStatus->save();
//        $anime->animeStatus()->save();
//        $anime->save();
//        $this->setAnimeStatus(new Request(['animeID' => $id, 'status' => $status]));
        return ['userStatus' => $animeStatus];
    }

    public function setAnimeScore(Request $request)
    {
        $userScore = AnimeUserStatus::where('user_id', Auth::user()->id)->where('anime_id', $request->id)->first();
        if ($userScore) {
            $userScore->score = $request->score;
            $userScore->save();
        } else {
            $newScore = new AnimeUserStatus();
            $newScore->anime_id = $request->id;
            $newScore->user_id = Auth::user()->id;
            $newScore->score = $request->score;
            $newScore->save();
        }
        return ['userStatus' => $userScore];
    }

    public function shikimoriHostUpdate(Request $request)
    {
        $newHost = $request->newHost;
        $curHost = $request->currentHost;
        $allCollections = Anime::all();
        foreach ($allCollections as $collection) {
            $collection->image = str_replace($curHost, $newHost, $collection->image);
            $collection->save();
        }
        return ['ok'];
    }

    /**
     * @param Request $request
     * @param Anime $anime
     * @return void
     */
    public
    function animeFields($request, Anime $anime): void
    {
        $anime->title_ru = $request['title_ru'];
        $anime->title_en = $request['title_en'];
        $anime->title_original = $request['title_original'];
        $anime->description = $request['description'];
        $anime->description_short = $request['description_short'];
        $anime->episode_time = $request['episode_time'];
        $anime->censure = $request['censure'];
        $anime->image = $request['image'];
        $anime->announce_date = $request['announce_date'];
        $anime->release_date = $request['release_date'];
        $anime->episodes_released = $request['episodes_released'];
        $anime->episodes_total = $request['episodes_total'];
        $anime->kind = $request['kind'];
        $anime->author = $request['author'];
        $anime->review = $request['review'];
        $anime->rating = $request['rating'];
        $anime->style = $request['style'];
    }
}
