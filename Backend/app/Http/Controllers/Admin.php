<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

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
}
