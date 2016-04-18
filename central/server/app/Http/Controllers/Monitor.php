<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\Instance;
use App\VirtualMachines;

class Monitor extends Controller
{

	public static function getVM(){

		$theChosenOne = NULL;

		$instances = Instance::where('owner','admin')->get();

		if(is_null($instances)){

			return NULL;	

		}

		foreach ($instances as $key => $instance) {
			
			$url = 'http://' . $instance->ip . "/instance/idle";
			$reply = file_get_contents($url);
			$json = json_decode($reply, true);

			if($json["success"]){

				if($json["is_idle"]){

					$theChosenOne = $instance;
					break;

				}

			}else{

				return NULL;

			}

		}

		if(is_null($theChosenOne))
			return NULL;

		$vm = new VirtualMachines;		
		
		$url = 'http://' . $theChosenOne->ip . "/instance/startVM";
		$reply = file_get_contents($url);
		$json = json_decode($reply, true);

		if(!$json["success"])
			return NULL;

		$vm->unique_identifier = $json["container_id"];
		$vm->port = $json["port"];
		$vm->running = true;
		$vm->ip = $theChosenOne->ipV6;
		$vm->password = $json["password"];

		return $vm;	
		
	}

}
