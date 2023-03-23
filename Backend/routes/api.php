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

            Route::post('/', [Admin::class, "dashboard"]);

            Route::prefix('student')->group(function () {
                Route::post('/fetch/{id?}', [Admin::class, "fetchStudentData"]);
                Route::post('/add', [Admin::class, "addStudentData"]);
                Route::patch("/update/{id}", [Admin::class, "updateStudentData"]);
                Route::delete("/delete/{id}", [Admin::class, "deleteStudentData"]);
            });

            Route::prefix('faculty')->group(function () {
                Route::post('/fetch/{id?}', [Admin::class, "fetchFacultyData"]);
                Route::post('/add', [Admin::class, "addFacultyData"]);
                Route::patch("/update/{id}", [Admin::class, "updateFacultyData"]);
                Route::delete("/delete/{id}", [Admin::class, "deleteFacultyData"]);
            });
        });
    }
);
