<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Api\UserController;
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

Route::post('login', [AuthController::class, 'login']);

Route::group(['middleware' => 'api'], function () {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::post('me', [AuthController::class, 'me']);
    Route::get('students/{course}',  [UserController::class, 'index']);
    Route::get('getAllUsers',  [UserController::class, 'getAllUsers']);
    Route::get('getStudents',  [UserController::class, 'getAllStudents']);
    Route::get('drivers',  [UserController::class, 'getAllDrivers']);
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
});
