<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{
    public function getMessages() {
        $messages = Chat::all();
        foreach ($messages as $message) {
            $message->user;
        }
        return response($messages, 200);
    }

    public function sendMessage(Request $request) {
        $chat = new Chat;
        $chat->user_id = Auth::user()->id;
        $chat->message = $request->message;
        $chat->user;
        $chat->save();
        return response($chat, 201);
    }
}
