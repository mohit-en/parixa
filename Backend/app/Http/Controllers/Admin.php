<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;



class Admin extends Controller
{
    public function dashboard()
    {
        return response()->json([
            'body' => [],
            'msg' => "Welcome Admin",
            'status' => 'success'
        ], 200);
    }
    // this function is for Fetch student data
    public function fetchStudentData(Request $request, $id = 0)
    {
        try {
            // if admin user want all student's data
            if ($id == 0) {
                // fetch all student data from student table in database
                $all_student_data = DB::table("student")->select()->get();

                // if we have record send student's record in body key
                return response()->json([
                    'body' => $all_student_data,
                    'msg' => "All Student records",
                    'status' => 'success'
                ], 200);
            }

            // fetch specific student data based on id
            $student = DB::table("student")->select()->where("student_id", "=", $id)->first();

            // if we have no record of that specific student then ...
            if (!$student) {
                return response()->json([
                    'body' => [],
                    'msg' => "Not found Student",
                    'status' => 'Not found'
                ], 404);
            }
            // if we get specific student record then send response
            return response()->json([
                'body' => $student,
                'msg' => "Specific student data",
                'status' => 'success'
            ], 200);
        } catch (Exception $ex) {
            return response()->json([
                'body' => [],
                'msg' => $ex->getMessage(),
                'status' => 'fail'
            ], 200);
        }
    }
    // this function is for add student data
    public function addStudentData(Request $request)
    {
        // Validation on data
        $data_validation = validator::make($request->all(), [
            "student_name" => ["required", "regex:/^[a-zA-Z ]+$/", "min:2", "max:100"],
            "student_mobile" => ["required", "regex:/^[0-9]{10}$/"],
            "student_address" => "required|max:200",
            "student_img" => "required|max:200",
            "course_id" => "required|numeric",
            "email" => "required|email",
            "password" => "required|string|min:6",
        ]);

        if ($data_validation->fails()) {
            return response()->json([
                'body' => [],
                'msg' => $data_validation->errors(),
                'status' => 'success'
            ], 200);
        }
        try {

            $userId = DB::table('users')->insertGetId([
                'user_email' => $request->input("email"),
                'user_password' => md5($request->input("password")),
                "user_role" => "student",
                "flag" => 1
            ]);

            // insert student record in student table
            DB::table('student')->insert([
                "student_name" => $request->input("student_name"),
                "student_mobile" => $request->input("student_mobile"),
                "student_address" => $request->input("student_address"),
                "student_img" => $request->input("student_img"),
                "course_id" => $request->input("course_id"),
                "login_user_id" => $userId
            ]);

            // send response
            return response()->json([
                'body' => [],
                'msg' => "Data inserted Succesfully",
                'status' => 'success'
            ], 200);
        } catch (Exception $ex) {
            return response()->json([
                'body' => [],
                'msg' => $ex->getMessage(),
                'status' => 'fail'
            ], 200);
        }
    }

    // this function is for update student data
    public function updateStudentData(Request $request, $id)
    {
        // Validation on data
        $data_validation = validator::make($request->all(), [
            "student_name" => ["required", "regex:/^[a-zA-Z ]+$/", "min:2", "max:100"],
            "student_mobile" => ["required", "regex:/^[0-9]{10}$/"],
            "student_address" => "required|max:200",
            "student_img" => "required|max:200",
            "course_id" => "required|numeric",
            "login_user_id" => "required"
        ]);

        if ($data_validation->fails()) {
            return response()->json([
                'body' => [],
                'msg' => $data_validation->errors(),
                'status' => 'success'
            ], 200);
        }
        // if data is valid then update
        try {
            $data = DB::table("student")
                ->where("student_id", "=", $id)
                ->update($request->except("student_id"));
            if ($data) {
                return response()->json([
                    'body' => [],
                    'msg' => "Successfully Updated",
                    'status' => 'Updated'
                ], 200);
            }
            return response()->json([
                'body' => [],
                'msg' => "Not Updated",
                'status' => 'Not Updated'
            ], 400);
        } catch (Exception $ex) {
            return response()->json([
                'body' => [],
                'msg' => $ex->getMessage(),
                'status' => 'fail'
            ], 200);
        }
    }

    // this function is for delete student data
    public function deleteStudentData(Request $request, $id)
    {
        try {
            if (is_numeric($id) && $id > 0) {
                $data = DB::table("student")->where("student_id", "=", $id)->delete();
                if ($data) {
                    return response()->json([
                        'body' => [],
                        'msg' => $data,
                        'status' => 'Success delete'
                    ], 200);
                }
                return response()->json([
                    'body' => [],
                    'msg' => "Requested student data is not exist",
                    'status' => 'does\'t exist'
                ], 200);
            }
        } catch (Exception $ex) {
            return response()->json([
                'body' => [],
                'msg' => $ex->getMessage(),
                'status' => 'fail to delete'
            ], 200);
        }
    }

