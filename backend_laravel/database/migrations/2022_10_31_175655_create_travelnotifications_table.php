<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTravelnotificationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('travelnotifications', function (Blueprint $table) {
            $table->id();
            $table->integer('id_travel');
            $table->integer('id_student');
            $table->enum('status_notification', [1, 2, 3])->default(1);  // 1. No generada, 2. Pendiente de envío, 3. Enviada
            $table->string('message')->nullable();
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
        Schema::dropIfExists('travelnotifications');
    }
}
