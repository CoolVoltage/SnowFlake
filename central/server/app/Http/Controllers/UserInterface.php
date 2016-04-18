<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\Instance;
use App\VirtualMachines;

class UserInterface extends Controller
{
	
	public function admin(){

		$instances = Instance::all();

		$virtualMachines = VirtualMachines::all();

		return response()->json([
			'instances'=>$instances,
			'virtualMachines'=>$virtualMachines,
			'message'=>'success'
			]);

	}

	public function loginUser(Request $request){

		return response()->json([
			'message'=>'success'
			]);

	}

	public function isUserLoggedIn(){
		
		return response()->json([
			'username'=>'pck'
			]);

	}

	public function logoutUser(){

		return response()->json([
			'message'=>'success'
			]);

	}

    public function userDetails(){
    
    	$id = 1;

    	$instances = Instance::where('owner',$id)->get();

    	$virtualMachines = VirtualMachines::where('owner',$id)->get();

    	return response()->json([
    		'instances'=>$instances,
    		'virtualMachines'=>$virtualMachines,
    		'message'=>'success'
    		]);

    }

    public function assignInstance(){

    	$id = 1;

    	$count = Instance::where('owner','admin')->count();

    	if($count == 0){

    		return response()->json([
    			'message'=>'All Full'
    			]);

    	}

    	if($count != 1){

    		$instances = Instance::where('owner','admin')->get();

    		$minCount = 100;
    		$chosenOne;

    		foreach ($instances as $key => $instance) {
    			
				$virtualMachinesRunning = VirtualMachines::where('ip',$instance->ip)->count();

				if($minCount > $virtualMachinesRunning){

					$minCount = $virtualMachinesRunning;
					$chosenOne = $instance;

				}		

    		}
    		
    		$instance = chosenOne;
    		
    	}else{

    		$instance = Instance::where('owner','admin')->get()->first();

    	}

    	$virtualMachinesRunning = VirtualMachines::where('ip',$instance->ip)->count();

    	if($virtualMachinesRunning != 0){
    		
    		$result = Monitor::pauseVMs($instance);

    		if($result != "success")
    			return response()->json([
    				'message'=>'Error - Pausing VMs'
    				]);

    	}

        $instance->owner = $id;

	    $instance->save();

	    return response()->json([
	    	'instance'=>$instance,
	    	'message'=>'success'
	    	]);



    }

    public function removeInstance($instaceId){

    	$id = 1;

    	$instance = Instance::where('id',$instaceId)->get()->first();

    	if(is_null($instance)){

			return response()->json([
    			'message'=>'No Instance'
    			]);    		

    	}
    	elseif ($instance->owner != $id) {
			
			return response()->json([
    			'message'=>"Unauth deletion"
    			]);

    	}
    	else{

    		$instance->owner = "admin";

    		$result = Monitor::resumeVMs($instance);

    		if($result != "success"){

    			return response()->json([
    				'message'=>"Error"
    				]);

    		}


    		$instance->save();

    		$message = "Your instance with id ".$instaceId." has been deleted";

	    	return response()->json([
	    		'info'=> $message,
	    		'message'=>'success'
	    		]);

    	}

    }

    public function assignVM(){

    	$id = 1;

    	$vm = Monitor::getVM();

    	if(is_null($vm)){

	    	return response()->json([
	    		'message'=>'Cloud is full.'
	    		]);

    	}else{
			
    		$vm->owner = $id;
    		$vm->save();

    		return response()->json([
		    		'virtualMachine'=>$vm,
		    		'message'=>'success'
		    		]);

    	}

    }

    public function removeVM($vmId){

    	$id = 1;

    	$message = Monitor::removeVM($vmId);

    	return response()->json([
		    		'message'=>$message
		    		]);

    }


}
