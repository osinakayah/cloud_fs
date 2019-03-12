<?php
/**
 * Created by PhpStorm.
 * User: proteux
 * Date: 5/16/18
 * Time: 3:30 PM
 */

namespace CloudFs\Modules\Authentication\Controllers;


use App\Http\Controllers\Controller;
use CloudFs\Modules\Authentication\Contracts\LoginInterface;
use Illuminate\Http\Request;

class LoginController extends Controller
{

    public function login(Request $request, LoginInterface $loginRepo){
        
        try{
            $result = $loginRepo->login($request);

            if($result['status']){
                return jsend_success($result['data']);
            }
            return jsend_fail($result['data'], 401);
        }catch (\Exception $exception){
            return jsend_error('Unable to login '.$exception->getMessage());
        }
    }
}