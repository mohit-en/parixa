<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;



class Faculty extends Controller
{
    public function dashboard()
    {
        $allCountOfStudent = DB::table("student")->count();
        $allCountOfFaculty = DB::table("faculty")->count();
        $allCountOfCourse = DB::table("course")->count();

        return response()->json([
            'body' => [
                'totalQuestions' => $allCountOfStudent,
                'totalFaculty' => $allCountOfFaculty,
                'totalCourse' => $allCountOfCourse
            ],
            'msg' => "Welcome Admin",
            'status' => 'success'
        ], 200);
    }
    /**
     * faculty related api's
     */
    // this function is for Question data
    public function fetchQuestionData(Request $request, $id = 0)
    {
        try {
            if ($id == 0) {
                // $all_question_data = DB::table("questions")->select()->get();
                $all_question_data = DB::table("questions")
                    ->join("subject", "questions.subject_id", "=", "subject.subject_id")
                    ->join("course", "questions.course_id", "=", "course.course_id")
                    ->select(
                        "questions.question_id",
                        "questions.question_text",
                        "questions.subject_id",
                        "subject.subject_name",
                        "questions.course_id",
                        "course.course_name"
                    )
                    ->get();

                return response()->json([
                    'body' => $all_question_data,
                    'msg' => "All Questions records",
                    'status' => 'success'
                ], 200);
            }

            // fetch specific question data based on id
            $question = DB::table("questions")
                ->select()
                ->where("question_id", "=", $id)
                ->first();
            $options = DB::table("options")
                ->select()
                ->where("question_id", "=", $id)
                ->get();

            // if we have no record of that specific question then ...
            if (!$question) {
                return response()->json([
                    'body' => [],
                    'msg' => "Not found Question",
                    'status' => 'Not found'
                ], 400);
            }
            // if we get specific student record then send response
            return response()->json([
                'body' => [
                    'question_id' => $question->question_id,
                    'question_text' => $question->question_text,
                    'subject_id' => $question->subject_id,
                    'course_id' => $question->course_id,
                    'options' => $options
                ],
                'msg' => "Specific question data",
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
    // this function is for add question data
    public function addQuestionData(Request $request)
    {
        // Validation on data
        $data_validation = validator::make($request->all(), [
            "question_text" => ["required", "max:100", "string"],
            "rightAnswer" => ["required", "numeric"],
            "subject_id" => ["required", "numeric"],
            "course_id" => ["required", "numeric"],
            "options" => ["required", "array"],
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
            // insert question record in question table
            $questionId = DB::table('questions')->insertGetId([
                'question_text' => $request->input("question_text"),
                'subject_id' => $request->input("subject_id"),
                "course_id" => $request->input("course_id"),
            ]);

            // insert options record in option table

            foreach ($request->input('options') as $key => $value) {
                DB::table('options')->insert([
                    "option_text" => $value,
                    "question_id" => $questionId,
                    "is_answer" => $key == $request->input("rightAnswer") ? 1 : 0,
                ]);
            }
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

    // this function is for update question data
    public function updateQuestionData(Request $request, $id)
    {
        // Validation on data
        $data_validation = validator::make($request->all(), [
            "question_text" => ["required", "max:100", "string"],
            "rightAnswer" => ["required", "numeric"],
            "subject_id" => ["required", "numeric"],
            "course_id" => ["required", "numeric"],
            "options" => ["required", "array"],
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

            // print_r($request->input());
            DB::beginTransaction();
            $questionId = DB::table('questions')
                ->where('question_id', "=", $id)
                ->update([
                    'question_text' => $request->input("question_text"),
                    'subject_id' => $request->input("subject_id"),
                    "course_id" => $request->input("course_id"),
                ]);


            foreach ($request->input('options') as $key => $value) {

                $d = DB::table('options')
                    ->where([['option_id', "=", $value['option_id']], ['question_id', '=', $id]])
                    ->update([
                        "option_text" => $value['option_text'],
                        "is_answer" => $key == $request->input("rightAnswer") ? 1 : 0,
                    ]);
            }
            DB::commit();


            return response()->json([
                'body' => [],
                'msg' => "Successfully Updated",
                'status' => 'Updated'
            ], 200);
        } catch (Exception $ex) {
            return response()->json([
                'body' => [],
                'msg' => $ex->getMessage(),
                'status' => 'fail'
            ], 400);
        }
    }

    // this function is for delete question data
    public function deleteQuestionData(Request $request, $id)
    {
        try {
            if (is_numeric($id) && $id > 0) {

                $deleteQuestion = DB::table("questions")
                    ->where("question_id", "=", $id)
                    ->delete();


                if ($deleteQuestion == 1) {
                    return response()->json([
                        'body' => [$deleteQuestion],
                        'msg' => 'Question Deleted Succesfully',
                        'status' => 'Success delete'
                    ], 200);
                }

                return response()->json([
                    'body' => [],
                    'msg' => "Requested Question's data is not exist",
                    'status' => "does't exist"
                ], 200);
            }
        } catch (Exception $ex) {
            return response()->json([
                'body' => [],
                'msg' => $ex->getMessage(),
                'status' => 'fail to delete'
            ], 400);
        }
    }
    // this function is for fetch course data
    public function fetchCourseData(Request $request)
    {
        try {
            // if admin user want all course's data

            // fetch all course data from course table in database
            $all_course_data = DB::table("course")->select(['course_id', 'course_name'])->get();

            $subjects = DB::table("subject")->select(["subject_id", "subject_name", "course_id"])->get();

            // if we get specific course record then send response
            return response()->json([
                'body' => ['course' => $all_course_data, 'subjects' => $subjects],
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

    /**
     * For scheduling exam related apis
     */
    public function fetchScheduleExamData(Request $request, $id = 0)
    {
        try {
            if ($id == 0) {
                $all_question_data = DB::table("exam")
                    ->join("course", "exam.course_id", "=", "course.course_id")
                    ->join("subject", "exam.subject_id", "=", "subject.subject_id")
                    ->join("faculty", "exam.faculty_id", "=", "faculty.faculty_id")
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
                            "exam.created_at",
                            "exam.updated_at"
                        ]
                    )
                    ->get();

                return response()->json([
                    'body' => $all_question_data,
                    'msg' => "All Questions records",
                    'status' => 'success'
                ], 200);
            }

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

    // this function is for add Schedule Exam data
    public function addScheduleExamData(Request $request)
    {
        // Validation on data
        $data_validation = validator::make($request->all(), [
            "exam_date" => "required|date",
            "start_time" => "required|date_format:H:i",
            "end_time" => "required|date_format:H:i|after:start_time",
            "questions_limit" => "required|numeric|min:1|max:100",
            "course_id" => "required|numeric",
            "subject_id" => "required|numeric",
            "faculty_id" => "required|numeric"
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
            $examId = DB::table('exam')->insertGetId([
                "exam_date" => $request->input("exam_date"),
                "start_time" => $request->input("start_time"),
                "end_time" => $request->input("end_time"),
                "questions_limit" => $request->input("questions_limit"),
                "course_id" => $request->input("course_id"),
                "subject_id" => $request->input("subject_id"),
                "faculty_id" => $request->input("faculty_id"),
            ]);
            DB::commit();
            return response()->json([
                'body' => [$examId],
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
    // this function is for update scheduled exam data
    public function updateScheduleExamData(Request $request, $id)
    {
        // Validation on data
        $data_validation = validator::make($request->all(), [
            "exam_date" => "required|date",
            "start_time" => "required|date_format:H:i",
            "end_time" => "required|date_format:H:i|after:start_time",
            "questions_limit" => "required|numeric|min:1|max:100",
            "course_id" => "required|numeric",
            "subject_id" => "required|numeric"
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

            // print_r($request->input());
            DB::beginTransaction();
            $questionId = DB::table('exam')
                ->where('exam_id', "=", $id)
                ->update([
                    "exam_date" => $request->input("exam_date"),
                    "start_time" => $request->input("start_time"),
                    "end_time" => $request->input("end_time"),
                    "questions_limit" => $request->input("questions_limit"),
                    "course_id" => $request->input("course_id"),
                    "subject_id" => $request->input("subject_id")
                ]);

            DB::commit();


            return response()->json([
                'body' => [],
                'msg' => "Successfully Updated",
                'status' => 'Updated'
            ], 200);
        } catch (Exception $ex) {
            return response()->json([
                'body' => [],
                'msg' => $ex->getMessage(),
                'status' => 'fail'
            ], 400);
        }
    }
    // this function is for delete Schedule Exam data
    public function deleteScheduleExamData(Request $request, $id)
    {
        try {
            if (is_numeric($id) && $id > 0) {

                $deleteQuestion = DB::table("exam")
                    ->where("exam_id", "=", $id)
                    ->delete();


                if ($deleteQuestion == 1) {
                    return response()->json([
                        'body' => [$deleteQuestion],
                        'msg' => 'Question Deleted Succesfully',
                        'status' => 'Success delete'
                    ], 200);
                }

                return response()->json([
                    'body' => [],
                    'msg' => "Requested Schedule data is not exist",
                    'status' => "does't exist"
                ], 200);
            }
        } catch (Exception $ex) {
            return response()->json([
                'body' => [],
                'msg' => $ex->getMessage(),
                'status' => 'fail to delete'
            ], 400);
        }
    }
}
