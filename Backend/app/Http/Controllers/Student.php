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
    public function fetchStudentTodayExamData(Request $request, $id = 0)
    {
        try {

            $allGivenExamIds = DB::table("student_marks")->where('student_id', '=', $request->session()->get('user_id'))->select(['exam_id'])->get()->toArray();

            $condition = [];

            foreach ($allGivenExamIds as $key => $value) {
                array_push($condition, $value->exam_id);
            }

            $all_question_data = DB::table("exam")
                ->join("course", "exam.course_id", "=", "course.course_id")
                ->join("subject", "exam.subject_id", "=", "subject.subject_id")
                ->join("faculty", "exam.faculty_id", "=", "faculty.faculty_id")
                ->where("course.course_id", "=", $request->session()->get("course_id"))
                ->where("exam.exam_date", "=", date('Y-m-d'))
                ->whereNotIn('exam.exam_id', $condition)
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
        } catch (Exception $ex) {
            return response()->json([
                'body' => [],
                'msg' => $ex->getMessage(),
                'status' => 'fail'
            ], 400);
        }
    }

    public function fetchStudentDoneExamData(Request $request, $id = 0)
    {
        try {

            $allGivenExamIds = DB::table("student_marks")
                ->where('student_id', '=', $request
                    ->session()
                    ->get('user_id'))
                ->select(['exam_id'])
                ->get()
                ->toArray();

            $condition = [];

            foreach ($allGivenExamIds as $key => $value) {
                array_push($condition, $value->exam_id);
            }

            $all_question_data = DB::table("exam")
                ->join("course", "exam.course_id", "=", "course.course_id")
                ->join("subject", "exam.subject_id", "=", "subject.subject_id")
                ->join("faculty", "exam.faculty_id", "=", "faculty.faculty_id")
                ->join("student_marks", "exam.exam_id", "=", "student_marks.exam_id")
                ->where("course.course_id", "=", $request->session()->get("course_id"))
                ->where("exam.exam_date", "<=", date('Y-m-d'))
                ->whereIn('exam.exam_id', $condition)
                ->select(
                    [
                        "exam.questions_limit",
                        "student_marks.marks_obtained",
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
                'msg' => "All Exam Done Records",
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

    /**
     * student related api's
     */
    // this function is for Question data
    public function fetchExamQuestionData(Request $request, $id = 0)
    {
        try {
            $exam_data = DB::table("exam")->where('exam_id', '=', $id)->select()->first();

            $isExamAlreadyGiven = DB::table("student_marks")->where('exam_id', '=', $id)->where('student_id', '=', $request->session()->get('user_id'))->select()->first();

            if ($isExamAlreadyGiven) {
                return response()->json([
                    'body' => ['isExamDone' => true],
                    'msg' => 'You Had Already Given Exam',
                    'status' => 'fail'
                ], 400);
            } else if ($exam_data->exam_date != date('Y-m-d')) {
                return response()->json([
                    'body' => [],
                    'msg' => 'Invalid Date Of Exam Try Again Later',
                    'status' => 'fail'
                ], 400);
            }

            $all_question_data = DB::table("questions")
                ->join("subject", "questions.subject_id", "=", "subject.subject_id")
                ->join("course", "questions.course_id", "=", "course.course_id")
                ->where("course.course_id", "=", $exam_data->course_id)
                ->where("subject.subject_id", "=", $exam_data->subject_id)
                ->select(
                    "questions.question_id",
                    "questions.question_text",
                )
                ->orderByRaw('RAND()')
                ->limit($exam_data->questions_limit)
                ->get();

            $all_data = [];

            foreach ($all_question_data as $key => $value) {
                // question_text
                $options = DB::table("options")
                    ->select()
                    ->where("question_id", "=", $value->question_id)
                    ->get();

                array_push($all_data, [
                    'question_id' => $value->question_id,
                    'question_text' => $value->question_text,
                    'options' => $options
                ]);
            }


            return response()->json([
                'body' => [
                    'questions_list' => $all_data,
                    'start_time' => $exam_data->start_time,
                    'end_time' => $exam_data->end_time
                ],
                'msg' => "All Questions Data",
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

    // this function is for add Schedule Exam data
    public function addExamMarksData(Request $request)
    {
        // Validation on data
        $data_validation = validator::make($request->all(), [
            "marks_obtained" => "required|numeric",
            "exam_id" => "required|numeric",
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
            // insert Schedule Exam record in exam table
            $examId = DB::table('student_marks')->insertGetId([
                "marks_obtained" => $request->input("marks_obtained"),
                "exam_id" => $request->input("exam_id"),
                "student_id" => $request->session()->get('user_id')
            ]);
            DB::commit();
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
}
