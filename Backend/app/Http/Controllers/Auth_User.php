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
            return response()->json(['body' => [], 'message' => $validator->errors(), 'status' => 'fail'], 422);
        }

        try {
            // retrive data from database
            $data = DB::table("users")->select()->where([
                ['user_email', "=", $request->input('email')],
                ['user_password', "=", md5($request->input('password'))],
                ['user_role', "=", $request->input('user_role')]
            ])->first();

            // check that user is valid or not if valid then store it value in session
            if ($data) {
                $request->session()->put([
                    'is_user_login' => "true",
                    'user_id' => $data->id,
                    'user_email' => $data->user_email,
                    'user_role' => $data->user_role
                ]);
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

    public function signup(Request $request)
    {
        // validate requested data
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => "required|string|min:6"
        ]);
        // response if validate requested data violates any validation rules
        if ($validator->fails()) {
            return response()->json(['body' => [], 'message' => $validator->errors(), 'status' => 'fail'], 422);
        }

        // insert data in users table
        try {
            DB::table("users")->insert([
                "user_email" => $request->input("email"),
                "user_password" => md5($request->input("password")),
                "user_role" => 1
            ]);
            return response()->json([
                'body' => [],
                'msg' => "Admin Added Successfully",
                'status' => 'success'
            ], 200);
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
        $isUserSessionCreated = $request->session()->has('user_id') || null;

        return response()->json([
            'body' => ['isUserLogin' => $isUserSessionCreated],
            'msg' => "done",
            'status' => 'success'
        ], 200);
    }
}

// 1) => data validation check
// 2) => insert
// 3) => response send
