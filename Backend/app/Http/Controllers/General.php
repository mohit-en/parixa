<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;



class General extends Controller
{

    public function fetchCourseData(Request $request, $id = 0)
    {
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
}
