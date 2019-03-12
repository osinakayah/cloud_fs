<?php

namespace CloudFs\Modules\FileSystem\ServiceProvider;

use CloudFs\Modules\FileSystem\Contracts\FileSystemInterface;
use CloudFs\Modules\FileSystem\FileSystemRepo\FileSystemRepo;
use Illuminate\Support\ServiceProvider;

class FileSystemProvider extends ServiceProvider
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
        $this->app->bind(FileSystemInterface::class, FileSystemRepo::class);
    }
}
