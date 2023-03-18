<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('studio_collection', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('collection_id');
            $table->foreign('collection_id')->references('id')->on('h_collections');
            $table->unsignedBigInteger('studio_id');
            $table->foreign('studio_id')->references('id')->on('studios');
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
        //
    }
};
