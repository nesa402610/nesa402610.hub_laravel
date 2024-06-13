<?php

use App\Http\Controllers\admin\adminPanelController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\Collections\AnimeController;
use App\Http\Controllers\Collections\StudioController;
use App\Http\Controllers\Collections\TagController;
use App\Http\Controllers\MyWorkController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\AdminProof;
use App\Mail\PasswordReset;
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
    Route::post('/login', 'login')->name('login');
});
Route::get('/projects', [MyWorkController::class, 'getAllProjects']);
Route::get('/suggestions', [TaskController::class, 'getAllTasks']);
Route::post('/setRating', [MyWorkController::class, 'setRating']);
Route::post('mail', function () {
    Mail::to('hentaitrap@icloud.com')->send(new PasswordReset());
});


Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::prefix('chat')->group(function () {
        Route::get('/', [ChatController::class, 'getMessages'])->withoutMiddleware('auth:sanctum');
        Route::post('/send', [ChatController::class, 'sendMessage']);
    });
    Route::prefix('user')->group(function () {
        Route::get('', [AuthController::class, 'checkLogin']);
        Route::post('list', [UserController::class, 'getAllUsers'])->withoutMiddleware('auth:sanctum');
        Route::get('{username}', [UserController::class, 'getUser'])->withoutMiddleware('auth:sanctum');
        Route::prefix('edit')->group(function () {
            Route::post('account', [UserController::class, 'updateAccount']);
            Route::post('profile', [UserController::class, 'updateProfile']);
            Route::post('password', [UserController::class, 'updatePassword']);
            Route::post('email', [UserController::class, 'updateEmail']);
        });
    });
    Route::prefix('admin')->middleware(AdminProof::class)->group(function () {
        Route::post('/createProject', [MyWorkController::class, 'createProject']);
        Route::get('/editProject/{id}', [MyWorkController::class, 'editProject']);
        Route::patch('/updateProject/{id}', [MyWorkController::class, 'updateProject']);
    });
    Route::prefix('News')->group(function () {
        Route::get('', [NewsController::class, 'getAllPosts'])->withoutMiddleware('auth:sanctum');
        Route::prefix('{id}')->group(function () {
            Route::get('', [NewsController::class, 'getNewsById'])->withoutMiddleware('auth:sanctum');
            Route::prefix('comments')->group(function () {
                Route::get('list', [NewsController::class, 'getNewsComments'])->withoutMiddleware('auth:sanctum');
                Route::put('create', [NewsController::class, 'createComment']);
                Route::patch('update', [NewsController::class, 'editComment']);
                Route::delete('delete', [NewsController::class, 'deleteComment']);
            });
        });
        Route::middleware([AdminProof::class])->group(function () {
            Route::put('/create', [NewsController::class, 'createNews']);
            Route::delete('/delete', [NewsController::class, 'deleteNews']);
            Route::patch('/visibility', [NewsController::class, 'visibility']);
            Route::patch('/update', [NewsController::class, 'updateNews']);
        });
    });
    Route::prefix('suggestions')->group(function () {
        Route::post('/add', [TaskController::class, 'createSuggestion']);
        Route::post('/update', [TaskController::class, 'updateSuggestion']);
        Route::post('/setStatus', [TaskController::class, 'setStatus'])->middleware(AdminProof::class);
    });

    Route::middleware([AdminProof::class])->group(function () {
        Route::prefix('dashboard')->group(function () {
            Route::get('', [adminPanelController::class, 'getOverview']);
        });
        Route::prefix('anime')->group(function () {
            Route::get('all', [AnimeController::class, 'getAllAnime']);
            Route::get('duplies', [AnimeController::class, 'getAnimeDuplies']);
            Route::delete('duplies/delete', [AnimeController::class, 'deleteDupliesAnime']);
            Route::put('new', [AnimeController::class, 'createAnime']);
            Route::post('newByShiki', [AnimeController::class, 'createAnimeByShiki']);
            Route::patch('update', [AnimeController::class, 'updateAnime']);
            Route::put('/tags/add', [AnimeController::class, 'addTag']);
            Route::delete('/tags/remove', [AnimeController::class, 'removeTag']);
            Route::delete('videos/delete/{id}', [AnimeController::class, 'deleteAnimeVideo']);
            Route::patch('status', [AnimeController::class, 'setAnimeStatus']);
            Route::prefix('studios')->group(function () {
                Route::get('/list', [StudioController::class, 'getAllStudios']);
                Route::put('/create', [StudioController::class, 'createStudio']);
                Route::patch('/update', [StudioController::class, 'updateStudio']);
            });
            Route::post('shikimori/hostfix', [AnimeController::class, 'shikimoriHostUpdate']);
        });
        Route::prefix('manga')->group(function () {
            Route::get('all', [MangaController::class, 'getAllManga']);
        });
        Route::prefix('tags')->group(function () {
            Route::post('new', [TagController::class, 'createTag']);
            Route::patch('update', [TagController::class, 'updateTag']);
            Route::patch('delete', [TagController::class, 'deleteTag']);
        });
    });
});

Route::prefix('/anime')->group(function () {
    Route::post('list', [AnimeController::class, 'getPaginatedAnime']);
    Route::get('list/random', [AnimeController::class, 'getRandomAnimeList']);
    Route::get('{id}', [AnimeController::class, 'getAnimeById']);
    Route::get('{id}/videos', [AnimeController::class, 'getAnimeVideos']);
    Route::post('{id}/score', [AnimeController::class, 'setAnimeScore']);
    Route::post('{id}/watchedEpisodes/{symbol}', [AnimeController::class, 'setWatchedEpisode']);
    Route::get('animeList/{userId}', [UserController::class, 'getUserAnimeOverview']);
    Route::get('animeList/{userId}/{animeStatus}', [UserController::class, 'getUserAnimeList']);
});
Route::prefix('/manga')->group(function () {
    Route::post('list', [MangaController::class, 'getPaginatedManga']);
    Route::post('{id}', [MangaController::class, 'getMangaById']);
});
Route::get('/tags/list', [TagController::class, 'getAllTags']);
