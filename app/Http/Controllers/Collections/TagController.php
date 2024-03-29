<?php

namespace App\Http\Controllers\Collections;

use App\Http\Controllers\Controller;
use App\Models\Tags;
use Illuminate\Http\Request;

class TagController extends Controller
{
    public function getAllTags()
    {
        $tags = Tags::orderBy('name')->get();

        return response($tags, 200);
    }

    public function createTag(Request $request)
    {
////        $rules = ['name' => ['required', 'unique:tags,name']];
////        $validator = Validator::make($request->name, $rules);
        $request->validate([
            'name' => ['required', 'unique:tags,name'],
        ]);
////        if ($validator->fails()) {
////            return response()->json(['errors' => $validator->errors()], 422);
////        }
///
        $tag = new Tags();
        $tag->name = $request->name;
        $tag->type = $request->type;
        $tag->save();
    }

    public function updateTag(Request $request)
    {
        $tag = Tags::find($request->id);
        $tag->name = $request->name;
        $tag->type = $request->type;
        $tag->save();
    }

    public function deleteTag(Request $request)
    {
        $tag = Tags::find($request->id)->delete();
    }

}
