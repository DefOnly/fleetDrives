<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Agent;
use App\Models\Driver;
use App\Models\Van;
use Twilio\Rest\Client;
use Illuminate\Support\Facades\Hash;

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
            $students = User::select('users.id', 'rut', 'name', 'lastNameP', 'lastNameM', 'gender', 'status', 'id_level', 'zone', 'id_driver', 'nameDriver', 'lastNameDP', 'lastNameDM')
                ->join('drivers', 'drivers.id', '=', 'users.id_driver')
                ->where('users.id_profile', '=', 2)
                ->where('users.id_level', '=', 1)
                // ->where('users.status', '=', 1)
                ->get();
            return $students;
        } else if ($course == 'Kinder') {
            $students = User::select('users.id', 'rut', 'name', 'lastNameP', 'lastNameM', 'gender', 'status', 'id_level', 'zone', 'id_driver', 'nameDriver', 'lastNameDP', 'lastNameDM')
                ->join('drivers', 'drivers.id', '=', 'users.id_driver')
                ->where('users.id_profile', '=', 2)
                ->where('users.id_level', '=', 2)
                // ->where('users.status', '=', 1)
                ->get();
            return $students;
        } else if ($course == 'Primero Básico') {
            $students = User::select('users.id', 'rut', 'name', 'lastNameP', 'lastNameM', 'gender', 'status', 'id_level', 'zone', 'id_driver', 'nameDriver', 'lastNameDP', 'lastNameDM')
                ->join('drivers', 'drivers.id', '=', 'users.id_driver')
                ->where('users.id_profile', '=', 2)
                ->where('users.id_level', '=', 3)
                // ->where('users.status', '=', 1)
                ->get();
            return $students;
        } else if ($course == 'Segundo Básico') {
            $students = User::select('users.id', 'rut', 'name', 'lastNameP', 'lastNameM', 'gender', 'status', 'id_level', 'zone', 'id_driver', 'nameDriver', 'lastNameDP', 'lastNameDM')
                ->join('drivers', 'drivers.id', '=', 'users.id_driver')
                ->where('users.id_profile', '=', 2)
                ->where('users.id_level', '=', 4)
                // ->where('users.status', '=', 1)
                ->get();
            return $students;
        } else if ($course == 'Tercero Básico') {
            $students = User::select('users.id', 'rut', 'name', 'lastNameP', 'lastNameM', 'gender', 'status', 'id_level', 'zone', 'id_driver', 'nameDriver', 'lastNameDP', 'lastNameDM')
                ->join('drivers', 'drivers.id', '=', 'users.id_driver')
                ->where('users.id_profile', '=', 2)
                ->where('users.id_level', '=', 5)
                // ->where('users.status', '=', 1)
                ->get();
            return $students;
        } else if ($course == 'Cuarto Básico') {
            $students = User::select('users.id', 'rut', 'name', 'lastNameP', 'lastNameM', 'gender', 'status', 'id_level', 'zone', 'id_driver', 'nameDriver', 'lastNameDP', 'lastNameDM')
                ->join('drivers', 'drivers.id', '=', 'users.id_driver')
                ->where('users.id_profile', '=', 2)
                ->where('users.id_level', '=', 6)
                // ->where('users.status', '=', 1)
                ->get();
            return $students;
        } else if ($course == 'Quinto Básico') {
            $students = User::select('users.id', 'rut', 'name', 'lastNameP', 'lastNameM', 'gender', 'status', 'id_level', 'zone', 'id_driver', 'nameDriver', 'lastNameDP', 'lastNameDM')
                ->join('drivers', 'drivers.id', '=', 'users.id_driver')
                ->where('users.id_profile', '=', 2)
                ->where('users.id_level', '=', 7)
                // ->where('users.status', '=', 1)
                ->get();
            return $students;
        } else if ($course == 'Sexto Básico') {
            $students = User::select('users.id', 'rut', 'name', 'lastNameP', 'lastNameM', 'gender', 'status', 'id_level', 'zone', 'id_driver', 'nameDriver', 'lastNameDP', 'lastNameDM')
                ->join('drivers', 'drivers.id', '=', 'users.id_driver')
                ->where('users.id_profile', '=', 2)
                ->where('users.id_level', '=', 8)
                // ->where('users.status', '=', 1)
                ->get();
            return $students;
        } else if ($course == 'Séptimo Básico') {
            $students = User::select('users.id', 'rut', 'name', 'lastNameP', 'lastNameM', 'gender', 'status', 'id_level', 'zone', 'id_driver', 'nameDriver', 'lastNameDP', 'lastNameDM')
                ->join('drivers', 'drivers.id', '=', 'users.id_driver')
                ->where('users.id_profile', '=', 2)
                ->where('users.id_level', '=', 9)
                // ->where('users.status', '=', 1)
                ->get();
            return $students;
        } else if ($course == 'Octavo Básico') {
            $students = User::select('users.id', 'rut', 'name', 'lastNameP', 'lastNameM', 'gender', 'status', 'id_level', 'zone', 'id_driver', 'nameDriver', 'lastNameDP', 'lastNameDM')
                ->join('drivers', 'drivers.id', '=', 'users.id_driver')
                ->where('users.id_profile', '=', 2)
                ->where('users.id_level', '=', 10)
                // ->where('users.status', '=', 1)
                ->get();
            return $students;
        }
    }

    public function getAllStudents()
    {
        $students = User::all();
        return $students;
    }

    public function getAllDrivers()
    {
        $drivers = Driver::select('drivers.id', 'rutDriver', 'nameDriver', 'lastNameDP', 'lastNameDM', 'enterprise', 'email', 'brand_model', 'unique_code', 'statusDriver')
            ->join('vans', 'vans.id', '=', 'drivers.id_van')
            ->where('drivers.id', '!=', 6)
            ->where('statusDriver', 1)
            ->get();
        return $drivers;
    }
    public function driversCheckStatus()
    {
        $drivers = Driver::select('drivers.id', 'rutDriver', 'nameDriver', 'lastNameDP', 'lastNameDM', 'enterprise', 'email', 'brand_model', 'unique_code', 'statusDriver')
            ->join('vans', 'vans.id', '=', 'drivers.id_van')
            ->where('drivers.id', '!=', 6)
            ->get();
        return $drivers;
    }

    public function getAllUsers()
    {
        $users = User::select('rut')
            ->get()->toArray();
        $drivers = Driver::select('rutDriver')
            ->get()->toArray();
        $response = array_merge($users, $drivers);
        return $response;
    }

    public function getNumberStudents()
    {
        $count = User::where('users.id_profile', "=", 2)->count();
        return $count;
    }

    public function getStudentInfo(Request $request)
    {
        $idStudent = $request->route()->parameter('idStudent');
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
            'users.email',
            'users.phone',
            'id_driver',
            'nameDriver',
            'lastNameDP',
            'lastNameDM',
            'nameAgent',
            'agents.phone',
            'email_agent'
        )
            ->join('provinces', 'provinces.id', '=', 'users.id_province')
            ->join('drivers', 'drivers.id', '=', 'users.id_driver')
            ->join('agents', 'agents.id', '=', 'users.id_agent')
            ->where('users.id', '=', $idStudent)
            ->get();
        return $student;
    }

    public function getDriverInfo(Request $request)
    {
        $idDriver = $request->route()->parameter('idDriver');
        $driver = Driver::select(
            'drivers.id',
            'vans.id as van_id',
            'rutDriver',
            'nameDriver',
            'lastNameDP',
            'lastNameDM',
            'enterprise',
            'email',
            'brand_model',
            'unique_code'
        )
            ->join('vans', 'vans.id', '=', 'drivers.id_van')
            ->where('drivers.id', '=', $idDriver)
            ->get();
        return $driver;
    }

    public function driverStudent(Request $request)
    {
        $idDriver = $request->route()->parameter('idDriver');
        $driver_student = User::select('users.id', 'name', 'lastNameP', 'lastNameM', 'levels.nameLevel')
            ->join('levels', 'levels.id', '=', 'users.id_level')
            ->where('users.id_driver', '=', $idDriver)
            ->where('users.id_profile', '=', 2)
            ->where('users.status', '=', 1)
            ->get();
        $objArray = json_decode($driver_student);
        $newArray = array();
        foreach ($objArray as $value) {
            $value->idDriver = (int) $idDriver;
            $newArray[] = $value;
        }
        return $newArray;
    }

    public function sendCodeVerification(Request $request)
    {
        $pinArray = $request->pinArray;
        $user = $request->user;
        $getPhoneUserAdmin = User::select('phone')->where('id', '=', $user)->get();
        try {
            $account_sid = getenv("TWILIO_SID");
            $auth_token = getenv("TWILIO_AUTH_TOKEN");
            $twilio_number = getenv("TWILIO_NUMBER");
            $client = new Client($account_sid, $auth_token);
            $client->messages->create('+56' . $getPhoneUserAdmin[0]->phone, ['from' => $twilio_number, 'body' => 'fleetDrives: Su código de validación es:' . " " . implode("", $pinArray)]);
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function updateStatusUser(Request $request)
    {
        $action = $request->action;
        $idUser = $request->idUser;
        if ($action == 0) {
            User::where('id', $idUser)->update([
                'status' => 0, //Estudiante Inhabilitado
                'id_driver' => 6
            ]);
            return true;
        } else if ($action == 1) {
            User::where('id', $idUser)->update([
                'status' => 1, //Estudiante Habilitado
            ]);
            return true;
        } else if ($action == 2) {
            Driver::where('id', $idUser)->update([
                'statusDriver' => 0, //Conductor Inhabilitado
            ]);
            $changeToDefaultDriver = User::select('*')->where('id_driver', $idUser)->get()->toArray();
            foreach ($changeToDefaultDriver as $idDriver) {
                User::where('id_driver', $idUser)->update([
                    'id_driver' => 6,
                ]);
            }
            return true;
        } else {
            Driver::where('id', $idUser)->update([
                'statusDriver' => 1, //Conductor Habilitado
            ]);
            return true;
        }
    }

    public function AddStudentParvulo(Request $request)
    {
        Agent::insert([
            'nameAgent' => $request->nameAgent,
            'phone' => $request->phone,
            'email_agent' => $request->emailAgent,
        ]);
        $idAgent = Agent::select('id')->orderBy('id', 'desc')->take(1)->get();
        User::insert([
            'rut' => $request->rut,
            'name' => $request->name,
            'lastNameP' => $request->lastNameP,
            'lastNameM' => $request->lastNameM,
            'zone' => $request->zone,
            'address' => $request->address,
            'id_agent' => $idAgent[0]->id,
            'id_province' => $request->province,
            'id_driver' => 6,
            'gender' => $request->gender,
            'status' => 1, //Activo
            'id_profile' => 2,
            'email' => $request->email,
            'id_level' => $request->idLevel,
            'id_driver' => $request->idDriver
        ]);

        return true;
    }

    public function AddStudentBasica(Request $request)
    {
        Agent::insert([
            'nameAgent' => $request->nameAgent,
            'phone' => $request->phone,
            'email_agent' => $request->emailAgent,
        ]);
        $idAgent = Agent::select('id')->orderBy('id', 'desc')->take(1)->get();
        User::insert([
            'rut' => $request->rut,
            'name' => $request->name,
            'lastNameP' => $request->lastNameP,
            'lastNameM' => $request->lastNameM,
            'zone' => $request->zone,
            'address' => $request->address,
            'id_agent' => $idAgent[0]->id,
            'id_province' => $request->province,
            'id_driver' => 6,
            'gender' => $request->gender,
            'status' => 1, //Activo
            'id_profile' => 2,
            'email' => $request->email,
            'id_level' => $request->idLevel,
            'id_driver' => $request->idDriver
        ]);
        return true;
    }

    public function AddDriver(Request $request)
    {
        Van::insert([
            'brand_model' => $request->car,
            'unique_code' => $request->code,
        ]);
        $idVan = Van::select('id')->orderBy('id', 'desc')->take(1)->get();
        Driver::insert([
            'rutDriver' => $request->rut,
            'nameDriver' => $request->nameDriver,
            'lastNameDP' => $request->lastNameP,
            'lastNameDM' => $request->lastNameM,
            'enterprise' => $request->enterprise,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'id_van' => $idVan[0]->id,
        ]);
        return true;
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
            'id_driver' => $request->idDriver,
            'gender' => $request->gender,
            'email' => $request->email,
            'id_level' => $request->idLevel,
        ]);

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
    }

    public function UpdateInfoDriver(Request $request)
    {
        $idDriver = $request->route()->parameter('parameters');
        $id = explode(",", $idDriver);
        Van::where('id', $id[1])->update([
            'brand_model' => $request->car,
            'unique_code' => $request->code,
        ]);
        Driver::where('id', $id[0])->update([
            'rutDriver' => $request->rutDriver,
            'nameDriver' => $request->nameDriver,
            'lastNameDP' => $request->lastNameP,
            'lastNameDM' => $request->lastNameM,
            'enterprise' => $request->enterprise,
            'email' => $request->email,
        ]);
        return true;
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

    public function changeDriver(Request $request)
    {
        $idStudent = $request->idStudent;
        User::where('id', $idStudent)->update([
            'id_driver' => $request->idDriver,
        ]);
    }

    public function driversCount()
    {
        $count = Driver::select('id', 'statusDriver')
            ->where('id', "!=", 6)
            ->where('statusDriver', 1)
            ->count();
        return $count;
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
