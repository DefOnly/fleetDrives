<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Twilio\Rest\Client;
use App\Models\User;
use App\Models\TravelNotification;

class CodeController extends Controller
{
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

    public function sendNotificationToAgents(Request $request)
    {
        $idAgents = $request->route()->parameter('idAgents');
        $idStudents = $request->route()->parameter('idStudents');
        $idTravel = $request->route()->parameter('idTravel');
        $arrayAgents = explode(",", $idAgents);
        $arrayStudents = explode(",", $idStudents);
        $array = array();
        foreach ($arrayAgents as $idAgent) {
            foreach ($arrayStudents as $idStudent) {
                $students_agents = User::select(
                    'users.id',
                    'users.name',
                    'users.lastNameP',
                    'users.lastNameM',
                    'agents.id',
                    'agents.phone',
                    'travels.id',
                    'travels.date_travel',
                    'travels.hour_travel'
                )
                    ->join('agents', 'agents.id', '=', 'users.id_agent')
                    ->join('travels', 'travels.id_driver', '=', 'users.id_driver')
                    ->where('agents.id', '=', $idAgent)
                    ->where('users.id', '=', $idStudent)
                    ->where('travels.id', '=', $idTravel)
                    ->get();
                $result = json_decode(json_encode($students_agents), true);
                isset($result[0]['id']) && count($result[0]) > 0 ? array_push($array, $result[0]) : null;
                TravelNotification::where('id_student', $idStudent)->update([
                    'status_notification' => 2,
                ]);
            }
        }
        foreach ($array as $value) {
            try {
                $account_sid = getenv("TWILIO_SID");
                $auth_token = getenv("TWILIO_AUTH_TOKEN");
                $twilio_number = getenv("TWILIO_NUMBER");
                $client = new Client($account_sid, $auth_token);
                if ($value['hour_travel'] == "") {
                    $client->messages->create('+56' . $value['phone'], ['from' => $twilio_number, 'body' => 'fleetDrives: Buen día, se informa que el/la estudiante'
                        . " " . $value['name'] . " " . $value['lastNameP'] . " " . $value['lastNameM'] . " " . 'fue dejado por el coductor con fecha'
                        . " " . $value['date_travel'] . " " . 'en la Escuela Rural Riñinahue']);
                } else {
                    $client->messages->create('+56' . $value['phone'], ['from' => $twilio_number, 'body' => 'fleetDrives: Buen día, se informa que el/la estudiante'
                        . " " . $value['name'] . " " . " " . $value['lastNameP'] . " " . $value['lastNameM'] . " " . 'fue dejado por el coductor con fecha'
                        . " " . $value['date_travel'] . " " . 'y hora' . " " . $value['hour_travel'] . " " . ', en su dirección de domicilio']);
                }
            } catch (\Exception $e) {
                return $e->getMessage();
            }
        }
    }
}
