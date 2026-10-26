<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * themes.style columns were created NOT NULL without defaults, so a
     * programmatic theme created from just a name (Theme::firstOrCreate
     * in register()) cannot insert. Styling columns are optional until a
     * theme is customized; make them nullable.
     */
    public function up(): void
    {
        foreach ([
            'text_color',
            'button_style',
            'button_color',
            'button_text_color',
            'font_family',
            'button_font_family',
        ] as $column) {
            DB::statement("ALTER TABLE themes ALTER COLUMN {$column} DROP NOT NULL");
        }
    }

    public function down(): void
    {
        foreach ([
            'text_color',
            'button_style',
            'button_color',
            'button_text_color',
            'font_family',
            'button_font_family',
        ] as $column) {
            DB::table('themes')->whereNull($column)->update([$column => '']);
            DB::statement("ALTER TABLE themes ALTER COLUMN {$column} SET NOT NULL");
        }
    }
};
