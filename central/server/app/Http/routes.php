<?php
use App\Instance;
/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    /*$instance = new Instance;
    $instance->ip = "127.0.0.1";
    $instance->password = "oombu";

    $instance->save();*/
});
Route::group(['prefix'=>'api'],function(){

	Route::get('details','UserInterface@userDetails');

	Route::get('assignInstance','UserInterface@assignInstance');

	Route::get('removeInstance/{instanceId}','UserInterface@removeInstance');



});