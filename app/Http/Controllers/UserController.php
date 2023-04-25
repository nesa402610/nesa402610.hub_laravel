<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller {
    public function updateAccount(Request $request) {
        $user = Auth::user();

        $user->email = $request->email;
        $user->phone = $request->phone;
        $user->save();

        return response($user, 201);
    }

    public function updateProfile(Request $request) {
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

    public function updatePassword(Request $request) {
        $user = Auth::user();
        if (Hash::check($request->currentPassword, $user->password)) {
            $user->password = Hash::make($request->newPassword);
            $user->save();
            return response(['msg' => 'Пароль успешно обновлен'], 201);
        }
        return response(['error' => 'Пароль не совпадает'], 400);
    }

    public function updateEmail(Request $request) {
        $user = Auth::user();
        if (Hash::check($request->currentPassword, $user->password) && $user->email === $request->currentEmail) {
            $user->email = $request->newEmail;
            $user->save();
            return response(['msg' => 'Email успешно обновлен'], 201);
        }
        return response(['error' => 'Пароль или email не совпадает'], 400);
    }

    public function getUser($username) {
        $user = User::find($username);

        return response($user, 200);
    }

    public function getAllUsers() {
        $users = User::all();
        return response($users, 200);
    }
}
