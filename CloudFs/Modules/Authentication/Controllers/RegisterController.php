<?php
/**
 * Created by PhpStorm.
 * User: proteux
 * Date: 5/18/18
 * Time: 3:01 AM
 */

namespace CloudFs\Modules\Authentication\Controllers;


use App\Http\Controllers\Controller;
use CloudFs\Modules\Authentication\Contracts\RegisterInterface;
use Illuminate\Http\Request;

class RegisterController extends Controller
{
    public function register(Request $request, RegisterInterface $register){
        try{
            $result = $register->register($request);
            if($result['status']){
                return jsend_success($result['data']);
            }
            return jsend_fail($result['data']);
        }catch (\Exception $exception){
            return jsend_error('Unable to register '.$exception->getMessage());
        }
    }
}