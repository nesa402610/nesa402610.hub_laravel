<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::table('users', function (Blueprint $table) {
            $table->string('banner_image')->nullable();
            $table->string('background_profile_image')->nullable();
            $table->string('background_site_image')->nullable();
            $table->integer('badge')->nullable();
            $table->boolean('verified')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('banner_image');
            $table->dropColumn('background_profile_image');
            $table->dropColumn('background_site_image');
            $table->dropColumn('badge');
            $table->dropColumn('verified');
        });
    }
};
