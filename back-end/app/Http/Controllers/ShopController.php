<?php

namespace App\Http\Controllers;

use App\Http\Requests\NearbyShopsRequest;
use App\Repositories\PlacesApi;
use App\Shop;

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

}
