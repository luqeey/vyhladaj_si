<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Http;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/api/search-cinemas', function () {
    $response = Http::get('https://serpapi.com/search.json', [
        'q' => 'cinemas near me',
        'location' => 'Bratislava, Slovakia',
        'hl' => 'en',
        'gl' => 'sk',
        'google_domain' => 'google.com',
        'api_key' => '6a80827249223d0384f9cf1fa9770bfbdd8de378f7741ba8d670aea175767fa4',
    ]);

    return $response->json();
});
