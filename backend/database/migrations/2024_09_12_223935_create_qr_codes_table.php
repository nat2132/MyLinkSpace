<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('qr_codes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->string('type'); // 'profile', 'link', 'custom'
            $table->string('target_url');
            $table->string('image_path');
            $table->json('design_options')->nullable();
            $table->string('foreground_color')->default('#000000');
            $table->string('background_color')->default('#FFFFFF');
            $table->string('logo_path')->nullable();
            $table->integer('size')->default(300); // Size in pixels
            $table->string('error_correction')->default('M'); // L, M, Q, H
            $table->integer('scan_count')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('qr_codes');
    }
};
