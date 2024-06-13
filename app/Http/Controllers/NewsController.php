<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\News;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NewsController extends Controller
{
    public function getAllPosts()
    {
        $posts = News::orderBy('id', 'desc')->paginate(12);

        return response($posts, 200);
    }

    public function getNewsById($id)
    {
        $post = News::find($id);

        return response($post, 200);
    }

    public function getNewsComments($id)
    {
        $comments = Comment::where('news_id', $id)->get();
        foreach ($comments as $comment) {
            $comment->user;
        }
        return response($comments, 200);
    }

    public function createComment(Request $request)
    {
        $comment = new Comment;

        $comment->user_id = Auth::user()->id;
        $comment->news_id = $request->postId;
        $comment->body = $request->comment;
        $comment->user;
        $comment->save();
        return response($comment, 201);
    }

    public function editComment(Request $request)
    {
        $comment = Comment::find($request->id);
        $comment->body = $request->comment;
        $comment->save();

        return response($comment, 201);

    }

    public function deleteComment(Request $request)
    {
        $comment = Comment::find($request->id);
        $comment->delete();
//        return response()->status(201);

    }

    public function createNews(Request $request)
    {
        $news = new News;

        $news->user_id = Auth::user()->id;
        $news->title = $request->title;
        $news->body = $request->body;
        $news->visibility = true;
        $news->save();
        return response($news);
    }

    public function updateNews(Request $request)
    {
        $post = News::find($request->id);
        $post->title = $request->title;
        $post->body = $request->body;
        $post->save();
        $post->comments;
        foreach ($post->comments as $comment) {
            $comment->user;
        }
        return response($post, 201);
    }

    public function deleteNews(Request $request)
    {
        $post = News::find($request->id);
        $post->delete();
    }

    public function visibility(Request $request)
    {
        $post = News::find($request->id);
        if ($post->visibility == 0) {
            $post->visibility = 1;
        } else {
            $post->visibility = 0;
        }
        $post->save();
        return response($post, 201);
    }
}
