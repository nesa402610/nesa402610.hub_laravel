<?php

namespace App\Http\Controllers\Collections;

use App\Http\Controllers\Controller;
use App\Models\Studios;
use Illuminate\Http\Request;

class StudioController extends Controller {
    public function getAllStudios() {
        $studios = Studios::all();
        return response($studios);
    }

    public function createStudio(Request $request) {
        $studio = new Studios();
        $studio->name = $request->name;
        $studio->save();
    }

    public function updateStudio(Request $request) {
        $studio = Studios::find($request->id);
        $studio->name = $request->name;
        $studio->save();
    }
}
