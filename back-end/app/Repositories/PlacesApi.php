<?php
/**
 * Created by PhpStorm.
 * User: mohamed
 * Date: 3/20/19
 * Time: 11:39 PM
 */

namespace App\Repositories;


use Carbon\Carbon;
use function GuzzleHttp\Promise\all;
use Illuminate\Support\Facades\Auth;

class PlacesApi
{
    protected $apiToken;

    public function __construct()
    {
        $this->apiToken = env('GOOGLE_PLACES_KEY');
    }

    public function getNearbyShops($latitude, $longitude)
    {

        $user = Auth::user();
//        $shops = $user->shops();

        $dislikedShops = $user->shops()->where('disliked_timeout', '<>', null)->where('disliked_timeout', '<=', Carbon::now())->get();
        $likedShops = $user->shops()->whereLiked(true)->get();
        $client = new \GuzzleHttp\Client();


        $url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=';
        $url .= $latitude . ',';
        $url .= $longitude;
        $url .= '&rankby=distance&keyword=boutiques&key=';
        $url .= $this->apiToken;

        $response = $client->request('GET', $url, ['http_errors' => false]);
        if ($response->getStatusCode() != 200) {
            return [];
        }
        $response = $response->getBody()->getContents();
        if (json_decode($response)->status !== 'OK') {
            return [];
        }
        $google_results = json_decode($response)->results;
        $results = [];
        foreach ($google_results as $result) {
            $row = [
                'googleId' => $result->id,
                'name' => $result->name,
                'image' => (isset($result->photos) ? $result->photos[0]->photo_reference : null),
                'liked' => 0,
            ];
            foreach ($likedShops as $shop) {
                if ($shop->google_id == $result->id) {
                    $row['liked'] = $shop->liked;
                    break;
                }
            }
            foreach ($dislikedShops as $shop) {
                if ($shop->google_id == $result->id) {
                    $row = [];
                    break;
                }
            }
            if (count($row)) {
                array_push($results, $row);
            }

        }
        return $results;
    }
}