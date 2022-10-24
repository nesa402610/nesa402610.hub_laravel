<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BlogPostController;
use App\Http\Controllers\ProjectController;
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
Route::post('/setRating', [ProjectController::class, 'setRating']);
Route::get('/profile/{username}', [UserController::class, 'getUser']);
Route::get('/blog', [BlogPostController::class, 'getAllPosts']);


Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::post('/checkLogin', [AuthController::class, 'checkLogin']);
    Route::post('/edit/updateAccount', [userController::class, 'updateAccount']);
    Route::post('/edit/updateProfile', [UserController::class, 'updateProfile']);
    Route::post('/edit/updatePassword', [UserController::class, 'updatePassword']);
    Route::post('/edit/updateEmail', [UserController::class, 'updateEmail']);
    Route::post('/admin/createProject', [ProjectController::class, 'createProject']);
    Route::get('/admin/editProject/{id}', [ProjectController::class, 'editProject']);
    Route::put('/admin/updateProject/{id}', [ProjectController::class, 'updateProject']);
    Route::post('/admin/createBlogPost', [BlogPostController::class, 'createPost']);
    Route::post('/admin/updateBlogPost', [BlogPostController::class, 'updatePost']);
    Route::post('/admin/deleteBlogPost', [BlogPostController::class, 'deletePost']);
});
