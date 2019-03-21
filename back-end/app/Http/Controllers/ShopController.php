<?php

namespace App\Http\Controllers;

use App\Http\Requests\NearbyShopsRequest;
use App\Repositories\PlacesApi;
use App\Shop;
use Illuminate\Support\Facades\Auth;

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
        $shops = Auth::user()->shops()->whereLiked(true)->get(['google_id', 'name', 'image', 'liked']);
        return response()->json($shops);
    }

}
