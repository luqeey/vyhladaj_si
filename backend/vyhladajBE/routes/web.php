<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Http;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProfileController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/api/search-cinemas', function () {
    $location = request('location', 'Bratislava, Slovakia');
    $response = Http::get('https://serpapi.com/search.json', [
        'q' => 'cinemas near me',
        'location' => $location,
        'hl' => 'en',
        'gl' => 'sk',
        'google_domain' => 'google.com',
        'api_key' => '6a80827249223d0384f9cf1fa9770bfbdd8de378f7741ba8d670aea175767fa4',
    ]);

    return $response->json();
});

Route::get('/{pathMatch}', function () {
    return view('welcome');
})->where('pathMatch', '.*');

Route::get('/register', [AuthController::class, 'register'])->name('auth.register');
Route::post('/register', [AuthController::class, 'store']);
Route::get('/login', [AuthController::class, 'login'])->name('auth.login');
Route::post('/login', [AuthController::class, 'authenticate']);
Route::post('/logout', [AuthController::class, 'logout'])->name('auth.logout');
Route::middleware([\App\Http\Middleware\AuthMiddleware::class])->group(function () {
    Route::get('/user/{id}', [ProfileController::class, 'show'])->name('profile.show');
});
