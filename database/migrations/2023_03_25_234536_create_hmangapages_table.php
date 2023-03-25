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
        Schema::create('hmangapages', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('manga_id');
            $table->string('page_link');
            $table->integer('page_number');
            $table->timestamps();

            $table->foreign('manga_id')->references('id')->on('h_mangas');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('hmangapages');
    }
};
