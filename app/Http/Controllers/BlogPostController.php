<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BlogPostController extends Controller
{
    public function getAllPosts() {
        $posts = BlogPost::orderBy('id', 'desc')->get();
        return response($posts, 200);
    }

    public function createPost(Request $request) {
        $post = new BlogPost;

        $post->user_id = Auth::user()->id;
        $post->title = $request->title;
        $post->body = $request->body;
        $post->save();
        return response($post);
    }

    public function updatePost(Request $request) {
        $post = BlogPost::find($request->id);
        $post->title = $request->title;
        $post->body = $request->body;
        $post->save();
        return response($post, 201);
    }

    public function deletePost(Request $request) {
        $post = BlogPost::find($request->id);
        $post->delete();
    }
}
