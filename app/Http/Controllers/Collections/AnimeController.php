<?php

namespace App\Http\Controllers\Collections;

use App\Http\Controllers\Controller;
use App\Models\HCollection;
use App\Models\HManga;
use App\Models\Passkey;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AnimeController extends Controller {
    public function getAllAnime(Request $request) {
        $exist = $this->checkPasskey($request);
        if (count($exist) !== 0) {
            $collections = HCollection::paginate(5);
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
            $collection = HCollection::find($id);
            $collection->tags->makeHidden('pivot');
            $collection->links->makeHidden('pivot');
            $collection->studios->makeHidden('pivot');
            return response($collection, 200);
        }
        return response('Какая-то ошибка');
    }

    public function addTitle() {

    }

    public function updateTitle(Request $request) {
        $collection = HCollection::find($request->id);
        $collection->title_ru = $request->title_ru;
        $collection->title_original = $request->title_original;
        $collection->episode_time = $request->episode_time;
        $collection->episodes_released = $request->episodes_released;
        $collection->episodes_total = $request->episodes_total;
        $collection->save();
        return response($collection, 201);
    }

    public function addTag(Request $request) {
        $collection = HCollection::find($request->titleId);
        $collection->tags()->attach($request->tagId);
    }
    public function removeTag(Request $request) {
        $collection = HCollection::find($request->titleId);
        $collection->tags()->detach($request->tagId);
    }

    public function checkPasskey(Request $request) {
        $exist = Passkey::where('passkey', str_replace(' ', '', $request->passkey))
            ->get();
//
//        if (count($exist) === 0) {
//            return response(['msg' => 'Ключ не рабочий. Ключ можно получить только через меня или спроси у друга, пока я не пофиксил доступ'], 403);
//        }
        return $exist;
    }
}
