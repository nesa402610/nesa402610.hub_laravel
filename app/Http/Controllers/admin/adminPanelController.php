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
        $rxCount = HAnime::where('type', 0)->where('rating', '=', 'Rx')->count();
        $ffCount = HAnime::where('type', 0)->where('rating', '!=', 'Rx')->count();
        $animeStudiosCount = Studios::count();

        $mangaCount = HManga::where('type', 1)->count();
        $tagsCount = Tags::count();

        $usersCount = User::count();

        $messagesCount = Chat::count();

        $projectsCount = Project::count();
        $completedProjectsCount = Project::where('status', 'Completed')->count();
        $plannedProjectsCount = Project::where('status', 'Planned')->count();
        $droppedProjectsCount = Project::where('status', 'Dropped')->count();
        return response([
            'collection' => [
                'anime' => [
                    'total' => $animeCount,
                    'rx' => $rxCount,
                    'ff' => $ffCount,
                    'studiosCount' => $animeStudiosCount,
                ],
                'manga' => [
                    'total' => $mangaCount,
                ],
                'tagsCount' => $tagsCount,
            ],
            'usersCount' => $usersCount,
            'messagesCount' => $messagesCount,
            'projects' => [
                'completed' => $completedProjectsCount,
                'planned' => $plannedProjectsCount,
                'dropped' => $droppedProjectsCount,
                'total' => $projectsCount,

            ]
        ]);
    }
}
