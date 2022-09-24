<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Rating;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProjectController extends Controller {
    public function setRating(Request $request) {
        $rating = new Rating();
        $rating->project_id = $request->project_id;
        if (!empty(Auth::user()->id)) {
            $rating->user_id = Auth::user()->id;
        } else {
            $rating->user_id = null;
        }
        $rating->rating = $request->rating;
        $rating->save();

        $rates = Rating::where('project_id', $request->project_id)->get();
        $avRate = 0;
        foreach ($rates as $rate) {
            $avRate = $avRate + $rate->rating;
        }
        $avRate = $avRate / count($rates);

        return response(round($avRate, 2), 201);
    }

    public function getAllProjects() {
        $projects = Project::all();
        foreach ($projects as $project) {
            $ratings = Rating::where('project_id', $project->id)->get();
            $avRate = 0;
            foreach ($ratings as $rating) {
                $avRate = $avRate + $rating->rating;
            }
            if ($avRate) {
                $project->rate = round($avRate / count($ratings), 2);
            }
        }
        return response($projects);

    }

    public function createProject(Request $request) {
        $project = new Project;
        $this->extracted($request, $project);

        return response($project, 201);
    }

    public function editProject($id) {
        $project = Project::find($id);

        return response($project, 200);


    }

    public function updateProject(Request $request, $id) {
        $project = Project::find($id);
        $this->extracted($request, $project);

        return response(200);
    }

    /**
     * @param Request $request
     * @param $project
     * @return void
     */
    public function extracted(Request $request, $project): void {
        $project->name = $request->name;
        $project->source = $request->source;
        $project->sourceUrl = $request->sourceURL;
        $project->previewURL = $request->previewURL;
        $project->image = $request->image;
        $project->status = $request->status;
        $project->level = $request->level;
        $project->framework = $request->framework;
        $project->host = $request->host;
        $project->save();
    }
}
