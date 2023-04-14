<?php

namespace App\Http\Controllers\Collections;

use App\Http\Controllers\Controller;
use App\Models\HAnime;
use App\Models\HManga;
use App\Models\Passkey;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class MangaController extends Controller {
//    public function addTagToCollection(Request $request) {
//        $collection = HCollection::find($request->titleId);
//        $collection->tags()->attach($request->tagId);
//    }

//    public function deleteTagFromCollection(Request $request) {
//        $collection = HCollection::find($request->titleId);
//        $collection->tags()->detach($request->tagId);
//    }


//    public function generatePasskey(Request $request) {
//        $model = new Passkey();
//        $model->passkey = Str::random(18);
//        $model->uses_left = $request->uses ?? null;
//        $model->expire_at = $request->expire ?? null;
//        $model->save();
//        return response('Generated', 201);
//    }
//
//    public function getAllPasskeys() {
//        if (Auth::user()->id === 1) {
//            $passkeys = Passkey::all();
//            return response($passkeys, 200);
//        } else {
//            return response('Пошел вон!', 871);
//        }
//    }

    public function getAllManga(Request $request) {
        $manga = HManga::all();
        foreach ($manga as $collection) {
            $collection->tags;
//                    $collection->links->makeHidden('pivot');
//                    $collection->studios->makeHidden('pivot');
        }
        return response($manga, 200);
    }

    public function getPaginatedManga(Request $request) {
        $exist = $this->checkPasskey($request);
        if (count($exist) !== 0) {
            $collections = HManga::paginate(5);
            foreach ($collections as $collection) {
                $collection->tags;
//                    $collection->links->makeHidden('pivot');
//                    $collection->studios->makeHidden('pivot');
            }
            return response($collections, 200);
        }
        return response('Какая-то ошибка');
    }

    public function getMangaById(Request $request, $id) {
        $exist = $this->checkPasskey($request);
        if (count($exist) !== 0) {
            $collection = HManga::find($id);
            $files = Storage::files('m/' . $collection->id);
            $pages = [];
            $i = 1;
            foreach ($files as $file) {
                $pages[] = [
                    'file_link' => Storage::temporaryUrl($file, now()->addMinute(5)),
                    'pageNumber' => $i++
                ];
            }
            $collection->pages = $pages;
            return response($collection, 200);
//            return response(['msg' => 'Ключ рабочий, наслаждайся', 'status' => 'valid', '1' => $exist], 200);
        }
        return response('Какая-то ошибка');
    }

    public function addTag(Request $request) {
        $collection = HAnime::find($request->titleId);
        $collection->tags()->attach($request->tagId);
    }

    public function getMangaPages(Request $request) {

    }

    public function addTitle() {

    }

//    public function updateTitle(Request $request) {
//        $collection = HCollection::find($request->id);
//        $collection->title_ru = $request->title_ru;
//        $collection->title_original = $request->title_original;
//        $collection->episode_time = $request->episode_time;
//        $collection->episodes_released = $request->episodes_released;
//        $collection->episodes_total = $request->episodes_total;
//        $collection->save();
//        return response($collection, 201);
//    }

    public function checkPasskey(Request $request) {
        $exist = Passkey::where('passkey', str_replace(' ', '', $request->passkey))->get();

        return $exist;
    }
}
