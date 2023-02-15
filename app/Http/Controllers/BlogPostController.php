<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BlogPostController extends Controller {
    public function getAllPosts() {
        $posts = BlogPost::orderBy('id', 'desc')->get();
        foreach ($posts as $post) {
            $post->comments;
            foreach ($post->comments as $comment) {
                $comment->user;
            }
        }
        return response($posts, 200);
    }

    public function getPostById($id) {
        $post = BlogPost::find($id);
        $post->comments;
        foreach ($post->comments as $comment) {
            $comment->user;
        }
        return response($post, 200);
    }

    public function createComment(Request $request) {
        $comment = new Comment;

        $comment->user_id = Auth::user()->id;
        $comment->post_id = $request->postId;
        $comment->body = $request->comment;
        $comment->user;
        $comment->save();
        return response($comment, 201);
    }

    public function editComment(Request $request) {
        $comment = Comment::find($request->id);
        $comment->body = $request->comment;
        $comment->save();

        return response($comment, 201);

    }

    public function deleteComment(Request $request) {
        $comment = Comment::find($request->id);
        $comment->delete();
//        return response()->status(201);

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
        $post->body = $request->comment;
        $post->save();
        $post->comments;
        foreach ($post->comments as $comment) {
            $comment->user;
        }
        return response($post, 201);
    }

    public function deletePost(Request $request) {
        $post = BlogPost::find($request->id);
        $post->delete();
    }

    public function visibility(Request $request) {
        $post = BlogPost::find($request->id);
        if ($post->visibility == 0) {
            $post->visibility = 1;
        } else {
            $post->visibility = 0;
        }
        $post->save();
        return response($post, 201);
    }
}
