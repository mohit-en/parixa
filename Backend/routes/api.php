<?php

use App\Http\Controllers\Admin;
use App\Http\Controllers\Auth_User;
use App\Http\Controllers\Faculty;
use App\Http\Controllers\General;
use App\Http\Controllers\Student;
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

Route::get('/', function () {
    return response()->json([
        'msg' => 'hello world'
    ]);
});

// used api middleware for session
Route::middleware('api-session')->group(
    function () {

        Route::prefix('auth')->group(function () {
            Route::post('/login', [Auth_User::class, "login"]);
            Route::post('/logout', [Auth_User::class, "logout"]);
            Route::post('/isUserLogin', [Auth_User::class, "isUserLogin"]);
            Route::post('/session', [Auth_User::class, "fetchSessionData"]);
            Route::post('/register', [Auth_User::class, "register"]);
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

            Route::prefix('course')->group(function () {
                Route::post('/fetch/{id?}', [Admin::class, "fetchCourseData"]);
                Route::post('/add', [Admin::class, "addCourseData"]);
                Route::patch("/update/{id}", [Admin::class, "updateCourseData"]);
                Route::delete("/delete/{id}", [Admin::class, "deleteCourseData"]);
            });

            Route::prefix('subject')->group(function () {
                Route::post('/fetch/{id?}', [Admin::class, "fetchSubjectData"]);
                Route::post('/add', [Admin::class, "addSubjectData"]);
                Route::patch("/update/{id}", [Admin::class, "updateSubjectData"]);
                Route::delete("/delete/{id}", [Admin::class, "deleteSubjectData"]);
            });
            Route::prefix('approval')->group(function () {
                Route::post('/', [Admin::class, "fetchNonApprovedUsersData"]);
                Route::patch('/add', [Admin::class, "giveApprovelToUser"]);
                Route::post('/show', [Admin::class, "showUserInfo"]);
                Route::delete('/delete/{id}', [Admin::class, "deleteUser"]);
            });
        });

        Route::prefix('faculty')->middleware(['faculty-auth'])->group(function () {

            Route::post('/', [Faculty::class, "dashboard"]);

            Route::prefix('question')->group(function () {
                Route::post('/fetch/{id?}', [Faculty::class, "fetchQuestionData"]);
                Route::post('/add', [Faculty::class, "addQuestionData"]);
                Route::patch("/update/{id}", [Faculty::class, "updateQuestionData"]);
                Route::delete("/delete/{id}", [Faculty::class, "deleteQuestionData"]);
            });
            Route::prefix('course')->group(function () {
                Route::post('/fetch/{id?}', [Faculty::class, "fetchCourseData"]);
            });
            Route::prefix('exam')->group(function () {
                Route::post('/fetch/{id?}', [Faculty::class, "fetchScheduleExamData"]);
                Route::post('/add', [Faculty::class, "addScheduleExamData"]);
                Route::patch('/update/{id}', [Faculty::class, "updateScheduleExamData"]);
                Route::delete('/delete/{id}', [Faculty::class, "deleteScheduleExamData"]);
            });

            Route::prefix('doneexam')->group(function () {
                Route::post('/fetch/{id?}', [Faculty::class, "fetchDoneExamData"]);
            });
            Route::prefix('exammarks')->group(function () {
                Route::post('/fetch/{id?}', [Faculty::class, "fetchExamMarksData"]);
            });

            Route::prefix('student')->group(function () {
                Route::post('/fetch/{id?}', [Faculty::class, "fetchStudentData"]);
            });
        });

        Route::prefix('student')->middleware(['student-auth'])->group(function () {

            Route::post('/', [Student::class, "dashboard"]);

            Route::prefix('exam')->group(function () {
                Route::post('/fetch/{id?}', [Student::class, "fetchStudentScheduleExamData"]);
            });
            Route::prefix('todayexam')->group(function () {
                Route::post('/fetch/{id?}', [Student::class, "fetchStudentTodayExamData"]);
            });
            Route::prefix('doneexam')->group(function () {
                Route::post('/fetch/{id?}', [Student::class, "fetchStudentDoneExamData"]);
            });

            Route::prefix('examquestion')->group(function () {
                Route::post('/fetch/{id}', [Student::class, "fetchExamQuestionData"]);
                Route::post('/add/', [Student::class, "addExamMarksData"]);
            });
        });

        Route::post('course/fetch/', [General::class, "fetchCourseData"]);
    }
);
