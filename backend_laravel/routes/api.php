<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\TravelController;
use App\Http\Controllers\CodeController;
use App\Http\Controllers\ProfileController;
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

Route::group(['middleware' => 'api'], function () {
   Route::post('login', [AuthController::class, 'login']);
   Route::post('loginrut', [RutController::class, 'loginrut']);
   Route::post('logout', [AuthController::class, 'logout']);
   Route::post('refresh', [AuthController::class, 'refresh']);

   // Módulo de gestión de usuarios
    Route::post('me', [AuthController::class, 'me']);
    Route::get('students/{course}', [UserController::class, 'index']);
    Route::get('getAllUsers', [UserController::class, 'getAllUsers']);
    Route::get('getStudents', [UserController::class, 'getAllStudents']);
    Route::get('drivers', [UserController::class, 'getAllDrivers']);
    Route::get('driversCheckStatus', [UserController::class, 'driversCheckStatus']);
    Route::post('AddStudentParvulo', [UserController::class, 'AddStudentParvulo']);
    Route::post('AddStudentBasica', [UserController::class, 'AddStudentBasica']);
    Route::post('AddDriver', [UserController::class, 'AddDriver']);
    Route::get('studentInfo/{idStudent}',[UserController::class, 'getStudentInfo']);
    Route::get('driverInfo/{idDriver}', [UserController::class, 'getDriverInfo']);
    Route::get('studentUpdate/{idStudent}', [UserController::class, 'StudentUpdate']);
    Route::put('updateStudent/{idStudent}', [UserController::class, 'updateStudent']);
    Route::put('UpdateInfoDriver/{parameters}', [UserController::class, 'UpdateInfoDriver']);
    Route::put('changeDriver',[UserController::class, 'changeDriver']);
    Route::get('driversCount',[UserController::class, 'driversCount']);
    Route::get('getNumberStudents', [UserController::class, 'getNumberStudents']);
    Route::get('driverStudent/{idDriver}', [UserController::class, 'driverStudent']);
    Route::put('updateStatusUser', [UserController::class, 'updateStatusUser']);
    Route::get('travelsNotifications', [UserController::class, 'travelsNotifications']);
    Route::get('travelsNotificationsDriver/{idDriver}', [UserController::class, 'travelsNotificationsDriver']);

    //Controlador de API Twilio para notificaciones
    Route::post('sendCodeVerification', [CodeController::class, 'sendCodeVerification']); 
    Route::post('sendNotificationToAgents/{idAgents}/{idStudents}/{idTravel}', [CodeController::class, 'sendNotificationToAgents']);
    
    // Módulo de planificación de viajes
    Route::post('AddDateTimeTravel', [TravelController::class, 'AddDateTimeTravel']);
    Route::post('AddDateTravel', [TravelController::class, 'AddDateTravel']);
    Route::delete('deleteTravel/{idTravel}', [TravelController::class, 'deleteTravel']);
    Route::get('driverTravel', [TravelController::class, 'driverTravel']);
    Route::get('driversTravelsCountPending', [TravelController::class, 'driversTravelsCountPending']);
    Route::get('driversTravelsCountComplete', [TravelController::class, 'driversTravelsCountComplete']);
    Route::get('showInfoTravel/{idTravel}', [TravelController::class, 'showInfoTravel']);
    Route::get('showInfoLastTravel/{idTravel}', [TravelController::class, 'showInfoLastTravel']);
    Route::get('InfoDriver/{idDriver}', [TravelController::class, 'InfoDriver']);
    Route::get('changeStatusTravel/{idTravel}/{toDo}', [TravelController::class, 'changeStatusTravel']);
    Route::get('getInfoDriverTravel/{idDriver}', [TravelController::class, 'getInfoDriverTravel']);
    Route::get('checkAgentsNotification/{idStudents}',[TravelController::class, 'checkAgentsNotification']);
    Route::put('removeNotifications',[UserController::class, 'removeNotifications']);

    // Módulo de Perfil
    Route::put('UpdateDataProfileAdmin/{idUser}', [ProfileController::class, 'UpdateDataProfileAdmin']);
    Route::put('UpdateDataProfileDriver/{idUser}', [ProfileController::class, 'UpdateDataProfileDriver']);
    // Route::put('UpdateDataProfile/{idUser}',  [ProfileController::class, 'UpdateDataProfile']);
    //Módulo de Rastreos
    Route::get('getAllProvinces', [TravelController::class, 'getAllProvinces']);
    Route::get('getAllProvincesForDriver/{idDriver}', [TravelController::class, 'getAllProvincesForDriver']);
});

Route::group(['middleware' => 'api2'], function () {
    // Módulo de conductores
    Route::post('logout', [RutController::class, 'logout']);
    Route::post('refresh', [RutController::class, 'refresh']);
    Route::post('me', [RutController::class, 'me']);
  
});
