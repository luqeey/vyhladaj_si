<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MovieController extends Controller
{
    public function likeMovie(Request $request)
    {
        $request->validate([
            'movie_id' => 'required|string',
        ]);

        $likedMovie = DB::table('liked_movies')->updateOrInsert(
            [
                'user_id' => $request->user()->id,
                'movie_id' => $request->movie_id,
            ],
            ['created_at' => now(), 'updated_at' => now()]
        );

        return response()->json(['message' => 'Movie liked successfully!']);
    }

    public function getLikedMovies(Request $request)
    {
        $likedMovies = DB::table('liked_movies')
            ->where('user_id', $request->user()->id)
            ->get();

        return response()->json($likedMovies);
    }
}
