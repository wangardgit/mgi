<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'email' => 'superadmin@admin.com',
            'role_id' => '1',
            'is_admin' => '1',
            'first_name' => 'Super Admin',
            'status' => 'Active',
            'password' => Hash::make('123123'),
        ]);
    }
}
