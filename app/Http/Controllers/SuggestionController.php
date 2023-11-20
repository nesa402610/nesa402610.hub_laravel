<?php

namespace App\Http\Controllers;

use App\Models\Suggestion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SuggestionController extends Controller {
    public function getAllTasks() {
        $notCompleted = Suggestion::where('status', '!=', 4)->get();

        $completed = Suggestion::where('status', 4)->get();
        $all = $notCompleted->concat($completed);
        foreach ($all as $item) {
            $item->user;
        }

        return response($all);
    }

    public function createSuggestion(Request $request) {
        $sug = new Suggestion;

        $sug->title = $request->title;
        $sug->body = $request->body;
        $sug->author = Auth::user()->id;
        $sug->save();
        return response($sug, 201);
    }

    public function updateSuggestion(Request $request) {
        $sug = Suggestion::find($request->id);
        $sug->title = $request->title;
        $sug->body = $request->body;
        $sug->save();

    }

    public function setStatus(Request $request) {
        $sug = Suggestion::find($request->id);
        if ($request->status === 666) return $sug->delete();
        $sug->status = $request->status;
        $sug->save();
        return response($sug, 201);
    }
}
