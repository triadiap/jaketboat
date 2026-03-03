<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
class EnsureUsersEmailVerified
{
    /**
     * Create a new class instance.
     */    
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::guard('users')->user();

        if ($user && ! $user->hasVerifiedEmail()) {
            return redirect()->route('verification.notice');
        }

        return $next($request);
    }
}
