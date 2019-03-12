<?php
/**
 * Created by PhpStorm.
 * User: proteux
 * Date: 5/18/18
 * Time: 3:12 AM
 */

namespace CloudFs\Modules\Authentication\Contracts;


use Illuminate\Http\Request;

interface RegisterInterface
{
    function register(Request $request);
}