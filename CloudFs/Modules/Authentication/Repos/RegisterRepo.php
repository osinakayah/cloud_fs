<?php
/**
 * Created by PhpStorm.
 * User: proteux
 * Date: 5/18/18
 * Time: 3:07 AM
 */

namespace CloudFs\Modules\Authentication\Repos;


use App\User;
use CloudFs\Modules\Authentication\Contracts\RegisterInterface;
use CloudFs\Modules\Authentication\Events\UserRegisteredEvent;
use CloudFs\Modules\FileSystem\Contracts\FileSystemInterface;
use Illuminate\Http\Request;

class RegisterRepo implements RegisterInterface
{
    private $fileSystem;
    public function __construct(FileSystemInterface $fileSystem)
    {
        $this->fileSystem = $fileSystem;
    }

    function register(Request $request)
    {
        $user = User::create([
            'name'  => $request->get('name', ''),
            'email' => $request->get('email', ''),
            'password'  => bcrypt($request->get('password', '')),
        ]);
        if($user){
            $this->fileSystem->createUserHomeDirectory($user->email);

        }
        return ['status' => true, 'data' => $user,];
    }

}