<?php

namespace Database\Seeders;

use App\Models\Level;
use App\Models\Zone;
use App\Models\User;
use App\Models\Van;
use App\Models\Province;
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
                'id_agent' => 0,
                'id_province' => 0,
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
                'brand' => 'MERCEDES',
                'model' => 'MERCEDES SPINTER 515',
                'unique_code' => 'GZHV-25',
            ],
            [
                'brand' => 'TOYOTA',
                'model' => 'TOYOTA HIACE 2016',
                'unique_code' => 'HSHD 18',
            ],
            [
                'brand' => 'NISSAN',
                'model' => 'NISSAN NV350 WIDE 2.5',
                'unique_code' => 'LCFF 99',
            ],
            [
                'brand' => 'HYUNDAY',
                'model' => 'HYUNDAY H1 GLS 2.5',
                'unique_code' => 'GDRZ 88',
            ],
            [
                'brand' => 'MAXUS',
                'model' => 'MAXUS G10',
                'unique_code' => 'LHZG19',
            ],
        ]);

        Province::insert([
            [
                'nameProvince' => 'Lago Ranco',
            ],
            [
                'nameProvince' => 'Río Bueno',
            ],
            [
                'nameProvince' => 'Futrono',
            ],
            [
                'nameProvince' => 'Panguipulli',
            ],
            [
                'nameProvince' => 'La Unión',
            ],
            [
                'nameProvince' => 'Paillaco',
            ],
            [
                'nameProvince' => 'Los Lagos',
            ],
            [
                'nameProvince' => 'Corral',
            ],
            [
                'nameProvince' => 'Valdivia',
            ],
            [
                'nameProvince' => 'Máfil',
            ],
            [
                'nameProvince' => 'Mariquina',
            ],
            [
                'nameProvince' => 'Lanco',
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
