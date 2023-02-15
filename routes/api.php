<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BlogPostController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\SuggestionController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::controller(AuthController::class)->group(function () {
    Route::post('/registration', 'registration');
    Route::post('/login', 'login');
});
Route::get('/projects', [ProjectController::class, 'getAllProjects']);
Route::get('/profile/{username}', [UserController::class, 'getUser']);
Route::get('/blog', [BlogPostController::class, 'getAllPosts']);
Route::get('/blog/{id}', [BlogPostController::class, 'getPostById']);
Route::get('/suggestions', [SuggestionController::class, 'getAllTasks']);
Route::post('/setRating', [ProjectController::class, 'setRating']);


Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::prefix('chat')->group(function () {
        Route::get('/', [ChatController::class, 'getMessages']);
        Route::post('/send', [ChatController::class, 'sendMessage']);
    });
    Route::prefix('user')->group(function () {
        Route::get('/', [AuthController::class, 'checkLogin']);
        Route::post('/edit/account', [UserController::class, 'updateAccount']);
        Route::post('/edit/profile', [UserController::class, 'updateProfile']);
        Route::post('/edit/password', [UserController::class, 'updatePassword']);
        Route::post('/edit/email', [UserController::class, 'updateEmail']);
    });
    Route::prefix('admin')->group(function () {
        Route::post('/createProject', [ProjectController::class, 'createProject']);
        Route::get('/editProject/{id}', [ProjectController::class, 'editProject']);
        Route::put('/updateProject/{id}', [ProjectController::class, 'updateProject']);
    });
    Route::prefix('blog')->group(function () {
        Route::prefix('comments')->group(function () {
            Route::put('create', [BlogPostController::class, 'createComment']);
            Route::patch('update', [BlogPostController::class, 'editComment']);
            Route::delete('delete', [BlogPostController::class, 'deleteComment']);
        });
        Route::put('/create', [BlogPostController::class, 'createPost']);
        Route::delete('/delete', [BlogPostController::class, 'deletePost']);
        Route::patch('/visibility', [BlogPostController::class, 'visibility']);
        Route::patch('/update', [BlogPostController::class, 'updatePost']);

    });
    Route::prefix('suggestions')->group(function () {
        Route::post('/add', [SuggestionController::class, 'createSuggestion']);
        Route::post('/update', [SuggestionController::class, 'updateSuggestion']);
        Route::post('/setStatus', [SuggestionController::class, 'setStatus']);
    });
});
