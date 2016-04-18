<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\Instance;
use App\VirtualMachines;

class UserInterface extends Controller
{
	
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

    	$virtualMachines = VirtualMachines::where('owner',$id);

    	return response()->json([
    		'instances'=>$instances,
    		'virtualMachines'=>$virtualMachines
    		]);

    }

    public function assignInstance(){

    	$id = 1;

    	$instance = Instance::where('owner','admin')->get()->first();

    	if(is_null($instance)){

    		return response()->json([
    			'error'=>'All Full'
    			]);

    	}else{

        	$instance->owner = $id;

	    	$instance->save();

	    	return response()->json([
	    		'instance'=>$instance
	    		]);

    	}

    }

    public function removeInstance($instaceId){

    	$id = 1;

    	$instance = Instance::where('id',$instaceId)->get()->first();

    	if(is_null($instance)){

			return response()->json([
    			'error'=>'No Instance'
    			]);    		

    	}
    	elseif ($instance->owner != $id) {
			
			return response()->json([
    			'error'=>"Unauth deletion"
    			]);

    	}
    	else{

    		$instance->owner = "admin";

    		$instance->save();

    		$message = "Your instance with id ".$instaceId." has been deleted";

	    	return response()->json([
	    		'message'=> $message
	    		]);

    	}

    }

    public function assignVM(){

    	$id = 1;

    }

    public function removeVM($vmId){

    	$id = 1;


    }


}
