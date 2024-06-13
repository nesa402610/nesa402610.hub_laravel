<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    public function getAllTasks() {
        $notCompleted = Task::where('status', '!=', 4)->get();

        $completed = Task::where('status', 4)->get();
        $all = $notCompleted->concat($completed);
        foreach ($all as $item) {
            $item->user;
        }

        return response($all);
    }

    public function createSuggestion(Request $request) {
        $sug = new Task;

        $sug->title = $request->title;
        $sug->body = $request->body;
        $sug->author = Auth::user()->id;
        $sug->save();
        return response($sug, 201);
    }

    public function updateSuggestion(Request $request) {
        $sug = Task::find($request->id);
        $sug->title = $request->title;
        $sug->body = $request->body;
        $sug->save();

    }

    public function setStatus(Request $request) {
        $sug = Task::find($request->id);
        if ($request->status === 666) return $sug->delete();
        $sug->status = $request->status;
        $sug->save();
        return response($sug, 201);
    }
}
