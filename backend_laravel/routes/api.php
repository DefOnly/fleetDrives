<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\TravelController;
use App\Http\Controllers\RutController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::group(['middleware' => 'api'], function ($router) {
   Route::post('login', [AuthController::class, 'login']);
   Route::post('loginrut', [RutController::class, 'loginrut'])->name('loginrut');

   // Módulo de gestión de usuarios
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::post('me', [AuthController::class, 'me']);
    Route::get('students/{course}',  [UserController::class, 'index']);
    Route::get('getAllUsers',  [UserController::class, 'getAllUsers']);
    Route::get('getStudents',  [UserController::class, 'getAllStudents']);
    Route::get('drivers',  [UserController::class, 'getAllDrivers']);
    Route::get('driversCheckStatus',  [UserController::class, 'driversCheckStatus']);
    Route::post('AddStudentParvulo',  [UserController::class, 'AddStudentParvulo']);
    Route::post('AddStudentBasica',  [UserController::class, 'AddStudentBasica']);
    Route::post('AddDriver',  [UserController::class, 'AddDriver']);
    Route::get('studentInfo/{idStudent}',  [UserController::class, 'getStudentInfo']);
    Route::get('driverInfo/{idDriver}',  [UserController::class, 'getDriverInfo']);
    Route::get('studentUpdate/{idStudent}',  [UserController::class, 'StudentUpdate']);
    Route::put('updateStudent/{idStudent}',  [UserController::class, 'updateStudent']);
    Route::put('UpdateInfoDriver/{parameters}',  [UserController::class, 'UpdateInfoDriver']);
    Route::put('changeDriver',  [UserController::class, 'changeDriver']);
    Route::get('driversCount',  [UserController::class, 'driversCount']);
    Route::get('getNumberStudents',  [UserController::class, 'getNumberStudents']);
    Route::get('driverStudent/{idDriver}',  [UserController::class, 'driverStudent']);
    Route::post('sendCodeVerification',  [UserController::class, 'sendCodeVerification']);
    Route::put('updateStatusUser',  [UserController::class, 'updateStatusUser']);
    // Módulo de planificación de viajes
    Route::post('AddDateTimeTravel',  [TravelController::class, 'AddDateTimeTravel']);
    Route::post('AddDateTravel',  [TravelController::class, 'AddDateTravel']);
    Route::delete('deleteTravel/{idTravel}',  [TravelController::class, 'deleteTravel']);
    Route::get('driverTravel',  [TravelController::class, 'driverTravel']);
    Route::get('driversTravelsCountPending',  [TravelController::class, 'driversTravelsCountPending']);
    Route::get('driversTravelsCountComplete',  [TravelController::class, 'driversTravelsCountComplete']);
    Route::get('showInfoTravel/{idTravel}',  [TravelController::class, 'showInfoTravel']);
});

Route::group(['middleware' => 'api2'], function () {
    // Módulo de conductorews
    Route::post('logout', [RutController::class, 'logout']);
    Route::post('refresh', [RutController::class, 'refresh']);
    Route::post('me', [RutController::class, 'me']);
  
});
