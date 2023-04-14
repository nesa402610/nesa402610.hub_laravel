<?php

namespace App\Http\Controllers\Collections;

use App\Http\Controllers\Controller;
use App\Models\Tags;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TagController extends Controller {
    public function getAllTags() {
        $tags = Tags::orderBy('name')->get();

        return response($tags, 200);
    }

    public function createTag(Request $request) {
        $rules = ['tagName' => ['required', 'unique:tags,name']];
        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $tag = new Tags();
        $tag->name = $request->tagName;
//        $tag->save();
        return response($tag);
    }

    public function updateTag(Request $request) {
        $tag = Tags::find($request->tagId);
        $tag->name = $request->tagName;
        $tag->save();
    }

    public function deleteTag(Request $request) {
        $tag = Tags::find($request->tagId)->delete();
    }

}
