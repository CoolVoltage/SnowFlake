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
    $instance->ip = "107.170.12.105";
    $instance->ipV6 = "2604:a880:0:1010::5e5:c001";
    $instance->password = "SnowFlake123";

    $instance->save();*/
});
Route::group(['prefix'=>'api'],function(){

	Route::get('details','UserInterface@userDetails');

	Route::get('assignInstance','UserInterface@assignInstance');

	Route::get('removeInstance/{instanceId}','UserInterface@removeInstance');

	Route::get('assignVM','UserInterface@assignVM');

	Route::get('removeVM/{vmId}','UserInterface@removeVM');

	Route::post('loginUser','UserInterface@loginUser');

	Route::get('isUserLoggedIn','UserInterface@isUserLoggedIn');

	Route::get('logoutUser','UserInterface@logoutUser');

	Route::get('admin','UserInterface@admin');

});