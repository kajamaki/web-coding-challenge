<?php

use Illuminate\Http\Request;

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

Route::post('register', 'UserController@register');
Route::post('login', 'AuthController@login');


Route::group(['middleware' => ['auth:api']], function () {
    Route::get('sign_out', 'AuthController@logout');


    Route::get('nearby_shops', 'ShopController@getNearbyShops');
    Route::get('Preferred_shops', 'ShopController@getPreferredShops');
    Route::post('add_to_preferred', 'ShopController@addToPreferred');
    Route::delete('remove_from_preferred/{shop}', 'ShopController@removeFromPreferred');
    Route::post('dislike_shop', 'ShopController@dislikeShop');
});
