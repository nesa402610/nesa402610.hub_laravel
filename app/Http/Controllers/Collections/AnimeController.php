<?php

namespace App\Http\Controllers\Collections;

use App\Http\Controllers\Controller;
use App\Models\HAnime;
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
        foreach ($videos as $video) $video->makeHidden('pivot');
        return response($videos);

    }

    public function addTitle() {

    }

    public function updateAnime(Request $request) {
        $collection = HAnime::find($request->id);
        $collection->title_ru = $request->title_ru;
        $collection->title_en = $request->title_en;
        $collection->title_original = $request->title_original;
        $collection->description = $request->description;
        $collection->description_short = $request->description_short;
        $collection->episode_time = $request->episode_time;
        $collection->censure = $request->censure;
        $collection->image = $request->image;
        $collection->announce_date = $request->announce_date;
        $collection->release_date = $request->release_date;
        $collection->episodes_released = $request->episodes_released;
        $collection->episodes_total = $request->episodes_total;
        $collection->author = $request->author;
        $collection->review = $request->review;
        $collection->save();
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
        if (Auth::user()->id === 1) {
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
