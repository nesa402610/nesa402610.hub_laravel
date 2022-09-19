<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function getAllProjects() {
        $projects = Project::all();

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
