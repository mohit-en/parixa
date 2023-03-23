<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class Admin_Auth
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $isUserSessionCreated = $request->session()->has('is_user_login') || null;
        $isUserRoleIsAdmin = $request->session()->get('user_id') ? $request->session()->get('user_role') == 1 : null;

        if ($isUserSessionCreated && $isUserRoleIsAdmin) {
            return $next($request);
        } else {
            return response()->json([
                'body' => [],
                'msg' => "Invalid Authentication Request For Admin Route",
                'status' => 'fail'
            ], 400);
        }
    }
}
