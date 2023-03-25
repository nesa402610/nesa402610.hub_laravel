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
        Schema::create('h_mangas', function (Blueprint $table) {
            $table->id();
            $table->string('title_ru')->nullable();
            $table->string('title_en')->nullable();
            $table->string('title_original');
            $table->string('description', 5000)->nullable();
            $table->string('description_short')->nullable();
            $table->boolean('censure')->default(true);
            $table->string('image')->nullable();
            $table->boolean('coloured')->default(false);
            $table->string('language')->default('ru');
            $table->date('announce_date');
            $table->date('release_date');
            //ссылаемся на автора
            $table->unsignedBigInteger('author')->nullable();
            $table->foreign('author')->references('id')->on('h_authors');
            //ссылаемся на адаптацию
            $table->unsignedBigInteger('anime')->nullable();
            $table->foreign('anime')->references('id')->on('h_collections');
            $table->string('review', 2000)->nullable();
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
        Schema::dropIfExists('h_mangas');
    }
};
