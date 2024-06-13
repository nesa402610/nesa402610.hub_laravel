<?php

namespace App\Http\Controllers;

use App\Models\MyWork;
use App\Models\MyWorkScore;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MyWorkController extends Controller
{
    public function setRating(Request $request) {
        $rating = new MyWorkScore();
        $rating->project_id = $request->project_id;
        $rating->user_id = Auth::user()->id;
        $rating->rating = $request->rating;
        $rating->save();

        $rates = MyWorkScore::where('project_id', $request->project_id)->get();
        $avRate = 0;
        foreach ($rates as $rate) {
            $avRate = $avRate + $rate->rating;
        }
        $avRate = $avRate / count($rates);

        return response(round($avRate, 2), 201);
    }

    public function getAllProjects() {
        $projects = MyWork::orderByDesc('id')->get();
        return response($projects);

    }

    public function createProject(Request $request) {
        $project = new MyWork;
        $this->extracted($request, $project);

        return response($project, 201);
    }

    public function editProject($id) {
        $project = MyWork::find($id);

        return response($project, 200);


    }

    public function updateProject(Request $request, $id) {
        $project = MyWork::find($id);
        $this->extracted($request, $project);

        return response(200);
    }

    /**
     * @param Request $request
     * @param $project
     * @return void
     */
    public function extracted(Request $request, $project): void
    {
        $project->name = $request['name'];
        $project->source = $request['source'];
        $project->sourceUrl = $request['sourceURL'];
        $project->previewURL = $request['previewURL'];
        $project->image = $request['image'];
        $project->status = $request['status'];
        $project->level = $request['level'];
        $project->framework = $request['framework'];
        $project->host = $request['host'];
        $project->github = $request['github'];
        $project->save();
    }
}
