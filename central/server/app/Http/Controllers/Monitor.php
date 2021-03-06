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
		$vm->ip = $theChosenOne->ip;
		$vm->ipV6 = $theChosenOne->ipV6;
		$vm->password = $json["password"];

		return $vm;	
		
	}

	public static function removeVM($vmId){

		$vm = VirtualMachines::where('id',$vmId)->get()->first();
		
		if(is_null($vm)){
			return "Error - No vm exist";
		}

		if($vm->running){

			$url = 'http://' . $vm->ip . "/instance/stopVM/" . $vm->unique_identifier;
			$reply = file_get_contents($url);
			$json = json_decode($reply, true);		

			if(!$json["success"])
				return "Error";

		}

		$vm->delete();
		return "success";

	}

	public static function pauseVMs($instance){

		$virutalMachines = VirtualMachines::where('ip',$instance->ip)->get();

		foreach ($virutalMachines as $key => $vm) {
			
			$url = 'http://' . $vm->ip . "/instance/pauseVM/" . $vm->unique_identifier;
			$reply = file_get_contents($url);
			$json = json_decode($reply, true);			

			if(!$json["success"])
				return "Error";

			$vm->running = false;
			$vm->unique_identifier = $json["image_id"];
			$vm->save();

		}

		return "success";
	}

	public static function resumeVMs($instance){

		$virutalMachines = VirtualMachines::where('running',false)->get();		

		foreach ($virutalMachines as $key => $vm) {

			$url = 'http://' . $instance->ip . "/instance/idle";
			$reply = file_get_contents($url);
			$json = json_decode($reply, true);

			if($json["success"]){

				if($json["is_idle"]){

					$url = 'http://' . $instance->ip . "/instance/resumeVM/" . $vm->unique_identifier;
					$reply = file_get_contents($url);
					$json = json_decode($reply, true);						

					if(!$json["success"])
						return "Error";

					$vm->unique_identifier = $json["instance_id"];
					$vm->port = $json["port"];
					$vm->running = true;
					$vm->ip = $instance->ip;
					$vm->ipV6 = $instance->ipV6;

					$vm->save();
				}

			}else{
				return "Error";
			}

		}

		return "success";

	}

}
