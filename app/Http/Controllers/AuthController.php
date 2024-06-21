<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\ValidationException;

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
//        $user->lastName = $request->lastName;
//        $user->middleName = $request->middleName;
//        $user->birthday = $request->birthday;
        $user->phone = $request->phone;
        $user->save();

//        return response()->status(200);

    }

    /**
     * @throws ValidationException
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required',
            'password' => 'required'
        ]);

        if (Auth::attempt($request->only('email', 'password'))) {
//            $request->session()->regenerate();
            $token = $request->user()->createToken('token-name');
            return response()->json(['token' => $token->plainTextToken, 'user' => Auth::user()], 200);
        }
        throw ValidationException::withMessages([
            'login' => ['Invalid data']
        ]);
    }

    public function checkLogin() {
        $user = Auth::user();
//        $user->rates;
        $user->role;

        return response($user, 200);
    }
}
