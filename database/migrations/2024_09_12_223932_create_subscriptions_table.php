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
        Schema::create('subscriptions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('plan');
            $table->decimal('amount', 10, 2);
            $table->string('currency', 3)->default('USD');
            $table->string('billing_cycle')->default('monthly'); // monthly, yearly, etc.
            $table->timestamp('start_date');
            $table->timestamp('end_date')->nullable();
            $table->timestamp('trial_ends_at')->nullable();
            $table->string('status')->default('active');
            $table->string('payment_method')->nullable();
            $table->string('payment_gateway')->nullable();
            $table->string('subscription_id')->nullable(); // ID from payment gateway
            $table->json('features')->nullable(); // Store plan features
            $table->boolean('auto_renew')->default(true);
            $table->timestamp('cancelled_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subscriptions');
    }
};