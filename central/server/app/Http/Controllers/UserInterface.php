<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\Instance;
use App\VirtualMachines;

class UserInterface extends Controller
{
    public function userDetails($id){
    	
    	$instances = Instance::where('owner',$id)->get();

    	$virtualMachines = VirtualMachines::where('owner',$id);

    	return response()->json([
    		'instances'=>$instances,
    		'virtualMachines'=>$virtualMachines
    		]);
    }

    public function assignInstance($id){

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


}
