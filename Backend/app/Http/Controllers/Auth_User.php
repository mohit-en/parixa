<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class Auth_User extends Controller
{
    public function login(Request $request)
    {
        // Validation
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => "required|string|min:6"
        ]);

        if ($validator->fails()) {
            return response()->json(['body' => [], 'msg' => $validator->errors(), 'status' => 'fail'], 422);
        }

        try {
            // retrive data from database
            $data = DB::table("users")->select()->where([
                ['user_email', "=", $request->input('email')],
                ['user_password', "=", md5($request->input('password'))],
                ['flag', "=", 1]
            ])->first();

            // printf($data);

            // check that user is valid or not if valid then store it value in session
            if ($data) {

                if ($data->user_role == "student") {

                    $student_data = DB::table("student")
                        ->select(["student_id", "course_id"])
                        ->where("login_user_id", "=", $data->id)
                        ->first();
                    $request->session()->put([
                        'is_user_login' => "true",
                        'login_user_id' => $data->id,
                        'user_email' => $data->user_email,
                        'user_role' => $data->user_role,
                        'user_id' => $student_data->student_id,
                        'course_id' => $student_data->course_id
                    ]);
                } else if ($data->user_role == "faculty") {
                    $faculty_data = DB::table("faculty")
                        ->select(["faculty_id", "course_id"])
                        ->where("login_user_id", "=", $data->id)
                        ->first();
                    $request->session()->put([
                        'is_user_login' => "true",
                        'login_user_id' => $data->id,
                        'user_email' => $data->user_email,
                        'user_role' => $data->user_role,
                        'user_id' => $faculty_data->faculty_id,
                        'course_id' => $faculty_data->course_id
                    ]);
                } else {
                    $request->session()->put([
                        'is_user_login' => "true",
                        'login_user_id' => $data->id,
                        'user_email' => $data->user_email,
                        'user_role' => $data->user_role, //admin
                    ]);
                }
                return response()->json([
                    'body' => $request->session()->all(),
                    'msg' => "Login Successfully",
                    'status' => 'success'
                ], 200);
            }
            return response()->json([
                'body' => [],
                'msg' => "Invalid Data",
                'status' => 'fail'
            ], 401);
        } catch (Exception $e) {
            return response()->json([
                'body' => [],
                'msg' => $e->getMessage(),
                'status' => 'fail'
            ], 400);
        }
    }

    public function logout(Request $request)
    {
        $request->session()->flush();

        return response()->json([
            'body' => [],
            'msg' => "Logout successfully",
            'status' => 'success'
        ], 200);
    }

    public function isUserLogin(Request $request)
    {
        $isUserSessionCreated = $request->session()->has('is_user_login') || null;

        return response()->json([
            'body' => ['isUserLogin' => $isUserSessionCreated],
            'msg' => "done",
            'status' => 'success'
        ], 200);
    }
    public function fetchSessionData(Request $request)
    {
        try {
            return response()->json([
                'body' => session()->all(),
                'msg' => "done",
                'status' => 'success'
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'body' => [],
                'msg' => "Not Found",
                'status' => 'Not Found'
            ], 404);
        }
    }
    public function register(Request $request)
    {
        // Validation
        $validator = Validator::make($request->all(), [
            'user_email' => 'required|email',
            'user_password' => "required|string|min:6",
            'course_id' => "required|numeric|min:1",
            'user_role' => "required|max:8",
            'user_name' => "required|string",
            'user_moblie_number' => "required",
            'user_address' => "required"
        ]);

        if ($validator->fails()) {
            return response()->json([
                'body' => [],
                'msg' => $validator->errors(),
                'status' => 'fail'
            ], 422);
        }
        try {
            if ($request->input("user_role") == "student") {
                DB::beginTransaction();
                $userId = DB::table('users')->insertGetId([
                    'user_email' => $request->input("user_email"),
                    'user_password' => md5($request->input("user_password")),
                    "user_role" => "student",
                    "course_id" => $request->input("course_id")
                ]);

                // insert student record in student table
                DB::table('student')->insert([
                    "student_name" => $request->input("user_name"),
                    "student_mobile" => $request->input("user_moblie_number"),
                    "student_address" => $request->input("user_address"),
                    "course_id" => $request->input("course_id"),
                    "login_user_id" => $userId
                ]);
                DB::commit();
                // send response
                return response()->json([
                    'body' => [],
                    'msg' => "Your request send to the admin. when he allow then you can login.",
                    'status' => 'Success'
                ], 200);
            } elseif ($request->input("user_role") == "faculty") {
                DB::beginTransaction();
                $userId = DB::table('users')->insertGetId([
                    'user_email' => $request->input("user_email"),
                    'user_password' => md5($request->input("user_password")),
                    "user_role" => "faculty",
                    "course_id" => $request->input("course_id")
                ]);

                // insert student record in student table
                DB::table('faculty')->insert([
                    "faculty_name" => $request->input("user_name"),
                    "faculty_mobile" => $request->input("user_moblie_number"),
                    "faculty_address" => $request->input("user_address"),
                    "course_id" => $request->input("course_id"),
                    "login_user_id" => $userId
                ]);
                DB::commit();
                // send response
                return response()->json([
                    'body' => [],
                    'msg' => "Your request send to the admin. when he allow then you can login.",
                    'status' => 'Success'
                ], 200);
            }
        } catch (Exception $ex) {
            // DB::rollBack();
            return response()->json([
                'body' => [],
                'msg' => $ex->getMessage(),
                'status' => 'fail'
            ], 400);
        }
    }
}

// 1) => data validation check
// 2) => insert
// 3) => response send
