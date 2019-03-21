<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddToPreferredRequest;
use App\Http\Requests\NearbyShopsRequest;
use App\Repositories\PlacesApi;
use App\Shop;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\Shop as ShopResource;

class ShopController extends Controller
{
    protected $PlacesApi;

    /**
     * ShopController constructor.
     */
    public function __construct()
    {
        $this->PlacesApi = new PlacesApi();
    }


    public function getNearbyShops(NearbyShopsRequest $request)
    {
        $data = $this->PlacesApi->getNearbyShops($request['latitude'], $request['longitude']);
        return response()->json($data);
    }

    public function getPreferredShops()
    {
        $shops = ShopResource::collection(Auth::user()->shops()->where('user_id', '=', Auth::user()->id)->where(function ($query) {
            $query->orWhere('disliked_timeout', null)->orWhere('disliked_timeout', '<=', Carbon::now());
        })->get());
        return response()->json($shops);
    }

    public function removeFromPreferred(Shop $shop)
    {
        if (Auth::user()->id != $shop->user_id) return response()->json(['error' => 'forbidden'], 403);
        $shop->delete();
        return $shop->delete();
    }

    public function addToPreferred(AddToPreferredRequest $request)
    {
        $shop = Shop::create([
            'google_id' => $request['googleId'],
            'name' => $request['name'],
            'image' => $request['image'],
            'user_id' => Auth::user()->id,

        ]);
        return new ShopResource($shop);
    }

    public function dislikeShop(AddToPreferredRequest $request)
    {
        $shop = Shop::create([
            'google_id' => $request['googleId'],
            'name' => $request['name'],
            'image' => $request['image'],
            'user_id' => Auth::user()->id,
            'disliked_timeout' => Carbon::now()->addHours(2),
        ]);

        return new ShopResource($shop);
    }
}