    /** */
    // this function is for Fetch faculty data
    public function fetchFacultyData(Request $request, $id = 0)
    {
        // if admin user want all faculty's data
        if ($id == 0) {
            // fetch all faculty data from faculty table in database
            $all_faculty_data = DB::table("faculty")->select()->get();

            // check that if we have not any record then
            if (!$all_faculty_data) {
                return response()->json([
                    'body' => [],
                    'msg' => "No facultys records have",
                    'status' => 'success'
                ], 200);
            }
            // if we have record send faculty's record in body key
            return response()->json([
                'body' => $all_faculty_data,
                'msg' => "All faculty records",
                'status' => 'success'
            ], 200);
        }

        try {
            // fetch specific faculty data based on id
            $faculty = DB::table("faculty")->select()->where("faculty_id", "=", $id)->first();

            // if we have no record of that specific faculty then ...
            if (!$faculty) {
                return response()->json([
                    'body' => [],
                    'msg' => "Not found faculty",
                    'status' => 'Not found'
                ], 404);
            }
            // if we get specific faculty record then send response
            return response()->json([
                'body' => $faculty,
                'msg' => "Specific faculty data",
                'status' => 'success'
            ], 200);
        } catch (Exception $ex) {
            return response()->json([
                'body' => [],
                'msg' => $ex->getMessage(),
                'status' => 'fail'
            ], 200);
        }
    }
    // this function is for add faculty data
    public function addFacultyData(Request $request)
    {
        // Validation on data
        $data_validation = validator::make($request->all(), [
            "faculty_name" => ["required", "regex:/^[a-zA-Z ]+$/", "min:2", "max:100"],
            "faculty_mobile" => ["required", "regex:/^[0-9]{10}$/"],
            "faculty_address" => "required|max:200",
            "faculty_img" => "required|max:200",
            "course_id" => "required|numeric",
            "email" => "required|email",
            "password" => "required|min:2|max:100"
        ]);

        if ($data_validation->fails()) {
            return response()->json([
                'body' => [],
                'msg' => $data_validation->errors(),
                'status' => 'success'
            ], 200);
        }
        try {

            $userId = DB::table('users')->insertGetId([
                "user_email" => $request->input("email"),
                "user_password" => md5($request->input("password")),
                "user_role" => "faculty"
            ]);

            // insert faculty record in faculty table
            DB::table('faculty')->insert([
                "faculty_name" => $request->input("faculty_name"),
                "faculty_mobile" => $request->input("faculty_mobile"),
                "faculty_address" => $request->input("faculty_address"),
                "faculty_img" => $request->input("faculty_img"),
                "course_id" => $request->input("course_id"),
                "login_user_id" => $userId
            ]);
            // send response
            return response()->json([
                'body' => [],
                'msg' => "Data inserted Succesfully",
                'status' => 'success'
            ], 200);
        } catch (Exception $ex) {
            return response()->json([
                'body' => [],
                'msg' => $ex->getMessage(),
                'status' => 'fail'
            ], 200);
        }
    }

    // this function is for update faculty data
    public function updateFacultyData(Request $request, $id)
    {
        // Validation on data
        $data_validation = validator::make($request->all(), [
            "faculty_name" => ["required", "regex:/^[a-zA-Z ]+$/", "min:2", "max:100"],
            "faculty_mobile" => ["required", "regex:/^[0-9]{10}$/"],
            "faculty_address" => "required|max:200",
            "faculty_img" => "required|max:200",
            "course_id" => "required|numeric",
            "login_user_id" => "required"
        ]);

        if ($data_validation->fails()) {
            return response()->json([
                'body' => [],
                'msg' => $data_validation->errors(),
                'status' => 'success'
            ], 200);
        }
        // if data is valid then update
        try {
            $data = DB::table("faculty")
                ->where("faculty_id", "=", $id)
                ->update($request->except("faculty_id"));
            if ($data) {
                return response()->json([
                    'body' => [],
                    'msg' => "Successfully Updated",
                    'status' => 'Updated'
                ], 200);
            }
            return response()->json([
                'body' => [],
                'msg' => "Not Updated",
                'status' => 'Not Updated'
            ], 400);
        } catch (Exception $ex) {
            return response()->json([
                'body' => [],
                'msg' => $ex->getMessage(),
                'status' => 'fail'
            ], 200);
        }
    }

    // this function is for delete faculty data
    public function deleteFacultyData(Request $request, $id)
    {
        try {
            if (is_numeric($id) && $id > 0) {
                $data = DB::table("faculty")->where("faculty_id", "=", $id)->delete();
                if ($data) {
                    return response()->json([
                        'body' => [],
                        'msg' => $data,
                        'status' => 'Success delete'
                    ], 200);
                }
                return response()->json([
                    'body' => [],
                    'msg' => "Requested faculty data is not exist",
                    'status' => 'does\'t exist'
                ], 200);
            }
        } catch (Exception $ex) {
            return response()->json([
                'body' => [],
                'msg' => $ex->getMessage(),
                'status' => 'fail to delete'
            ], 200);
        }
    }
}
