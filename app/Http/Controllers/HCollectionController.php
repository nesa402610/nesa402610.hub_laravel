<?php

namespace App\Http\Controllers;

use App\Models\HCollection;
use App\Models\Passkey;
use App\Models\Tags;
use Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Str;


class HCollectionController extends Controller {
//    public function validatePasskey(Request $request) {
//        $exist = Passkey::where('passkey', str_replace(' ', '', $request->passkey))->get();
////        return response(['empty' => count($exist) === 0, 'cols'=>$exist]);
//        if (count($exist) === 0) {
//            return response(['msg' => 'Ключ не рабочий, наслаждайся', 'status' => 'valid', '1' => $exist, 'key' => str_replace(' ', '', $request->passkey)], 403);
//        }
//        if (count($exist) !== 0) return response(['msg' => 'Ключ рабочий, наслаждайся', 'status' => 'valid', '1' => $exist], 200);
//    }
    public function addTagToCollection(Request $request) {
        $collection = HCollection::find($request->titleId);
        $collection->tags()->attach($request->tagId);
    }
    public function deleteTagFromCollection(Request $request) {
        $collection = HCollection::find($request->titleId);
        $collection->tags()->detach($request->tagId);
    }

    public function getAllTags() {
        $tags = Tags::orderBy('name')->get();

        return response($tags, 200);
    }

    public function generatePasskey(Request $request) {
        $model = new Passkey();
        $model->passkey = Str::random(18);
        $model->uses_left = $request->uses ?? null;
        $model->expire_at = $request->expire ?? null;
        $model->save();
        return response('Generated', 201);
    }

    public function getAllPasskeys() {
        if (Auth::user()->id === 1) {
            $passkeys = Passkey::all();
            return response($passkeys, 200);
        } else {
            return response('Пошел вон!', 871);
        }
    }


    public function getAllTitles(Request $request) {
        $exist = Passkey::where('passkey', str_replace(' ', '', $request->passkey))->get();
//        return response(['empty' => count($exist) === 0, 'cols'=>$exist]);
        if (count($exist) === 0) {
            return response(['msg' => 'Ключ не рабочий, наслаждайся', 'status' => count($exist), '1' => $exist, 'key' => str_replace(' ', '', $request->passkey)], 403);
        }
        if (count($exist) !== 0) {
            $collections = HCollection::all();
            foreach ($collections as $collection) {
                $collection->tags->makeHidden('pivot');
                $collection->links->makeHidden('pivot');
                $collection->studios->makeHidden('pivot');
//            foreach ($collection->tags as $tag) {
//            }
            }
            return response($collections, 200);
//            return response(['msg' => 'Ключ рабочий, наслаждайся', 'status' => 'valid', '1' => $exist], 200);
        }
        return response('Какая-то ошибка');
    }

    public function addTitle() {

    }

    public function updateTitle() {

    }
}
