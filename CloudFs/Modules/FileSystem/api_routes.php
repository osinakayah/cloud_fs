<?php
/**
 * Created by PhpStorm.
 * User: proteux
 * Date: 5/19/18
 * Time: 5:40 AM
 */
Route::group(['prefix' => 'file'], function (){
    Route::post('/documents', '\CloudFs\Modules\FileSystem\Controllers\FileSystemController@index');
    Route::post('/create_directory', '\CloudFs\Modules\FileSystem\Controllers\FileSystemController@createFolder');
    Route::post('/upload', '\CloudFs\Modules\FileSystem\Controllers\FileSystemController@uploadFile');
    Route::post('/delete', '\CloudFs\Modules\FileSystem\Controllers\FileSystemController@delete');
    Route::post('/restore', '\CloudFs\Modules\FileSystem\Controllers\FileSystemController@restore');
    Route::post('/download', '\CloudFs\Modules\FileSystem\Controllers\FileSystemController@download');
});
