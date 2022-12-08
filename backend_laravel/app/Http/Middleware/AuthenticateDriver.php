<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\AuthenticateDriver as Middleware;

class AuthenticateDriver extends Middleware
{
     protected function authenticate($request, array $guards)
    {
                if ($this->auth->guard($api2)->check()) {
                return $this->auth->shouldUse($api2);
            }    
        $this->unauthenticated($request, $api2);
    }

    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    protected function redirectTo($request)
    {
        if (! $request->expectsJson()) {
            return route('loginrut');
        }
    }
}
