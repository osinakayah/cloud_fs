<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void

     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);
	\DB::table('users')->insert([
		'email'=>'john@doe.com',
		'password'=> bcrypt('secret'),
		'name'=>'John Doe',
	]);
    }
}
