<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Chat;
use App\Models\HAnime;
use App\Models\HManga;
use App\Models\Project;
use App\Models\Studios;
use App\Models\Tags;
use App\Models\User;

class adminPanelController extends Controller
{
    public function getAllAnime()
    {
        return response(HAnime::all());
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
        $animeCount = HAnime::where('type', 0)->count();
        $animeStudiosCount = Studios::count();
        $mangaCount = HManga::where('type', 1)->count();
        $tagsCount = Tags::count();
        $usersCount = User::count();
        $messagesCount = Chat::count();
        $projectsCount = Project::count();
        return response([
            'animeCount' => $animeCount,
            'animeStudiosCount' => $animeStudiosCount,
            'mangaCount' => $mangaCount,
            'tagsCount' => $tagsCount,
            'usersCount' => $usersCount,
            'messagesCount' => $messagesCount,
            'projectsCount' => $projectsCount,
        ]);
    }
}
