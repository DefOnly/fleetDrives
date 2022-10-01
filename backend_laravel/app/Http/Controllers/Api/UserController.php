<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $course = $request->route()->parameter('course');
        if ($course == 'Prekinder') {
            $students = User::select('*')
                ->join('drivers', 'drivers.id', '=', 'users.id_driver')
                ->where('users.id_profile', '=', 2)
                ->where('users.id_level', '=', 1)
                ->get();
            return $students;
        } else if ($course == 'Kinder') {
            $students = User::select('*')
                ->join('drivers', 'drivers.id', '=', 'users.id_driver')
                ->where('users.id_profile', '=', 2)
                ->where('users.id_level', '=', 2)
                ->get();
            return $students;
        } else if ($course == 'Primero Básico') {
            $students = User::select('*')
                ->join('drivers', 'drivers.id', '=', 'users.id_driver')
                ->where('users.id_profile', '=', 2)
                ->where('users.id_level', '=', 3)
                ->get();
            return $students;
        } else if ($course == 'Segundo Básico') {
            $students = User::select('*')
                ->join('drivers', 'drivers.id', '=', 'users.id_driver')
                ->where('users.id_profile', '=', 2)
                ->where('users.id_level', '=', 4)
                ->get();
            return $students;
        } else if ($course == 'Tercero Básico') {
            $students = User::select('*')
                ->join('drivers', 'drivers.id', '=', 'users.id_driver')
                ->where('users.id_profile', '=', 2)
                ->where('users.id_level', '=', 5)
                ->get();
            return $students;
        } else if ($course == 'Cuarto Básico') {
            $students = User::select('*')
                ->join('drivers', 'drivers.id', '=', 'users.id_driver')
                ->where('users.id_profile', '=', 2)
                ->where('users.id_level', '=', 6)
                ->get();
            return $students;
        } else if ($course == 'Quinto Básico') {
            $students = User::select('*')
                ->join('drivers', 'drivers.id', '=', 'users.id_driver')
                ->where('users.id_profile', '=', 2)
                ->where('users.id_level', '=', 7)
                ->get();
            return $students;
        } else if ($course == 'Sexto Básico') {
            $students = User::select('*')
                ->join('drivers', 'drivers.id', '=', 'users.id_driver')
                ->where('users.id_profile', '=', 2)
                ->where('users.id_level', '=', 8)
                ->get();
            return $students;
        } else if ($course == 'Séptimo Básico') {
            $students = User::select('*')
                ->join('drivers', 'drivers.id', '=', 'users.id_driver')
                ->where('users.id_profile', '=', 2)
                ->where('users.id_level', '=', 9)
                ->get();
            return $students;
        } else if ($course == 'Octavo Básico') {
            $students = User::select('*')
                ->join('drivers', 'drivers.id', '=', 'users.id_driver')
                ->where('users.id_profile', '=', 2)
                ->where('users.id_level', '=', 10)
                ->get();
            return $students;
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
