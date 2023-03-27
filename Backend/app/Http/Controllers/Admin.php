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
    /**
     * Student related api's managed by admin
     */
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
                ], 400);
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
            ], 400);
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
                'status' => 'fail'
            ], 400);
        }
        try {
            DB::beginTransaction();
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
            DB::commit();
            // send response
            return response()->json([
                'body' => [],
                'msg' => "Data inserted Succesfully",
                'status' => 'success'
            ], 200);
        } catch (Exception $ex) {
            DB::rollBack();
            return response()->json([
                'body' => [],
                'msg' => $ex->getMessage(),
                'status' => 'fail'
            ], 400);
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
        ]);

        if ($data_validation->fails()) {
            return response()->json([
                'body' => [],
                'msg' => $data_validation->errors(),
                'status' => 'fail'
            ], 400);
        }
        // if data is valid then update
        try {
            $data = DB::table("student")
                ->where("student_id", "=", $id)
                ->update($request->all([
                    "student_name",
                    "student_mobile",
                    "student_address",
                    "student_img",
                    "course_id"
                ]));
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
            ], 400);
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
                'status' => 'fail'
            ], 400);
        }
    }

    /**
     * Faculty related api's managed by admin
     */
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
            ], 400);
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
            DB::beginTransaction();
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
            DB::commit();
            // send response
            return response()->json([
                'body' => [],
                'msg' => "Data inserted Succesfully",
                'status' => 'success'
            ], 200);
        } catch (Exception $ex) {
            DB::rollBack();
            return response()->json([
                'body' => [],
                'msg' => $ex->getMessage(),
                'status' => 'fail'
            ], 400);
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
        ]);

        if ($data_validation->fails()) {
            return response()->json([
                'body' => [],
                'msg' => $data_validation->errors(),
                'status' => 'fail'
            ], 400);
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
            ], 400);
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
                'status' => 'fail'
            ], 400);
        }
    }

    /**
     * courses related api's managed by admin
     */
    // this function is for fetch course data
    public function fetchCourseData(Request $request, $id = 0)
    {
        // if admin user want all course's data
        if ($id == 0) {
            // fetch all course data from course table in database
            $all_course_data = DB::table("course")->select()->get();

            // check that if we have not any record then
            if (!$all_course_data) {
                return response()->json([
                    'body' => [],
                    'msg' => "No courses records have",
                    'status' => 'fail'
                ], 400);
            }
            // if we have record send course's record in body key
            return response()->json([
                'body' => $all_course_data,
                'msg' => "All course records",
                'status' => 'success'
            ], 200);
        }

        try {
            // fetch specific course data based on id
            $course = DB::table("course")->select()->where("course_id", "=", $id)->first();

            // if we have no record of that specific course then ...
            if (!$course) {
                return response()->json([
                    'body' => [],
                    'msg' => "Not found course",
                    'status' => 'Not found'
                ], 404);
            }
            // if we get specific course record then send response
            return response()->json([
                'body' => $course,
                'msg' => "Specific course data",
                'status' => 'success'
            ], 200);
        } catch (Exception $ex) {
            return response()->json([
                'body' => [],
                'msg' => $ex->getMessage(),
                'status' => 'fail'
            ], 400);
        }
    }
    // this function is for add course data
    public function addCourseData(Request $request)
    {
        // Validation on data
        $data_validation = validator::make($request->all(), [
            "course_name" => ["required", "regex:/^[a-zA-Z ]+$/", "min:2", "max:50"],
        ]);

        if ($data_validation->fails()) {
            return response()->json([
                'body' => [],
                'msg' => $data_validation->errors(),
                'status' => 'fail'
            ], 400);
        }
        try {
            DB::beginTransaction();
            // insert course record in course table
            DB::table('course')->insert([
                "course_name" => $request->input("course_name")
            ]);
            DB::commit();
            // send response
            return response()->json([
                'body' => [],
                'msg' => "Data inserted Succesfully",
                'status' => 'success'
            ], 200);
        } catch (Exception $ex) {
            DB::rollBack();
            return response()->json([
                'body' => [],
                'msg' => $ex->getMessage(),
                'status' => 'fail'
            ], 400);
        }
    }

    // this function is for update course data
    public function updateCourseData(Request $request, $id)
    {
        // Validation on data
        $data_validation = validator::make($request->all(), [
            "course_name" => ["required", "regex:/^[a-zA-Z ()]+$/", "min:2", "max:50"],
        ]);

        if ($data_validation->fails()) {
            return response()->json([
                'body' => [],
                'msg' => $data_validation->errors(),
                'status' => 'fail'
            ], 400);
        }
        // if data is valid then update
        try {
            $data = DB::table("course")
                ->where("course_id", "=", $id)
                ->update($request->except("course_id"));
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
            ], 400);
        }
    }

    // this function is for delete course data
    public function deleteCourseData(Request $request, $id)
    {
        try {
            if (is_numeric($id) && $id > 0) {
                $data = DB::table("course")->where("course_id", "=", $id)->delete();
                if ($data) {
                    return response()->json([
                        'body' => [],
                        'msg' => $data,
                        'status' => 'Success delete'
                    ], 200);
                }
                return response()->json([
                    'body' => [],
                    'msg' => "Requested course data is not exist",
                    'status' => 'does\'t exist'
                ], 200);
            }
        } catch (Exception $ex) {
            return response()->json([
                'body' => [],
                'msg' => $ex->getMessage(),
                'status' => 'fail'
            ], 400);
        }
    }

    /**
     * subjects related api's managed by admin
     */
    // this function is for fetch subject data
    public function fetchSubjectData(Request $request, $id = 0)
    {
        // if admin user want all subject's data
        if ($id == 0) {
            // fetch all subject data from subject table in database
            $all_subject_data = DB::table("subject")->select()->get();

            // check that if we have not any record then
            if (!$all_subject_data) {
                return response()->json([
                    'body' => [],
                    'msg' => "No subjects records have",
                    'status' => 'fail'
                ], 400);
            }
            // if we have record send subject's record in body key
            return response()->json([
                'body' => $all_subject_data,
                'msg' => "All subject records",
                'status' => 'success'
            ], 200);
        }

        try {
            // fetch specific subject data based on id
            $subject = DB::table("subject")->select()->where("subject_id", "=", $id)->first();

            // if we have no record of that specific subject then ...
            if (!$subject) {
                return response()->json([
                    'body' => [],
                    'msg' => "Not found subject",
                    'status' => 'Not found'
                ], 404);
            }
            // if we get specific subject record then send response
            return response()->json([
                'body' => $subject,
                'msg' => "Specific subject data",
                'status' => 'success'
            ], 200);
        } catch (Exception $ex) {
            return response()->json([
                'body' => [],
                'msg' => $ex->getMessage(),
                'status' => 'fail'
            ], 400);
        }
    }
    // this function is for add subject data
    public function addSubjectData(Request $request)
    {
        // Validation on data
        $data_validation = validator::make($request->all(), [
            "subject_name" => ["required", "min:2", "max:50"],
            "course_id" => ["required"],
        ]);

        if ($data_validation->fails()) {
            return response()->json([
                'body' => [],
                'msg' => $data_validation->errors(),
                'status' => 'fail'
            ], 400);
        }
        try {
            DB::beginTransaction();
            // insert subject record in subject table
            DB::table('subject')->insert([
                "subject_name" => $request->input("subject_name"),
                "course_id" => $request->input("course_id")
            ]);
            DB::commit();
            // send response
            return response()->json([
                'body' => [],
                'msg' => "Data inserted Succesfully",
                'status' => 'success'
            ], 200);
        } catch (Exception $ex) {
            DB::rollBack();
            return response()->json([
                'body' => [],
                'msg' => $ex->getMessage(),
                'status' => 'fail'
            ], 400);
        }
    }

    // this function is for update subject data
    public function updateSubjectData(Request $request, $id)
    {
        // Validation on data
        $data_validation = validator::make($request->all(), [
            "subject_name" => ["required", "min:2", "max:50"],
        ]);

        if ($data_validation->fails()) {
            return response()->json([
                'body' => [],
                'msg' => $data_validation->errors(),
                'status' => 'fail'
            ], 400);
        }
        // if data is valid then update
        try {
            $data = DB::table("subject")
                ->where("subject_id", "=", $id)
                ->update($request->except(["subject_id", "course_id", "created_at", "updated_at"]));
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
            ], 400);
        }
    }

    // this function is for delete subject data
    public function deleteSubjectData(Request $request, $id)
    {
        try {
            if (is_numeric($id) && $id > 0) {
                $data = DB::table("subject")->where("subject_id", "=", $id)->delete();
                if ($data) {
                    return response()->json([
                        'body' => [],
                        'msg' => $data,
                        'status' => 'Success delete'
                    ], 200);
                }
                return response()->json([
                    'body' => [],
                    'msg' => "Requested subject data is not exist",
                    'status' => 'does\'t exist'
                ], 200);
            }
        } catch (Exception $ex) {
            return response()->json([
                'body' => [],
                'msg' => $ex->getMessage(),
                'status' => 'fail'
            ], 400);
        }
    }
}
