<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTravelsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('travels', function (Blueprint $table) {
            $table->id();
            $table->date('date_travel');
            $table->string('hour_travel')->nullable();
            $table->enum('type_travel', [1, 2, 3])->default(1);  // 1. No definido, 2. Ida, 3. Vuelta
            $table->integer('id_driver');
            $table->enum('status_travel', [1, 2, 3])->default(1); // 1. No iniciado, 2. En Ruta, 3. Completado
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
        Schema::dropIfExists('travels');
    }
}
