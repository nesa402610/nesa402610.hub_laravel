<?php

namespace App\Http\Controllers\Collections;

use App\Http\Controllers\Controller;
use App\Models\HAnime;
use App\Models\HLinks;
use App\Models\Passkey;
use Auth;
use Illuminate\Http\Request;

class AnimeController extends Controller {
    public function getAllAnime() {
        $anime = HAnime::all();
        foreach ($anime as $collection) {
            $collection->tags->makeHidden('pivot');
            $collection->studios->makeHidden('pivot');
        }
        return response($anime, 200);

    }

    public function getPaginatedAnime(Request $request) {
        $exist = $this->checkPasskey($request);
        if (count($exist) !== 0) {
            $collections = HAnime::paginate(5);
            foreach ($collections as $collection) {
                $collection->tags->makeHidden('pivot');
                $collection->studios->makeHidden('pivot');
            }
            return response($collections, 200);
        }
        return response('Какая-то ошибка');
    }

    public function getAnimeById(Request $request, $id) {
        $exist = $this->checkPasskey($request);
        if (count($exist) !== 0) {
            $collection = HAnime::find($id);
            $collection->tags->makeHidden('pivot');
            $collection->studios->makeHidden('pivot');
            return response($collection, 200);
        }
        return response('Какая-то ошибка');
    }

    public function getAnimeVideos($id) {
        $videos = HAnime::find($id)->links;
        if ($videos->isEmpty()) return response(null);
        return response($videos);
    }
    public function deleteAnimeVideo($id) {

        $videos = HLinks::find($id)->delete();
    }
    public function addTitle() {

    }

    public function updateAnime(Request $request) {
        $requestAnime = $request['anime'];
        $requestVideos = $request->videos;
        $anime = HAnime::find($requestAnime['id']);

        $anime->title_ru = $requestAnime['title_ru'];
        $anime->title_en = $requestAnime['title_en'];
        $anime->title_original = $requestAnime['title_original'];
        $anime->description = $requestAnime['description'];
        $anime->description_short = $requestAnime['description_short'];
        $anime->episode_time = $requestAnime['episode_time'];
        $anime->censure = $requestAnime['censure'];
        $anime->image = $requestAnime['image'];
        $anime->announce_date = $requestAnime['announce_date'];
        $anime->release_date = $requestAnime['release_date'];
        $anime->episodes_released = $requestAnime['episodes_released'];
        $anime->episodes_total = $requestAnime['episodes_total'];
        $anime->author = $requestAnime['author'];
        $anime->review = $requestAnime['review'];
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

    public function addTag(Request $request) {
        $collection = HAnime::find($request->titleId);
        $collection->tags()->attach($request->tagId);
    }

    public function removeTag(Request $request) {
        $collection = HAnime::find($request->titleId);
        $collection->tags()->detach($request->tagId);
    }

    public function checkPasskey(Request $request) {
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
}
