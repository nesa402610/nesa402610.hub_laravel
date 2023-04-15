<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\HAnime;
use App\Models\Tags;
use App\Models\User;
use Illuminate\Http\Request;

class adminPanelController extends Controller {
    public function getAllAnime() {
        return response(HAnime::all());
    }

    public function getAllModels() {
        $models = [];
        $files = glob(app_path('Models') . '/*.php');

        foreach ($files as $file) {
            $modelName = basename($file, '.php');
            $models[] = 'App\\Models\\' . $modelName;
        }
        return response($models);
    }

    public function getTableData(Request $request, $path) {
        $model = [];
        $msg = '';
        switch ($path) {
            case 'anime':
                $model = HAnime::all();
                break;
            case 'users':
                $model = User::all();
                break;
            case 'tags':
                $model = Tags::all();
                break;
            default:
                $msg = 'Ошибочка какая-то';
        }
        return response(['msg' => $msg, 'model' => $model]);
    }
}
