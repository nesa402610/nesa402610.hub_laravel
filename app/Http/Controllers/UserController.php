<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
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
        $user->save();

        return response($user, 201);
    }
}
