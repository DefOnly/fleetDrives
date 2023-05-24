<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Driver;
use Illuminate\Support\Facades\Hash;

class ProfileController extends Controller
{
    public function UpdateDataProfileAdmin(Request $request)
    {
        $idUser = $request->route()->parameter('idUser');
        $case = $request->case;
        if ($case == 1) {
            User::where('id', $idUser)->update([
                'name' => $request->name,
                'lastNameP' => $request->lastNameP,
                'lastNameM' => $request->lastNameM,
                'email' => $request->email,
                'phone' => $request->phone,
                'password' => Hash::make($request->password)
            ]);
            $response = User::where('id', $idUser)->get();
            return $response;
        } else {
            User::where('id', $idUser)->update([
                'name' => $request->name,
                'lastNameP' => $request->lastNameP,
                'lastNameM' => $request->lastNameM,
                'email' => $request->email,
                'phone' => $request->phone
            ]);
            $response = User::where('id', $idUser)->get();
            return $response;
        }
    }

    public function UpdateDataProfileDriver(Request $request)
    {
        $idUser = $request->route()->parameter('idUser');
        $case = $request->case;
        if ($case == 1) {
            Driver::where('id', $idUser)->update([
                'nameDriver' => $request->name,
                'lastNameDP' => $request->lastNameP,
                'lastNameDM' => $request->lastNameM,
                'email' => $request->email,
                'phone' => $request->phone,
                'password' => Hash::make($request->password)
            ]);
            $response = Driver::where('id', $idUser)->get();
            return $response;
        } else {
            Driver::where('rutDriver', strval($idUser))->update([
                'nameDriver' => $request->name,
                'lastNameDP' => $request->lastNameP,
                'lastNameDM' => $request->lastNameM,
                'email' => $request->email,
                'phone' => $request->phone
            ]);
            $response = Driver::where('rutDriver', strval($idUser))->get();
            return $response;
        }
    }
}
