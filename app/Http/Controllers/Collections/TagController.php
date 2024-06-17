<?php

namespace App\Http\Controllers\Collections;

use App\Http\Controllers\Controller;
use App\Models\Genre;
use App\Models\Tag;
use Illuminate\Http\Request;

class TagController extends Controller
{
    public function getGenresAndTags()
    {
        $tags = Tag::orderBy('name')->get();
        $genres = Genre::orderBy('name')->get();
        return ['genres' => $genres, 'tags' => $tags];
    }

    public function getAllTags()
    {
        $tagsFF = Tag::orderBy('name')->where('rx', false)->get();
        $tagsRX = Tag::orderBy('name')->where('rx', true)->get();
        $genresFF = Genre::orderBy('name')->where('rx', false)->get();
        $genresRX = Genre::orderBy('name')->where('rx', true)->get();
        $total = Tag::count() + Genre::count();

        return response(
            ['tags' => [
                'rx' => $tagsRX,
                'ff' => $tagsFF,
            ], 'genres' => [
                'rx' => $genresRX,
                'ff' => $genresFF,
            ],
                'total' => $total

            ], 200);
    }

    public function createTag(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'type' => ['required', 'string'],
        ]);

        // Проверка уникальности
        $isTagUnique = !Tag::where('name', $request->name)->exists();
        $isGenreUnique = !Genre::where('name', $request->name)->exists();

        if (!$isTagUnique || !$isGenreUnique) {
            return response()->json(['error' => 'Уже существует'], 422);
        }
        if (str_contains($request->type, 'tag')) {
            $tag = new Tag(['name' => $request->name, 'rx' => $request->rx]);
            $tag->save();
        } else {
            $genre = new Genre(['name' => $request->name, 'rx' => $request->rx]);
            $genre->save();
        }
        return response(1, 201);
    }

    public function updateTag(Request $request)
    {
        if ($request->type === 'tag') {
            $tag = Tag::find($request->id);
            $tag->name = $request->name;
            $tag->save();
        } else {
            $genre = Genre::find($request->id);
            $genre->name = $request->name;
            $genre->save();
        }
    }

    public function deleteTag(Request $request)
    {
        if ($request->type === 'tag') {
            Tag::find($request->id)->delete();
        } else {
            Genre::find($request->id)->delete();
        }
    }

}
