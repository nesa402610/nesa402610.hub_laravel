<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class AuthController extends Controller
{
    public function registration(Request $request) {
        $request->validate([
            'name' => ['required', 'max:20', 'min:2'],
            'email' => ['required', 'email', 'unique:users'],
            'password'=> ['required', 'confirmed', Password::min(8)]
        ]);

        $user = new User();
        $user->name = $request->name;
        $user->password = Hash::make($request->password);
        $user->email = $request->email;
        $user->lastName = $request->lastName;
        $user->middleName = $request->middleName;
        $user->birthday = $request->birthday;
        $user->phone = $request->phone;
        $user->save();

        return response()->status(200);

    }

    public function login() {

    }
}
