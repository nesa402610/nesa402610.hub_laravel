<?php

use App\Http\Controllers\admin\adminPanelController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BlogPostController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\Collections\AnimeController;
use App\Http\Controllers\Collections\MangaController;
use App\Http\Controllers\Collections\TagController;
use App\Http\Controllers\HCollectionController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\SuggestionController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\AdminProof;
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

//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//    return $request->user();
//});

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
Route::get('/users', [UserController::class, 'getAllUsers']);

Route::prefix('/anime')->group(function () {
    Route::post('list', [AnimeController::class, 'getPaginatedAnime']);
    Route::post('{id}', [AnimeController::class, 'getAnimeById']);
    Route::get('{id}/videos', [AnimeController::class, 'getAnimeVideos']);
});
Route::prefix('/manga')->group(function () {
    Route::post('list', [MangaController::class, 'getPaginatedManga']);
    Route::post('{id}', [MangaController::class, 'getMangaById']);
});
Route::get('/tags/list', [TagController::class, 'getAllTags']);


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
    Route::prefix('admin')->middleware(AdminProof::class)->group(function () {
        Route::post('/createProject', [ProjectController::class, 'createProject']);
        Route::get('/editProject/{id}', [ProjectController::class, 'editProject']);
        Route::patch('/updateProject/{id}', [ProjectController::class, 'updateProject']);
    });
    Route::prefix('blog')->group(function () {
        Route::prefix('comments')->group(function () {
            Route::put('create', [BlogPostController::class, 'createComment']);
            Route::patch('update', [BlogPostController::class, 'editComment']);
            Route::delete('delete', [BlogPostController::class, 'deleteComment']);
        });
        Route::middleware([AdminProof::class])->group(function () {
            Route::put('/create', [BlogPostController::class, 'createPost']);
            Route::delete('/delete', [BlogPostController::class, 'deletePost']);
            Route::patch('/visibility', [BlogPostController::class, 'visibility']);
            Route::patch('/update', [BlogPostController::class, 'updatePost']);
        });
    });
    Route::prefix('suggestions')->group(function () {
        Route::post('/add', [SuggestionController::class, 'createSuggestion']);
        Route::post('/update', [SuggestionController::class, 'updateSuggestion']);
        Route::post('/setStatus', [SuggestionController::class, 'setStatus'])->middleware(AdminProof::class);
    });
    Route::prefix('anime')->middleware([AdminProof::class])->group(function () {
        Route::patch('/update', [AnimeController::class, 'updateAnime']);
        Route::patch('/add', [AnimeController::class, 'addTitle']);
        Route::put('/tags/add', [AnimeController::class, 'addTag']);
        Route::delete('/tags/remove', [AnimeController::class, 'removeTag']);
    });
    Route::prefix('manga')->group(function () {
        Route::middleware([AdminProof::class])->group(function () {
            Route::patch('/update', [MangaController::class, 'updateTitle']);
            Route::patch('/add', [MangaController::class, 'addTitle']);
            Route::put('/passkey', [MangaController::class, 'generatePasskey']);
            Route::get('/passkeys', [MangaController::class, 'getAllPasskeys']);
            Route::put('/tags/add', [MangaController::class, 'addTagToCollection']);
            Route::delete('/tags/remove', [MangaController::class, 'deleteTagFromCollection']);
        });
    });
    Route::middleware([AdminProof::class])->group(function () {
        Route::get('models', [adminPanelController::class, 'getAllModels']);
        Route::prefix('anime')->group(function () {
            Route::get('all', [AnimeController::class, 'getAllAnime']);
            Route::get('update', [AnimeController::class, 'updateAnime']);
            Route::delete('videos/delete/{id}', [AnimeController::class, 'deleteAnimeVideo']);
        });
        Route::prefix('manga')->group(function () {
            Route::get('all', [MangaController::class, 'getAllManga']);
            Route::get('list', [AnimeController::class, 'getAllAnime']);
            Route::get('list', [AnimeController::class, 'getAllAnime']);
            Route::get('list', [AnimeController::class, 'getAllAnime']);
            Route::get('list', [AnimeController::class, 'getAllAnime']);
        });
        Route::prefix('tags')->group(function () {
            Route::post('new', [TagController::class, 'createTag']);
            Route::patch('update', [TagController::class, 'updateTag']);
            Route::patch('delete', [TagController::class, 'deleteTag']);
        });
    });
});

