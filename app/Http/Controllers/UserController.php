<?php

namespace App\Http\Controllers;

use App\Models\AnimeUserStatus;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function updateAccount(Request $request)
    {
        $user = Auth::user();

        $user->email = $request->email;
        $user->phone = $request->phone;
        $user->save();

        return response($user, 201);
    }

    public function updateProfile(Request $request)
    {
        $user = Auth::user();

        $user->name = $request->name;
        $user->middleName = $request->middleName;
        $user->lastName = $request->lastName;
        $user->birthday = $request->birthday;
        $user->avatar = $request->avatar;
        $user->status = $request->status;
        $user->about = $request->about;
        $user->save();

        return response($user, 201);
    }

    public function updatePassword(Request $request)
    {
        $user = Auth::user();
        if (Hash::check($request->currentPassword, $user->password)) {
            $user->password = Hash::make($request->newPassword);
            $user->save();
            return response(['msg' => 'Пароль успешно обновлен'], 201);
        }
        return response(['error' => 'Пароль не совпадает'], 400);
    }

    public function updateEmail(Request $request)
    {
        $user = Auth::user();
        if (Hash::check($request->currentPassword, $user->password) && $user->email === $request->currentEmail) {
            $user->email = $request->newEmail;
            $user->save();
            return response(['msg' => 'Email успешно обновлен'], 201);
        }
        return response(['error' => 'Пароль или email не совпадает'], 400);
    }

    public function getUser($username)
    {
        $user = User::find($username);

        return response($user, 200);
    }

    public function getAllUsers(Request $request)
    {
        $users = User::where('name', 'like', '%' . $request->userName . '%')->orWhere('lastName', 'like', '%' . $request->userName . '%')->limit(21)->get();
        return response($users, 200);
    }

    public function getUserAnimeList($userId, $animeStatus)
    {
        switch ($animeStatus) {
            case 'dropped':
                $animeStatus = 0;
                break;
            case 'watching':
                $animeStatus = 1;
                break;
            case 'planned':
                $animeStatus = 2;
                break;
            case 'rewatching':
                $animeStatus = 3;
                break;
            case 'out':
                $animeStatus = 4;
                break;
            case 'fuckout':
                $animeStatus = 5;
                break;
            case 'watched':
                $animeStatus = 6;
                break;
            default:
                $animeStatus = 6;
        }
        $animeList = AnimeUserStatus::where('user_id', $userId)->where('status', $animeStatus)->get();
        foreach ($animeList as $anime) {
            $anime->anime;
            $anime->anime->tags;
            $anime->anime->genres;
            $anime->anime->studios;
            $anime->anime->status = $anime->anime->animeStatus();
            $anime->anime->videosCount = $anime->anime->links()->count();
        }
        return $animeList;

    }

    public function getUserAnimeOverview($userId)
    {
        $animeListCount = AnimeUserStatus::where('user_id', $userId)->count();
        $animeWatched = AnimeUserStatus::where('user_id', $userId)->where('status', 6)->count();
        $animeDropped = AnimeUserStatus::where('user_id', $userId)->where('status', 0)->count();
        $animePlanned = AnimeUserStatus::where('user_id', $userId)->where('status', 2)->count();
        $animeWatching = AnimeUserStatus::where('user_id', $userId)->where('status', 1)->count();
        $animeRewatching = AnimeUserStatus::where('user_id', $userId)->where('status', 3)->count();
        $animeOut = AnimeUserStatus::where('user_id', $userId)->where('status', 4)->count();
        $animeFuckout = AnimeUserStatus::where('user_id', $userId)->where('status', 5)->count();

        return response([
            'count' => $animeListCount,
            'watched' => $animeWatched,
            'unwatched' => $animeListCount - $animeWatched,
            'planned' => $animePlanned,
            'dropped' => $animeDropped,
            'watching' => $animeWatching,
            'rewatching' => $animeRewatching,
            'out' => $animeOut,
            'fuckout' => $animeFuckout,

        ], 200);
    }
}
