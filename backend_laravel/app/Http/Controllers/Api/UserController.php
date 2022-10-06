<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Driver;

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
            $students = User::select('rut', 'name', 'lastNameP', 'lastNameM', 'gender', 'id_level', 'id_zone', 'nameDriver', 'lastNameDP', 'lastNameDM')
                ->join('drivers', 'drivers.id', '=', 'users.id_driver')
                ->where('users.id_profile', '=', 2)
                ->where('users.id_level', '=', 1)
                ->get();
            return $students;
        } else if ($course == 'Kinder') {
            $students = User::select('rut', 'name', 'lastNameP', 'lastNameM', 'gender', 'id_level', 'id_zone', 'nameDriver', 'lastNameDP', 'lastNameDM')
                ->join('drivers', 'drivers.id', '=', 'users.id_driver')
                ->where('users.id_profile', '=', 2)
                ->where('users.id_level', '=', 2)
                ->get();
            return $students;
        } else if ($course == 'Primero Básico') {
            $students = User::select('rut', 'name', 'lastNameP', 'lastNameM', 'gender', 'id_level', 'id_zone', 'nameDriver', 'lastNameDP', 'lastNameDM')
                ->join('drivers', 'drivers.id', '=', 'users.id_driver')
                ->where('users.id_profile', '=', 2)
                ->where('users.id_level', '=', 3)
                ->get();
            return $students;
        } else if ($course == 'Segundo Básico') {
            $students = User::select('rut', 'name', 'lastNameP', 'lastNameM', 'gender', 'id_level', 'id_zone', 'nameDriver', 'lastNameDP', 'lastNameDM')
                ->join('drivers', 'drivers.id', '=', 'users.id_driver')
                ->where('users.id_profile', '=', 2)
                ->where('users.id_level', '=', 4)
                ->get();
            return $students;
        } else if ($course == 'Tercero Básico') {
            $students = User::select('rut', 'name', 'lastNameP', 'lastNameM', 'gender', 'id_level', 'id_zone', 'nameDriver', 'lastNameDP', 'lastNameDM')
                ->join('drivers', 'drivers.id', '=', 'users.id_driver')
                ->where('users.id_profile', '=', 2)
                ->where('users.id_level', '=', 5)
                ->get();
            return $students;
        } else if ($course == 'Cuarto Básico') {
            $students = User::select('rut', 'name', 'lastNameP', 'lastNameM', 'gender', 'id_level', 'id_zone', 'nameDriver', 'lastNameDP', 'lastNameDM')
                ->join('drivers', 'drivers.id', '=', 'users.id_driver')
                ->where('users.id_profile', '=', 2)
                ->where('users.id_level', '=', 6)
                ->get();
            return $students;
        } else if ($course == 'Quinto Básico') {
            $students = User::select('rut', 'name', 'lastNameP', 'lastNameM', 'gender', 'id_level', 'id_zone', 'nameDriver', 'lastNameDP', 'lastNameDM')
                ->join('drivers', 'drivers.id', '=', 'users.id_driver')
                ->where('users.id_profile', '=', 2)
                ->where('users.id_level', '=', 7)
                ->get();
            return $students;
        } else if ($course == 'Sexto Básico') {
            $students = User::select('rut', 'name', 'lastNameP', 'lastNameM', 'gender', 'id_level', 'id_zone', 'nameDriver', 'lastNameDP', 'lastNameDM')
                ->join('drivers', 'drivers.id', '=', 'users.id_driver')
                ->where('users.id_profile', '=', 2)
                ->where('users.id_level', '=', 8)
                ->get();
            return $students;
        } else if ($course == 'Séptimo Básico') {
            $students = User::select('rut', 'name', 'lastNameP', 'lastNameM', 'gender', 'id_level', 'id_zone', 'nameDriver', 'lastNameDP', 'lastNameDM')
                ->join('drivers', 'drivers.id', '=', 'users.id_driver')
                ->where('users.id_profile', '=', 2)
                ->where('users.id_level', '=', 9)
                ->get();
            return $students;
        } else if ($course == 'Octavo Básico') {
            $students = User::select('rut', 'name', 'lastNameP', 'lastNameM', 'gender', 'id_level', 'id_zone', 'nameDriver', 'lastNameDP', 'lastNameDM')
                ->join('drivers', 'drivers.id', '=', 'users.id_driver')
                ->where('users.id_profile', '=', 2)
                ->where('users.id_level', '=', 10)
                ->get();
            return $students;
        }
    }

    public function getAllDrivers()
    {
        $drivers = Driver::select('*')
            ->join('vans', 'vans.id', '=', 'drivers.id_car')
            ->get();
        return $drivers;
    }

    public function getStudentInfo(Request $request)
    {
        $studentInfo = $request->route()->parameter('info');
        $student = User::select('*')
            ->join('provinces', 'provinces.id', '=', 'users.id_province')
            ->join('zones', 'zones.id', '=', 'users.id_zone')
            ->join('agents', 'agents.id', '=', 'users.id_agent')
            ->where('users.rut', '=', $studentInfo)
            ->get();
        return $student;
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
