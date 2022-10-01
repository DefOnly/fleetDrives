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
            $table->string('lastNameDP');
            $table->string('lastNameDM');
            $table->string('enterprise');
            $table->string('email')->unique()->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password')->nullable();
            $table->integer('id_car');
            $table->integer('id_service_shipping')->nullable();
            $table->softDeletes();
            $table->rememberToken();
            $table->timestamps();
        });

        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('rut')->nullable();
            $table->string('name');
            $table->string('lastNameP');
            $table->string('lastNameM');
            $table->string('email')->unique()->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password')->nullable();
            $table->string('gender');
            $table->integer('active')->default(1);
            $table->integer('id_profile'); /** id del Perfil del usuario (1. Administrador, 2. Estudiante) **/
            $table->integer('id_level');
            $table->integer('id_zone');
            $table->integer('id_attorney');
            $table->foreign('id_driver')
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
