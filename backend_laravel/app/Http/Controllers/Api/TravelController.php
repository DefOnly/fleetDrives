<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
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

    public function driversTravelsCountPending(){
        $count = Travel::where('status_travel', "=", 1)->count();
        return $count;
    }

    public function driversTravelsCountComplete(){
        $count = Travel::where('status_travel', "=", 2)->count();
        return $count;
    }

    public function showInfoTravel(Request $request){
        $id_travel = $request->route()->parameter('idTravel');
        $showInfoTravel = Travel::select('*')->where('id', $id_travel)->get();
        return $showInfoTravel;
    }

    public function AddDateTimeTravel(Request $request)
    {
        Travel::insert([
            'date_travel' => $request->date,
            'hour_travel' => $request->time,
            'type_travel' => $request->type_travel,
            'id_driver' => $request->idDriver,
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

    public function deleteTravel(Request $request){
        $id_travel = $request->route()->parameter('idTravel');
        $idsTravel = TravelNotification::select('*')->where('id_travel', $id_travel)->get()->toArray();
        foreach($idsTravel as $idTravel){
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
            'travels.status_travel'
        )
            ->join('vans', 'vans.id', '=', 'drivers.id_van')
            ->leftJoin('travels', 'travels.id_driver', '=', 'drivers.id')
            ->where('drivers.id', '!=', 6)
            ->where('statusDriver', 1)
            ->get();
        return $drivers;
    }

    public function getAllProvinces(){
        $provinces = Coordinate::select('*')->join('provinces', 'provinces.id_coordinates', '=', 'coordinates.id')->get();
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
