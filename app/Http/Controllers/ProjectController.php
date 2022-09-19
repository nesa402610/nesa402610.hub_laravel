<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function createProject(Request $request) {
        $project = new Project;
        $this->extracted($request, $project);

        return response($project, 201);
    }

    public function editProject(Request $request) {
        $project = Project::find(1);
        $this->extracted($request, $project);
    }

    /**
     * @param Request $request
     * @param $project
     * @return void
     */
    public function extracted(Request $request, $project): void {
        $project->name = $request->name;
        $project->source = $request->source;
        $project->sourceUrl = $request->sourceUrl;
        $project->previewURL = $request->previewUrl;
        $project->image = $request->image;
        $project->status = $request->state;
        $project->level = $request->level;
        $project->framework = $request->framework;
        $project->host = $request->host;
        $project->save();
    }
}
