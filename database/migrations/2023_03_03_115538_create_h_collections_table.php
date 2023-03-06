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
        Schema::create('h_collections', function (Blueprint $table) {
            $table->id();
            $table->string('title_ru', 1000)->nullable();
            $table->string('title_en', 1000)->nullable();
            $table->string('title_original', 1000);
            $table->string('description', 5000)->nullable();
            $table->string('description_short')->nullable();
            $table->integer('episode_time')->default(21);
            //тэги
            $table->boolean('censure')->default(true);
            $table->string('image')->nullable();
            //скриншоты
            //ссылки где смотреть
            $table->date('announce_date');
            $table->date('release_date');
            $table->integer('episodes_released')->default(1);
            $table->integer('episodes_total')->default(2);
            $table->char('studio');
            $table->string('origins')->nullable();
            $table->string('author')->nullable();
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
        Schema::dropIfExists('h_collections');
    }
};
