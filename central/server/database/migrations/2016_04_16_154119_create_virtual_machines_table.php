<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateVirtualMachinesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('virtual_machines', function (Blueprint $table) {
            $table->increments('id');
            $table->string('unique_identifier')->unique();
            $table->boolean('running');
            $table->string('ip');
            $table->string('port');
            $table->string('owner');
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
        Schema::drop('virtual_machines');
    }
}
