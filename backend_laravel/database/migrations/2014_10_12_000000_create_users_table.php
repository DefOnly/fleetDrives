<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('drivers', function (Blueprint $table) {
            $table->id();
            $table->string('rutDriver');
            $table->string('nameDriver');
            $table->string('lastNameDP')->nullable();
            $table->string('lastNameDM')->nullable();
            $table->string('enterprise')->nullable();
            $table->string('email')->unique()->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password')->nullable();
            $table->integer('statusDriver')->default(1);
            $table->integer('id_van');
            $table->integer('id_college');
            // $table->integer('id_service_shipping')->nullable();
            $table->softDeletes();
            $table->rememberToken();
            $table->timestamps();
        });

        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('rut')->unique()->nullable();
            $table->string('name');
            $table->string('lastNameP');
            $table->string('lastNameM');
            $table->string('email')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password')->nullable();
            $table->string('gender');
            $table->integer('status')->default(1); /** 1: Activo, 0: Inactivo **/
            $table->integer('id_profile'); /** id del Perfil del usuario (1. Administrador, 2. Estudiante) **/
            $table->integer('id_level');
            $table->string('zone')->nullable();
            $table->string('address')->nullable();
            $table->integer('id_coordinates')->nullable();
            $table->integer('id_agent');
            $table->integer('id_province');
            $table->foreignId('id_driver')
                ->nullable() // <-- IMPORTANTE: LA COLUMNA DEBE ACEPTAR NULL COMO VALOR VALIDO
                ->onDelete('SET NULL')
                ->references('id')
                ->on('drivers');
            $table->softDeletes();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('drivers');
    }
}
