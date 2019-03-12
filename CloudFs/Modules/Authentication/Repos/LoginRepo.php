<?php
/**
 * Created by PhpStorm.
 * User: proteux
 * Date: 5/18/18
 * Time: 2:18 AM
 */

namespace CloudFs\Modules\Authentication\Repos;


use CloudFs\Modules\Authentication\Contracts\LoginInterface;
use Illuminate\Http\Request;

class LoginRepo implements LoginInterface
{
    public function login(Request $request){
        $email = $request->get('email', '');
        $password = $request->get('password', '');
        $token = auth()->attempt(['email' => $email, 'password' => $password]);
        if($token){
            return ['status' => true, 'data' => ['token' => $token, 'user' => auth()->user()]];
        }
        return ['status' => false, 'data' => 'Wrong Email or password'];
    }
}