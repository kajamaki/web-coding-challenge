<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterUserRequest;
use Cartalyst\Sentinel\Laravel\Facades\Sentinel;
use Illuminate\Http\Request;

class UserController extends Controller
{
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
