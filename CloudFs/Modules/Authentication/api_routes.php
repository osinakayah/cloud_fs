<?php
/**
 * Created by PhpStorm.
 * User: proteux
 * Date: 5/16/18
 * Time: 5:36 AM
 */

Route::group(['prefix' => 'auth'], function (){
    Route::post('login', '\CloudFs\Modules\Authentication\Controllers\LoginController@login');
    Route::post('register', '\CloudFs\Modules\Authentication\Controllers\RegisterController@register');
});