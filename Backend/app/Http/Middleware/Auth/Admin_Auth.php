<?php

namespace App\Http\Middleware\Auth;

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
        $isUserRoleIsAdmin = $request->session()->get('user_role')
            ? $request->session()->get('user_role') == "admin"
            : null;

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
