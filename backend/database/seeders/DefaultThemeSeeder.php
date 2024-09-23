<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Theme;

class DefaultThemeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Theme::create([
            'name' => 'Default Theme',
            'background_type' => 'color', // Add this line
            'background_value' => '#FFFFFF', // Add this line with a default color
            'text_color' => '#000000', // Add this line
            'button_style' => 'default', // Add this line with a default value
            'button_color' => '#000000', // Add this line with a default button color
            'button_text_color' => '#FFFFFF', // Add this line
            'font_family' => 'Arial, sans-serif', // Add this line
            'button_font_family' => 'Arial, sans-serif', // Add this line
            // Add other necessary fields
        ]);
    }
}
