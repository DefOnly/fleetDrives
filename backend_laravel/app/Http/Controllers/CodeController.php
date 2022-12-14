<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Twilio\Rest\Client;
use App\Models\User;

class CodeController extends Controller
{
    public function sendCodeVerification(Request $request)
    {
        $pinArray = $request->pinArray;
        $user = $request->user;
        $getPhoneUserAdmin = User::select('phone')->where('id', '=', $user)->get();
        try {
            $account_sid = getenv("TWILIO_ACCOUNT_SID");
            $auth_token = getenv("TWILIO_AUTH_TOKEN");
            $twilio_number = getenv("TWILIO_NUMBER");
            $client = new Client($account_sid, $auth_token);
            $client->messages->create('+56' . $getPhoneUserAdmin[0]->phone, ['from' => $twilio_number, 'body' => 'fleetDrives: Su código de validación es:' . " " . implode("", $pinArray)]);
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }
}
