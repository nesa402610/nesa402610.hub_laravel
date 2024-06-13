<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Anime;
use App\Models\Chat;
use App\Models\Genre;
use App\Models\MyWork;
use App\Models\Studios;
use App\Models\Tag;
use App\Models\User;

class adminPanelController extends Controller
{
    public function getAllAnime()
    {
        return response(Anime::all());
    }

    public function getAllModels()
    {
        $models = [];
        $files = glob(app_path('Models') . '/*.php');

        foreach ($files as $file) {
            $modelName = basename($file, '.php');
            $models[] = 'App\\Models\\' . $modelName;
        }
        return response($models);
    }

    public function getOverview()
    {
        $animeCount = Anime::count();
        $rxCount = Anime::where('rating', '=', 'Rx')->count();
        $ffCount = Anime::where('rating', '!=', 'Rx')->count();
        $animeStudiosCount = Studios::count();

        $tagsCount = Tag::count();
        $genresCount = Genre::count();

        $usersCount = User::count();

        $messagesCount = Chat::count();

        $worksCount = MyWork::count();
        $completedWorksCount = MyWork::where('status', 'Completed')->count();
        $plannedWorksCount = MyWork::where('status', 'Planned')->count();
        $droppedWorksCount = MyWork::where('status', 'Dropped')->count();
        return response([
            'anime' => [
                'total' => $animeCount,
                'rx' => $rxCount,
                'ff' => $ffCount,
                'studiosCount' => $animeStudiosCount,
                'tagsCount' => $tagsCount,
                'genresCount' => $genresCount,
            ],
            'usersCount' => $usersCount,
            'messagesCount' => $messagesCount,
            'works' => [
                'completed' => $completedWorksCount,
                'planned' => $plannedWorksCount,
                'dropped' => $droppedWorksCount,
                'total' => $worksCount,

            ]
        ]);
    }
}
