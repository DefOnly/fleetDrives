<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Agent;
use Illuminate\Http\Request;
use App\Models\Travel;
use App\Models\TravelNotification;
use App\Models\Driver;
use App\Models\Coordinate;

class TravelController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    public function driversTravelsCountPending()
    {
        $count = Travel::where('status_travel', "=", 1)->count();
        return $count;
    }

    public function driversTravelsCountComplete()
    {
        $count = Travel::where('status_travel', "=", 3)->count();
        return $count;
    }

    public function showInfoTravel(Request $request)
    {
        $id_travel = $request->route()->parameter('idTravel');
        $showInfoTravel = Travel::select('*')->where('id', $id_travel)->get();
        return $showInfoTravel;
    }

    public function showInfoLastTravel(Request $request)
    {
        $id_travel = $request->route()->parameter('idTravel');
        $showInfoLastTravel = Travel::select('travels.id', 'travels.date_travel', 'travels.hour_travel', 'travels.type_travel', 'users.name',
        'users.lastNameP', 'users.lastNameM', 'levels.nameLevel')
        ->join('travelnotifications', 'travelnotifications.id_travel', '=', 'travels.id')
        ->join('users', 'users.id', '=', 'travelnotifications.id_student')
        ->join('levels', 'levels.id', '=', 'users.id_level')
        ->where('travels.id', $id_travel)
        ->where('travelnotifications.status_notification', 2)
        ->get();
        return $showInfoLastTravel;
    }

    public function InfoDriver(Request $request)
    {
        $idDriver = $request->route()->parameter('idDriver');
        $InfoDriver = Driver::select(
            'drivers.id',
            'nameDriver',
            'lastNameDP',
            'lastNameDM',
            'enterprise',
            'brand_model',
            'unique_code',
            'travels.id as idTravel',
            'travels.status_travel'
        )->join('travels', 'travels.id_driver', '=', 'drivers.id')
            ->join('vans', 'vans.id', '=', 'drivers.id_van')
            ->where('drivers.id', $idDriver)
            ->orderBy('travels.id', 'desc')
            ->get();
        return $InfoDriver;
    }
    public function changeStatusTravel(Request $request)
    {
        $idTravel = $request->route()->parameter('idTravel');
        $toDo = $request->route()->parameter('toDo');
        if ($toDo == 1) {
            Travel::where('id', $idTravel)->update([
                'status_travel' => 2,
            ]);
            return true;
        } else if ($toDo == 2) {
            Travel::where('id', $idTravel)->update([
                'status_travel' => 3,
            ]);
            return true;
        }
    }
    public function getInfoDriverTravel(Request $request)
    {
        $idDriver = $request->route()->parameter('idDriver');
        $getInfoDriver = Driver::select(
            'drivers.id',
            'nameDriver',
            'lastNameDP',
            'lastNameDM',
            'enterprise',
            // 'statusDriver',
            'brand_model',
            'unique_code',
            'travels.id as idTravel',
            'travels.status_travel',
            'id_student',
            'agents.id as idAgent',
            'travelnotifications.id as idNotification'
        )
            ->join('vans', 'vans.id', '=', 'drivers.id_van')
            ->join('travels', 'travels.id_driver', '=', 'drivers.id')
            ->join('users', 'users.id_driver', '=', 'travels.id_driver')
            ->join('travelnotifications', 'travelnotifications.id_student', '=', 'users.id')
            ->join('agents', 'agents.id', '=', 'users.id_agent')
            ->where('drivers.id', $idDriver)
            // ->orderByDesc('travels.id')
            // ->limit(1)
            // ->where('travels.status_travel', '3')
            ->get();
        return $getInfoDriver;
    }

    public function checkAgentsNotification(Request $request)
    {
        $idStudents = $request->route()->parameter('idStudents');
        $array = explode(",", $idStudents);
        $agentsArray = array();
        foreach ($array as $idStudent) {
            $agents = Agent::select('agents.id')
                ->join('users', 'users.id_agent', '=', 'agents.id')
                ->where('users.id', $idStudent)
                ->get();
            array_push($agentsArray, $agents[0]->id);
        }
        return $agentsArray;
    }

    public function AddDateTimeTravel(Request $request)
    {
        Travel::insert([
            'date_travel' => $request->date,
            'hour_travel' => $request->time,
            'type_travel' => $request->type_travel,
            'id_driver' => $request->idDriver,
            'status_notification' => 'Enviado'
        ]);
        $idTravel = Travel::select('id')->orderBy('id', 'desc')->take(1)->get();
        $studentsIds = $request->studentsIds;
        foreach ($studentsIds as $studentId) {
            TravelNotification::insert([
                'id_travel' =>  $idTravel[0]->id,
                'id_student' => $studentId
            ]);
        }
        return true;
    }
    public function AddDateTravel(Request $request)
    {
        Travel::insert([
            'date_travel' => $request->date,
            'type_travel' => $request->type_travel,
            'id_driver' => $request->idDriver,
            'status_notification' => 'Enviado',
        ]);
        $idTravel = Travel::select('id')->orderBy('id', 'desc')->take(1)->get();
        $studentsIds = $request->studentsIds;
        foreach ($studentsIds as $studentId) {
            TravelNotification::insert([
                'id_travel' =>  $idTravel[0]->id,
                'id_student' => $studentId
            ]);
        }
        return true;
    }

    public function deleteTravel(Request $request)
    {
        $id_travel = $request->route()->parameter('idTravel');
        $idsTravel = TravelNotification::select('*')->where('id_travel', $id_travel)->get()->toArray();
        foreach ($idsTravel as $idTravel) {
            TravelNotification::select('*')->where('id_travel', '=', $id_travel)->delete();
        }
        Travel::select('*')->where('id', '=', $id_travel)->delete();
        return true;
    }

    public function driverTravel()
    {
        $drivers = Driver::select(
            'drivers.id',
            'nameDriver',
            'lastNameDP',
            'lastNameDM',
            'enterprise',
            // 'statusDriver',
            'brand_model',
            'unique_code',
            'travels.id as idTravel',
            'travels.status_travel',
            'travels.date_travel'
        )
            ->join('vans', 'vans.id', '=', 'drivers.id_van')
            ->leftJoin('travels', 'travels.id_driver', '=', 'drivers.id')
            ->where('drivers.id', '!=', 6)
            ->where('statusDriver', 1)
            ->groupBy('nameDriver')
            ->get();
        return $drivers;
    }

    public function getAllProvinces()
    {
        $provinces = Coordinate::select('*')->join('provinces', 'provinces.id_coordinates', '=', 'coordinates.id')->get();
        return $provinces;
    }

    public function getAllProvincesForDriver(Request $request)
    {
        $idDriver = $request->route()->parameter('idDriver');
        $provinces = Coordinate::select('provinces.id', 'provinces.nameProvince', 'coordinates.longitude', 'coordinates.latitude',
        'users.address', 'users.name', 'users.lastNameP', 'users.lastNameM')
        ->join('provinces', 'provinces.id_coordinates', '=', 'coordinates.id')
        ->join('users', 'users.id_province', '=', 'provinces.id')
        ->join('drivers', 'drivers.id', '=', 'users.id_driver')
        ->where('drivers.id', $idDriver)
        ->get();
        return $provinces;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
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
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
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
