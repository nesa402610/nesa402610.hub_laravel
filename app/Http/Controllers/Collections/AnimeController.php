<?php

namespace App\Http\Controllers\Collections;

use App\Http\Controllers\Controller;
use App\Models\AnimeUserStatus;
use App\Models\HAnime;
use App\Models\HLinks;
use App\Models\Passkey;
use App\Models\Tags;
use Auth;
use Illuminate\Http\Request;

class AnimeController extends Controller
{
    public function getRandomAnime($limit)
    {
        $anime = HAnime::inRandomOrder()->limit($limit)->get();
//        $anime = 1;

        return response($anime, 200);
    }

    public function createAnimeByShiki(Request $request)
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

        $anime = HAnime::where('title_ru', $animeTitle_ru)->first();

//        return response($anime);
        if (!$anime) {
            $anime = new HAnime();
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
        $anime->release_date = $request['aired_on'];
        $anime->episodes_released = ($request['episodes'] ?? $request['episodes_aired']) - $request['episodes_aired'];
        $anime->episodes_total = $request['episodes'];
        $anime->author = null;
        $anime->review = '';
        $anime->rating = $rating;
        $anime->style = 0;
        $anime->type = 0;
        $anime->save();

        if ($request['rating'] !== 'rx') {
            $anime->tags()->detach();
        }
        foreach ($genres as $genre) {
            $tag = Tags::where('name', $genre['russian'])->first();
            $addedTags = $anime->tags;
            if ($tag && !$addedTags->contains('name', $genre['russian'])) {
                $anime->tags()->attach($tag->id);
            }
        }
    }

    public function createAnime(Request $request)
    {
        $anime = new HAnime();
        $this->animeFields($request, $anime);
        $anime->save();
        return response($anime);
    }

    public function getAllAnime()
    {
        $anime = HAnime::where('type', 0)->get();
        foreach ($anime as $collection) {
            $collection->tags->makeHidden('pivot');
            $collection->studios->makeHidden('pivot');
            $collection->status = $collection->animeStatus();
            $collection->videosCount = $collection->links()->count();

        }
        return response($anime, 200);
    }

    public function getAnimeDuplies()
    {
        $anime = HAnime::where('type', 0)->get();
        $animeUniq = $anime->unique('title_original');
        $duplies = $anime->diff($animeUniq);

        return response($duplies);
    }

    public function deleteDupliesAnime(Request $request)
    {
        $anime = HAnime::where('type', 0)->get();
        $animeUniq = $anime->unique('title_original');
        $duplies = $anime->diff($animeUniq);
        $arrTags = [];
        foreach ($duplies as $duplie) {
            $tags = $duplie->tags;
            array_push($arrTags, $tags);
            foreach ($tags as $tag) {
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

        $query = HAnime::query();
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
            }, '=', count($tags));
        }
        if (!empty($rating)) {
            $query->where('rating', $rating);
        }
        if (!empty($sort)) {
            if ($sort === 'release_date') {
                $query->orderByDesc($sort);
            } else $query->orderBy($sort);
        }
        //тип сортировки
        if ($kind) {
            $query->where('kind', 'like', $kind);
        }
        //тип отвечает за аниме - 0 / мангу - 1
        $query->where('type', 0);

        $collections = $query->paginate($IPP);

        foreach ($collections as $collection) {
            $collection->tags->makeHidden('pivot');
            $collection->studios->makeHidden('pivot');
            $collection->status = $collection->animeStatus();
            $collection->videosCount = $collection->links()->count();
        }
        return response($collections, 200);
    }

    public function getAnimeById($id)
    {
        $collection = HAnime::find($id);
        $collection->tags->makeHidden('pivot');
        $collection->studios->makeHidden('pivot');
        $collection->status = $collection->animeStatus();
        $collection->videosCount = $collection->links()->count();

        return response($collection, 200);
    }

    public function getAnimeVideos($id)
    {
//        $passkey = $this->checkPasskey($request);
//        if ($passkey) {
        $videos = HAnime::find($id)->links()->orderBy('episode')->get();
        if ($videos->isEmpty()) return response(null);
        return response($videos);
//        }
    }

    public function deleteAnimeVideo($id)
    {
        $videos = HLinks::find($id)->delete();
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

    }

    public function updateAnime(Request $request)
    {
        $requestAnime = $request['anime'];
        $requestVideos = $request->videos;
        $anime = HAnime::find($requestAnime['id']);

        $this->animeFields($request['anime'], $anime);
        $anime->save();

        if ($requestVideos) {
            foreach ($requestVideos as $video) {
                $videoEdit = HLinks::find($video['id']);
                if ($videoEdit) {
                    $videoEdit->link = $video['link'];
                    $videoEdit->platform = $video['platform'];
                    $videoEdit->iframe = $video['iframe'];
                    $videoEdit->episode = $video['episode'];
                    $videoEdit->save();
                } else {
                    $newVideo = new HLinks();
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
        $collection = HAnime::find($request->titleId);
        $collection->tags()->attach($request->tagId);
    }

    public function removeTag(Request $request): void
    {
        $collection = HAnime::find($request->titleId);
        $collection->tags()->detach($request->tagId);
    }

    public function checkPasskey(Request $request)
    {
//        if (Auth::check()) {
//            if (Auth::user()->id === 1)
//                return [1];
//        }
        $passkey = Passkey::where('passkey', str_replace(' ', '', $request->passkey))
            ->first();
        if ($passkey) return true;
        return false;
//
//        if (count($exist) === 0) {
//            return response(['msg' => 'Ключ не рабочий. Ключ можно получить только через меня или спроси у друга, пока я не пофиксил доступ'], 403);
//        }
    }

    /**
     * @param Request $request
     * @param HAnime $anime
     * @return void
     */
    public function animeFields($request, HAnime $anime): void
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
        $anime->type = 0;
    }
}
