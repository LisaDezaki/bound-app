<?php

namespace Database\Seeders;

use App\Models\Characteristic;
use App\Models\Kink;
use App\Models\User;
use App\Models\UserKink;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

		// Populate pronouns table from JSON

		$json = File::get(database_path('data/pronouns.json'));
		$pronouns = json_decode($json, true);
		foreach ($pronouns as $pronoun) {
			DB::table('pronouns')->insert( [
				'short' => $pronoun['short'],
				'full' => $pronoun['full']
			]);
		}



		// Populate characteristics table from JSON

		$json = File::get(database_path('data/characteristics.json'));
		$characteristics = json_decode($json, true);
		foreach ($characteristics as $characteristic) {
			DB::table('characteristics')->insert([
				['name' => $characteristic]
			]);
		}



		// Populate kinks table from JSON
		
		$defaultValues = [
			'description' => 'Default description',
		];
		$json = File::get(database_path('data/kinks.json'));
		$kinks = json_decode($json, true);
		// Loop through each item and merge with defaults before creating
		foreach ($kinks as $kink) {
			Kink::factory()->create(array_merge($defaultValues, $kink));
		}



		// Populate users table including admin

        User::factory()->create([
            'username' => 'Admin',
			'pronouns' => 4,
            'email' => 'admin@example.com',
        ]);
		User::factory(25)->create()->each(function ($user) {
			$user->characteristics()->attach(
				Characteristic::inRandomOrder()->take(rand(3,5))->get()
			);
		});



		// Create unique pivot entries

		User::each(function ($user) {
			$selectedKinks = Kink::inRandomOrder()->take(rand(15,20))->get();
            foreach ($selectedKinks as $kink) {
                // Use the pivot factory to create entries
                UserKink::factory()->create([
                    'user_id' => $user->id,
                    'kink_id' => $kink->id,
                ]);
            }
		});

        // foreach ($users as $user) {
        //     // Select a random number of projects to associate with the user
        //     $selectedKinks = Kink::inRandomOrder()->take(rand(5,8))->get();
        //     foreach ($selectedKinks as $kink) {
        //         // Use the pivot factory to create entries
        //         UserKink::factory()->create([
        //             'user_id' => $user->id,
        //             'kink_id' => $kink->id,
        //         ]);
        //     }
        // }
    }
}