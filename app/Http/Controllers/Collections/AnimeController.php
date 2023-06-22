<?php

namespace App\Http\Controllers\Collections;

use App\Http\Controllers\Controller;
use App\Models\AnimeUserStatus;
use App\Models\HAnime;
use App\Models\HLinks;
use App\Models\Passkey;
use Auth;
use Illuminate\Http\Request;

class AnimeController extends Controller
{
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
        }
        return response($anime, 200);

    }

    public function getPaginatedAnime(Request $request)
    {
        $exist = $this->checkPasskey($request);
        if (count($exist) !== 0) {
            $tags = $request->tags;
            $title = $request->title;

            $query = HAnime::query();

            if (!empty($title)) {
                $query->where(function ($query) use ($title) {
                    $query->where('title_ru', 'like', '%' . $title . '%')
                        ->where('type', 0)
                        ->orWhere('title_en', 'like', '%' . $title . '%')
                        ->orWhere('title_original', 'like', '%' . $title . '%');
                });
            }

            if (!empty($tags)) {
                $query->whereHas('tags', function ($query) use ($tags) {
                    $query->whereIn('name', $tags);
                }, '=', count($tags));
            }

            $collections = $query->where('type', 0)->paginate(5);

            foreach ($collections as $collection) {
                $collection->tags->makeHidden('pivot');
                $collection->studios->makeHidden('pivot');
                $collection->status = $collection->animeStatus();
            }
            return response($collections, 200);
        }
        return response('Какая-то ошибка');
    }

    public function getAnimeById(Request $request, $id)
    {
        $exist = $this->checkPasskey($request);
        if (count($exist) !== 0) {
            $collection = HAnime::find($id);
            $collection->tags->makeHidden('pivot');
            $collection->studios->makeHidden('pivot');
            $collection->status = $collection->animeStatus();
            return response($collection, 200);
        }
        return response('Какая-то ошибка');
    }

    public function getAnimeVideos($id)
    {
        $videos = HAnime::find($id)->links;
        if ($videos->isEmpty()) return response(null);
        return response($videos);
    }

    public function deleteAnimeVideo($id)
    {

        $videos = HLinks::find($id)->delete();
    }

    public function addTitle()
    {

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
                if (isset($video['id'])) {
                    $videoEdit = HLinks::find($video['id']);
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

    public function removeTag(Request $request)
    {
        $collection = HAnime::find($request->titleId);
        $collection->tags()->detach($request->tagId);
    }

    public function checkPasskey(Request $request)
    {
        if (Auth::check()) {
            if (Auth::user()->id === 1)
                return [1];
        }
        $exist = Passkey::where('passkey', str_replace(' ', '', $request->passkey))
            ->get();
//
//        if (count($exist) === 0) {
//            return response(['msg' => 'Ключ не рабочий. Ключ можно получить только через меня или спроси у друга, пока я не пофиксил доступ'], 403);
//        }
        return $exist;
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
        $anime->author = $request['author'];
        $anime->review = $request['review'];
        $anime->rating = $request['rating'];
        $anime->style = $request['style'];
        $anime->type = 0;
    }
}
