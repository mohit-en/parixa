<?php

use App\Http\Controllers\Admin;
use App\Http\Controllers\Auth_User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// used api middleware for session
Route::middleware('api-session')->group(
    function () {
        Route::prefix('auth')->group(function () {
            Route::post('/login', [Auth_User::class, "login"]);
            Route::post('/signup', [Auth_User::class, "signup"]);
            Route::post('/logout', [Auth_User::class, "logout"]);
            Route::post('/isUserLogin', [Auth_User::class, "isUserLogin"]);
        });


        Route::prefix('admin')->middleware(['admin-auth'])->group(function () {

            Route::prefix('dashboard')->group(function () {
                Route::post('/', [Admin::class, "dashboard"]);
            });
        });
    }
);
