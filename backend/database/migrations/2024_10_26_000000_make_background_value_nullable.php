<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * themes.background_value / custom_themes.background_value were created
     * NOT NULL without a default, which made Theme::firstOrCreate('Default
     * Theme') inserts fail (and register() then hit the profiles FK default).
     * Programmatic theme creation always supplies colors, but theme creation
     * from register() must not require them.
     */
    public function up(): void
    {
        DB::statement('ALTER TABLE themes ALTER COLUMN background_value DROP NOT NULL');
        DB::statement('ALTER TABLE custom_themes ALTER COLUMN background_value DROP NOT NULL');
    }

    public function down(): void
    {
        DB::table('themes')->whereNull('background_value')->update(['background_value' => '']);
        DB::table('custom_themes')->whereNull('background_value')->update(['background_value' => '']);
        DB::statement('ALTER TABLE themes ALTER COLUMN background_value SET NOT NULL');
        DB::statement('ALTER TABLE custom_themes ALTER COLUMN background_value SET NOT NULL');
    }
};
