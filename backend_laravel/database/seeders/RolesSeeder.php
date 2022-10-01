<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Level;
use App\Models\User;
use Faker\Factory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::insert([
            [
                'rut' => '17247705-4',
                'name' => 'LUIS LEANDRO',
                'lastNameP' => 'MEZAS',
                'lastNameM' => 'CAIHUANTE',
                'email' => 'mezas_17@hotmail.com',
                'password' => Hash::make('17247705-4'),
                'gender' => 'M',
                'active' => 1,
                'id_profile' => 1,
                'id_level' => 0,
                'id_zone' => 0,
                'id_attorney' => 0,
            ],
            [
                'rut' => '13402004-0',
                'name' => 'EVELYNE YOLANDA',
                'lastNameP' => 'VASQUEZ',
                'lastNameM' => 'CALDERÓN',
                'email' => 'evyvasc@gmail.com',
                'password' => Hash::make('13402004-0'),
                'gender' => 'F',
                'active' => 1,
                'id_profile' => 1,
                'id_level' => 0,
                'id_zone' => 0,
                'id_attorney' => 0,
            ]
        ]);

        Level::insert([
            [
                'nameLevel' => 'PRE-KINDER',
            ],
            [
                'nameLevel' => 'KINDER',
            ],
            [
                'nameLevel' => 'PRIMERO BÁSICO',
            ],
            [
                'nameLevel' => 'SEGUNDO BÁSICO',
            ],
            [
                'nameLevel' => 'TERCERO BÁSICO',
            ],
            [
                'nameLevel' => 'CUARTO BÁSICO',
            ],
            [
                'nameLevel' => 'QUINTO BÁSICO',
            ],
            [
                'nameLevel' => 'SEXTO BÁSICO',
            ],
            [
                'nameLevel' => 'SÉPTIMO BÁSICO',
            ],
            [
                'nameLevel' => 'OCTAVO BÁSICO',
            ]
        ]);
        //    Player::factory(30)->create();
    }
}
