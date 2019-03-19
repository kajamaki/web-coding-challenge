<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginUserRequest;
use Cartalyst\Sentinel\Checkpoints\ThrottlingException;
use Cartalyst\Sentinel\Laravel\Facades\Sentinel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(LoginUserRequest $request)
    {
        try {
            if (Sentinel::authenticate($request->all())) {
                $user = Sentinel::check();
                $token = $user->createToken('MyApp');
                return response()->json(['status' => 'success', 'message' => 'logged in successfully', 'token' => $token->accessToken]);
            } else
                return response()->json(['status' => 'fail', 'message' => 'incorrect credentials'], 401);
        } catch (ThrottlingException $e) {
            $delay = $e->getDelay();
            return response()->json(['status' => 'fail', 'message' => "you are banned for $delay secondes"], 401);
        }
    }

    public function logout()
    {
        if (Auth::user()) {
            $user = Auth::user();
            $tokens = $user->tokens;
            foreach ($tokens as $token) {
                $token->revoke();
            }
            return response()->json(['error' => 'success', 'message' => 'Signed out successfully']);
        } else {
            return response()->json(['error' => 'fail', 'message' => 'Already Unauthenticated '], 401);
        }
    }
}
