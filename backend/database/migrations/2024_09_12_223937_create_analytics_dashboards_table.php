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
        Schema::create('analytics_dashboards', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->bigInteger('total_clicks')->default(0);
            $table->bigInteger('total_views')->default(0);
            $table->float('ctr', 5, 2)->default(0);
            $table->json('top_performing_links')->nullable();
            $table->json('low_performing_links')->nullable();
            $table->json('daily_performance')->nullable();
            $table->json('weekly_performance')->nullable();
            $table->json('monthly_performance')->nullable();
            $table->float('bounce_rate', 5, 2)->default(0);
            $table->bigInteger('return_visitors')->default(0);
            $table->float('engagement_rate', 5, 2)->default(0);
            $table->json('real_time_clicks')->nullable();
            $table->json('traffic_sources')->nullable();
            $table->json('device_breakdown')->nullable();
            $table->json('geo_locations')->nullable();
            $table->json('time_on_page')->nullable();
            $table->json('custom_events')->nullable();
            $table->timestamp('last_updated_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('analytics_dashboards');
    }
};