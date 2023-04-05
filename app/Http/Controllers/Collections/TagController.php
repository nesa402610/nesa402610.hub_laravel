<?php

namespace App\Http\Controllers\Collections;

use App\Http\Controllers\Controller;
use App\Models\Tags;
use Illuminate\Http\Request;

class TagController extends Controller
{
    public function getAllTags() {
        $tags = Tags::orderBy('name')->get();

        return response($tags, 200);
    }

}
