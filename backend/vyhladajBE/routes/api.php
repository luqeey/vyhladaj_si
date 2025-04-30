<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MovieController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/login', [AuthController::class, 'authenticate']);
Route::post('/register', [AuthController::class, 'store']);

Route::post('profile/{userId}/api/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::get('login', [AuthController::class, 'showLoginForm'])->name('login');
Route::post('/movies/like', [MovieController::class, 'likeMovie'])->middleware('auth:sanctum');
