<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;



class Student extends Controller
{
    public function dashboard()
    {
        // $allCountOfStudent = DB::table("student")->count();
        // $allCountOfFaculty = DB::table("faculty")->count();
        // $allCountOfCourse = DB::table("course")->count();

        return response()->json([
            'body' => [],
            'msg' => "Welcome Student",
            'status' => 'success'
        ], 200);
    }
    public function fetchStudentScheduleExamData(Request $request, $id = 0)
    {
        try {

            $course = DB::table("course")
                ->whereIn("course_id", function ($query) use ($request) {
                    $query->select("course_id")
                        ->from("student")
                        ->where("student_id", "=", $request->session()->get("user_id"));
                })
                ->select(["course_id"])
                ->first();
            $all_question_data = DB::table("exam")
                ->join("course", "exam.course_id", "=", "course.course_id")
                ->join("subject", "exam.subject_id", "=", "subject.subject_id")
                ->join("faculty", "exam.faculty_id", "=", "faculty.faculty_id")
                ->where("course.course_id", "=", $course->course_id)
                ->where("exam.exam_date", ">", date('Y-m-d'))
                ->select(
                    [
                        "exam.exam_id",
                        "exam.exam_date",
                        "exam.start_time",
                        "exam.end_time",
                        "exam.questions_limit",
                        "exam.course_id",
                        "course.course_name",
                        "exam.subject_id",
                        "subject.subject_name",
                        "exam.faculty_id",
                        "faculty.faculty_name",
                    ]
                )
                ->orderBy("exam.exam_date")
                ->get();

            return response()->json([
                'body' => $all_question_data,
                'msg' => "All Questions records",
                'status' => 'success'
            ], 200);


            // // fetch specific question data based on id
            // $question = DB::table("questions")
            //     ->select()
            //     ->where("question_id", "=", $id)
            //     ->first();
            // $options = DB::table("options")
            //     ->select()
            //     ->where("question_id", "=", $id)
            //     ->get();

            // // if we have no record of that specific question then ...
            // if (!$question) {
            //     return response()->json([
            //         'body' => [],
            //         'msg' => "Not found Question",
            //         'status' => 'Not found'
            //     ], 400);
            // }
            // // if we get specific student record then send response
            // return response()->json([
            //     'body' => [
            //         'question_id' => $question->question_id,
            //         'question_text' => $question->question_text,
            //         'subject_id' => $question->subject_id,
            //         'course_id' => $question->course_id,
            //         'options' => $options
            //     ],
            //     'msg' => "Specific question data",
            //     'status' => 'success'
            // ], 200);
        } catch (Exception $ex) {
            return response()->json([
                'body' => [],
                'msg' => $ex->getMessage(),
                'status' => 'fail'
            ], 400);
        }
    }
}
