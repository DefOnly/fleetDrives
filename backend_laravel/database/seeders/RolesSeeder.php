<?php

namespace Database\Seeders;

use App\Models\Level;
use App\Models\Zone;
use App\Models\User;
use App\Models\Van;
use App\Models\Province;
use App\Models\Coordinate;
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
                'rut' => '17.247.705-4',
                'name' => 'LUIS LEANDRO',
                'lastNameP' => 'MEZAS',
                'lastNameM' => 'CAIHUANTE',
                'email' => 'mezas_17@hotmail.com',
                'phone' => '972529529',
                'password' => Hash::make('17247705-4'),
                'gender' => 'M',
                'status' => 1,
                'id_profile' => 1,
                'id_level' => 0,
                'zone' => '',
                'address' => '',
                'id_coordinates' => 0,
                'id_agent' => 0,
                'id_province' => 0,
            ],
            [
                'rut' => '13.402.004-0',
                'name' => 'EVELYNE YOLANDA',
                'lastNameP' => 'VASQUEZ',
                'lastNameM' => 'CALDERÓN',
                'email' => 'evyvasc@gmail.com',
                'phone' => '972529529',
                'password' => Hash::make('13402004-0'),
                'gender' => 'F',
                'status' => 1,
                'id_profile' => 1,
                'id_level' => 0,
                'zone' => '',
                'address' => '',
                'id_coordinates' => 0,
                'id_agent' => 0,
                'id_province' => 0,
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

        Van::insert([
            [
                'brand_model' => 'MERCEDES SPINTER 515',
                'unique_code' => 'GZHV-25',
            ],
            [
                'brand_model' => 'TOYOTA HIACE 2016',
                'unique_code' => 'HSHD 18',
            ],
            [
                'brand_model' => 'NISSAN NV350 WIDE 2.5',
                'unique_code' => 'LCFF 99',
            ],
            [
                'brand_model' => 'HYUNDAY H1 GLS 2.5',
                'unique_code' => 'GDRZ 88',
            ],
            [
                'brand_model' => 'MAXUS G10',
                'unique_code' => 'LHZG19',
            ],
        ]);

        Province::insert([
            [
                'nameProvince' => 'Lago Ranco',
                'id_coordinates' => 1
            ],
            [
                'nameProvince' => 'Río Bueno',
                'id_coordinates' => 2
            ],
            [
                'nameProvince' => 'Futrono',
                'id_coordinates' => 3
            ],
            [
                'nameProvince' => 'Panguipulli',
                'id_coordinates' => 4
            ],
            [
                'nameProvince' => 'La Unión',
                'id_coordinates' => 5
            ],
            [
                'nameProvince' => 'Paillaco',
                'id_coordinates' => 6
            ],
            [
                'nameProvince' => 'Los Lagos',
                'id_coordinates' => 7
            ],
            [
                'nameProvince' => 'Corral',
                'id_coordinates' => 8
            ],
            [
                'nameProvince' => 'Valdivia',
                'id_coordinates' => 9
            ],
            [
                'nameProvince' => 'Máfil',
                'id_coordinates' => 10
            ],
            [
                'nameProvince' => 'Mariquina',
                'id_coordinates' => 11
            ],
            [
                'nameProvince' => 'Lanco',
                'id_coordinates' => 12
            ],
        ]);

        Coordinate::insert([
            [
                'longitude' => '-72.48143674092786',
                'latitude' => '-40.321727593591696',
                'distance' => ""
            ],
            [
                'longitude' => '-72.95673684538671',
                'latitude' => '-40.33378657428165',
                'distance' => ""
            ],
            [
                'longitude' => '-72.3877169118501',
                'latitude' => '-40.13095767876047',
                'distance' => ""
            ],
            [
                'longitude' => '-72.33336013040743',
                'latitude' => '-39.64205050473542',
                'distance' => ""
            ],
            [
                'longitude' => '-73.08205268192494',
                'latitude' => '-40.29530827621472',
                'distance' => ""
            ],
            [
                'longitude' => '-72.87286323714504',
                'latitude' => '-40.07071231889942',
                'distance' => ""
            ],
            [
                'longitude' => '-72.81297007268563',
                'latitude' => '-39.86351268973177',
                'distance' => ""
            ],
            [
                'longitude' => '-73.43196598662855',
                'latitude' => '-39.88795241389737',
                'distance' => ""
            ],
            [
                'longitude' => '-73.24567215843776',
                'latitude' => '-39.81436129738878',
                'distance' => ""
            ],
            [
                'longitude' => '-72.95218463923578',
                'latitude' => '-39.66600158186679',
                'distance' => ""

            ],
            [
                'longitude' => '-72.96110279920306',
                'latitude' => '-39.53952767944304',
                'distance' => ""
            ],
            [
                'longitude' => '-72.77556188251154',
                'latitude' => '-39.452347675749024',
                'distance' => ""
            ],
        ]);

        Zone::insert([
            [
                'place' => 'POCURA',
            ],
            // id = 1
            [
                'place' => 'RIÑINAHUE',
            ],
            // id = 2
            [
                'place' => 'QUIRRASCO',
            ],
            // id = 3
            [
                'place' => 'RIÑINAHUE CENTRO',
            ],
            // id = 4
            [
                'place' => 'C LEAL',
            ],
            // id = 5
            [
                'place' => 'EL ARENAL',
            ],
            // id = 6
            [
                'place' => 'CALCURRUPE',
            ],
            // id = 7
            [
                'place' => 'EPULAFQUEN',
            ],
            // id = 8
            [
                'place' => 'LAS QUEMAS',
            ],
            // id = 9
            [
                'place' => 'RIÑINAHUE ALTO',
            ],
            // id = 10
            [
                'place' => 'FUTANGUE',
            ],
            // id = 11
            [
                'place' => 'LAS MOLIDAS',
            ],
            // id = 12
            [
                'place' => 'RANQUIL',
            ],
            // id = 13
            [
                'place' => 'LAGO RANCO',
            ],
            // id = 14
            [
                'place' => 'LOS ALAMOS',
            ],
            // id = 15
            [
                'place' => 'PASO LA MULA    ',
            ],
            // id = 16
            [
                'place' => 'IGLESIA CATOLICA',
            ],
            // id = 17
            [
                'place' => 'NILAHUE',
            ],
            // id = 18
            [
                'place' => 'MAYAY',
            ],
            // id = 19
            [
                'place' => 'ILIHUE',
            ],
            // id = 20
            [
                'place' => 'PUÑIRRE',
            ],
            // id = 21
            [
                'place' => 'ILLAHUAPI',
            ],
            // id = 22
            [
                'place' => 'PICHICO',
            ],
            // id = 23
            [
                'place' => 'CHANCO',
            ],
            // id = 24
            [
                'place' => 'CARRAN',
            ],
            // id = 25
            [
                'place' => 'PITREÑO',
            ],
            // id = 26
            [
                'place' => 'CALCURUPE',
            ],
            // id = 27
            [
                'place' => 'CALCURRUPE ALTO',
            ],
            // id = 28
            [
                'place' => 'CALCURRUPE BAJO',
            ],
            // id = 29
        ]);
        //    Player::factory(30)->create();
    }
}
