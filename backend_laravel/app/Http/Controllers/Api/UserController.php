<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Agent;
use App\Models\Zone;
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
            $students = User::select('users.id', 'rut', 'name', 'lastNameP', 'lastNameM', 'gender', 'id_level', 'zone', 'id_driver', 'nameDriver', 'lastNameDP', 'lastNameDM')
                ->join('drivers', 'drivers.id', '=', 'users.id_driver')
                ->where('users.id_profile', '=', 2)
                ->where('users.id_level', '=', 1)
                ->get();
            return $students;
        } else if ($course == 'Kinder') {
            $students = User::select('users.id', 'rut', 'name', 'lastNameP', 'lastNameM', 'gender', 'id_level', 'zone', 'id_driver', 'nameDriver', 'lastNameDP', 'lastNameDM')
                ->join('drivers', 'drivers.id', '=', 'users.id_driver')
                ->where('users.id_profile', '=', 2)
                ->where('users.id_level', '=', 2)
                ->get();
            return $students;
        } else if ($course == 'Primero Básico') {
            $students = User::select('users.id', 'rut', 'name', 'lastNameP', 'lastNameM', 'gender', 'id_level', 'zone', 'id_driver', 'nameDriver', 'lastNameDP', 'lastNameDM')
                ->join('drivers', 'drivers.id', '=', 'users.id_driver')
                ->where('users.id_profile', '=', 2)
                ->where('users.id_level', '=', 3)
                ->get();
            return $students;
        } else if ($course == 'Segundo Básico') {
            $students = User::select('users.id', 'rut', 'name', 'lastNameP', 'lastNameM', 'gender', 'id_level', 'zone', 'id_driver', 'nameDriver', 'lastNameDP', 'lastNameDM')
                ->join('drivers', 'drivers.id', '=', 'users.id_driver')
                ->where('users.id_profile', '=', 2)
                ->where('users.id_level', '=', 4)
                ->get();
            return $students;
        } else if ($course == 'Tercero Básico') {
            $students = User::select('users.id', 'rut', 'name', 'lastNameP', 'lastNameM', 'gender', 'id_level', 'zone', 'id_driver', 'nameDriver', 'lastNameDP', 'lastNameDM')
                ->join('drivers', 'drivers.id', '=', 'users.id_driver')
                ->where('users.id_profile', '=', 2)
                ->where('users.id_level', '=', 5)
                ->get();
            return $students;
        } else if ($course == 'Cuarto Básico') {
            $students = User::select('users.id', 'rut', 'name', 'lastNameP', 'lastNameM', 'gender', 'id_level', 'zone', 'id_driver', 'nameDriver', 'lastNameDP', 'lastNameDM')
                ->join('drivers', 'drivers.id', '=', 'users.id_driver')
                ->where('users.id_profile', '=', 2)
                ->where('users.id_level', '=', 6)
                ->get();
            return $students;
        } else if ($course == 'Quinto Básico') {
            $students = User::select('users.id', 'rut', 'name', 'lastNameP', 'lastNameM', 'gender', 'id_level', 'zone', 'id_driver', 'nameDriver', 'lastNameDP', 'lastNameDM')
                ->join('drivers', 'drivers.id', '=', 'users.id_driver')
                ->where('users.id_profile', '=', 2)
                ->where('users.id_level', '=', 7)
                ->get();
            return $students;
        } else if ($course == 'Sexto Básico') {
            $students = User::select('users.id', 'rut', 'name', 'lastNameP', 'lastNameM', 'gender', 'id_level', 'zone', 'id_driver', 'nameDriver', 'lastNameDP', 'lastNameDM')
                ->join('drivers', 'drivers.id', '=', 'users.id_driver')
                ->where('users.id_profile', '=', 2)
                ->where('users.id_level', '=', 8)
                ->get();
            return $students;
        } else if ($course == 'Séptimo Básico') {
            $students = User::select('users.id', 'rut', 'name', 'lastNameP', 'lastNameM', 'gender', 'id_level', 'zone', 'id_driver', 'nameDriver', 'lastNameDP', 'lastNameDM')
                ->join('drivers', 'drivers.id', '=', 'users.id_driver')
                ->where('users.id_profile', '=', 2)
                ->where('users.id_level', '=', 9)
                ->get();
            return $students;
        } else if ($course == 'Octavo Básico') {
            $students = User::select('users.id', 'rut', 'name', 'lastNameP', 'lastNameM', 'gender', 'id_level', 'zone', 'id_driver', 'nameDriver', 'lastNameDP', 'lastNameDM')
                ->join('drivers', 'drivers.id', '=', 'users.id_driver')
                ->where('users.id_profile', '=', 2)
                ->where('users.id_level', '=', 10)
                ->get();
            return $students;
        }
    }

    public function getAllDrivers()
    {
        $drivers = Driver::select('drivers.id', 'rutDriver', 'nameDriver', 'lastNameDP', 'lastNameDM', 'enterprise', 'email', 'brand', 'model', 'unique_code')
            ->join('vans', 'vans.id', '=', 'drivers.id_car')
            ->get();
        return $drivers;
    }

    public function getStudentInfo(Request $request)
    {
        $studentInfo = $request->route()->parameter('info');
        $student = User::select(
            'users.id',
            'rut',
            'name',
            'lastNameP',
            'lastNameM',
            'gender',
            'id_level',
            'zone',
            'nameProvince',
            'address',
            'id_agent',
            'id_province',
            'gender',
            'email',
            'id_level',
            'nameAgent',
            'phone',
            'email_agent'
        )
            ->join('provinces', 'provinces.id', '=', 'users.id_province')
            // ->join('zones', 'zones.id', '=', 'users.id_zone')
            ->join('agents', 'agents.id', '=', 'users.id_agent')
            ->where('users.rut', '=', $studentInfo)
            ->get();
        return $student;
    }

    public function updateStudent(Request $request)
    {
        $idStudent = $request->route()->parameter('idStudent');
        User::where('id', $idStudent)->update([
            'rut' => $request->rut,
            'name' => $request->name,
            'lastNameP' => $request->lastNameP,
            'lastNameM' => $request->lastNameM,
            'zone' => $request->zone,
            'address' => $request->address,
            'id_province' => $request->province,
            'gender' => $request->gender,
            'email' => $request->email,
            'id_level' => $request->idLevel,
        ]);
        // $student = User::findOrFail($idStudent);
        // $student->rut = $request->rut;
        // $student->name = $request->name;
        // $student->lastNameP = $request->lastNameP;
        // $student->lastNameM = $request->lastNameM;
        // $student->zone = $request->zone;
        // $student->address = $request->address;
        // $student->id_province = $request->province;
        // $student->gender = $request->gender;
        // $student->email = $request->email;
        // $student->id_level = $request->idLevel;

        // $student->save();

        $idAgent = $request->idAgent;
        Agent::where('id', $idAgent)->update([
            'nameAgent' => $request->nameAgent,
            'phone' => $request->phone,
            'email_agent' => $request->emailAgent,
        ]);

        $student = User::select('users.id', 'rut', 'name', 'lastNameP', 'lastNameM', 'gender', 'id_level', 'zone', 'nameDriver', 'lastNameDP', 'lastNameDM')
            ->join('drivers', 'drivers.id', '=', 'users.id_driver')
            ->where('users.id', $idStudent)
            ->get();

        return $student;

        // print($dataUpdate);
        // $data = explode(",", $dataUpdate);

        // Agent::where('id', $data[11])->update([
        //     'nameAgent' => $data[12],
        //     'phone' => $data[13],
        //     'email_agent' => $data[14],
        // ]);

        // User::where('id', $data[0])->update([
        //     'rut' => $data[1],
        //     'name' => $data[2],
        //     'lastNameP' => $data[3],
        //     'lastNameM' => $data[4],
        //     'zone' => $data[5],
        //     'address' => $data[6],
        //     'id_province' => $data[7],
        //     'gender' => $data[8],
        //     'email' => $data[9],
        //     'id_level' => $data[10],
        // ]);

        // return true;
    }

    public function StudentUpdate(Request $request)
    {
        $idStudent = $request->route()->parameter('idStudent');
        $students = User::select('rut', 'name', 'lastNameP', 'lastNameM', 'gender', 'id_level', 'zone', 'nameDriver', 'lastNameDP', 'lastNameDM')
            ->join('drivers', 'drivers.id', '=', 'users.id_driver')
            ->where('users.id', $idStudent)
            ->get();
        return $students;
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
