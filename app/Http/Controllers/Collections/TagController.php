<?php

namespace App\Http\Controllers\Collections;

use App\Http\Controllers\Controller;
use App\Models\Tag;
use Illuminate\Http\Request;

class TagController extends Controller
{
    public function getAllTags()
    {
        $tags = Tag::orderBy('name')->get();

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
        $tag = new Tag();
        $tag->name = $request->name;
        $tag->type = $request->type;
        $tag->save();
    }

    public function updateTag(Request $request)
    {
        $tag = Tag::find($request->id);
        $tag->name = $request->name;
        $tag->type = $request->type;
        $tag->save();
    }

    public function deleteTag(Request $request)
    {
        $tag = Tag::find($request->id)->delete();
    }

}
