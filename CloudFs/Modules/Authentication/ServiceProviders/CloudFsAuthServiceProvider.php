<?php

namespace CloudFs\Modules\Authentication\ServiceProviders;

use CloudFs\Modules\Authentication\Contracts\LoginInterface;
use CloudFs\Modules\Authentication\Contracts\RegisterInterface;
use CloudFs\Modules\Authentication\Repos\LoginRepo;
use CloudFs\Modules\Authentication\Repos\RegisterRepo;
use Illuminate\Support\ServiceProvider;

class CloudFsAuthServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        //
        $this->app->bind(RegisterInterface::class, RegisterRepo::class);
        $this->app->bind(LoginInterface::class, LoginRepo::class);
    }
}
