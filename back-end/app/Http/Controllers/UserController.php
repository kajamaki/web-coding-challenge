<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\RegisterUserRequest;
use Cartalyst\Sentinel\Checkpoints\NotActivatedException;
use Cartalyst\Sentinel\Checkpoints\ThrottlingException;
use Cartalyst\Sentinel\Laravel\Facades\Sentinel;
use Illuminate\Http\Request;

class UserController extends Controller
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

    public function register(RegisterUserRequest $request)
    {
        $user = Sentinel::registerAndActivate($request->all());
        $user->save();
        if ($user) {
            return response()->json(['error' => 0, 'message' => "Thank you , please login"]);
        } else {
            $user->delete();
            return response()->json(['error' => 1, 'message' => "An error has occurred, please try again"]);
        }
    }

}
