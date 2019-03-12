<?php
/**
 * Created by PhpStorm.
 * User: proteux
 * Date: 5/19/18
 * Time: 6:17 AM
 */

namespace CloudFs\Modules\FileSystem\Abstracts;


use CloudFs\Modules\FileSystem\Contracts\FileSystemInterface;

abstract class FileSystemAbstract implements FileSystemInterface
{
    protected $homeDirectory;
    const TRASH_DIRECTORY = 'Trash';
    function __construct()
    {
        $this->homeDirectory = null;

        if (auth()->check()) {
            $this->homeDirectory = auth()->user()->email;
            $this->homeDirectory = str_replace('.', '-', $this->homeDirectory);
        }
    }

    function getTrashDirectory()
    {
        return $this->homeDirectory.DIRECTORY_SEPARATOR.self::TRASH_DIRECTORY;
    }


}