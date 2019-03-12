<?php
/**
 * Created by PhpStorm.
 * User: proteux
 * Date: 5/16/18
 * Time: 5:40 AM
 */

if(!function_exists('generate_path_to_module_route')){
    /**
     * @param string $module
     * @return string
     */
    function generate_path_to_module_route($module){
        $path_to_route    = "/Modules/";
        $route_file     = '/api_routes.php';

        return dirname(__DIR__).$path_to_route.$module.$route_file ;
    }
}