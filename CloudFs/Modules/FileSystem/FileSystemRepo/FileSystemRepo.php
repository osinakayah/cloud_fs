<?php
/**
 * Created by PhpStorm.
 * User: proteux
 * Date: 5/19/18
 * Time: 6:37 AM
 */

namespace CloudFs\Modules\FileSystem\FileSystemRepo;


use CloudFs\Modules\FileSystem\Abstracts\FileSystemAbstract;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class FileSystemRepo extends FileSystemAbstract
{
    private $fileDisk;

    public function __construct()
    {
        parent::__construct();
//        $this->fileDisk = \Storage::disk('gcs');
        $this->fileDisk = \Storage::disk();
    }

    function getFiles(string $path)
    {

        if($path == DIRECTORY_SEPARATOR){
            $path = $this->homeDirectory.DIRECTORY_SEPARATOR;
        }

        $files = $this->fileDisk->files($path);
        $directories = $this->fileDisk->directories($path);

        return array_merge($files, $directories);
    }

    function getFile(string $filePath)
    {
        $directoryName = str_replace('.', '-', auth()->user()->email);
        return $this->fileDisk->download($directoryName+DIRECTORY_SEPARATOR.$filePath);
    }

    function deleteFile(string $filePath)
    {
        $to = substr($filePath, strlen($this->homeDirectory.DIRECTORY_SEPARATOR));
        return $this->fileDisk->move($filePath, $this->getTrashDirectory().DIRECTORY_SEPARATOR.$to);
    }

    function createUserHomeDirectory(string $directoryName)
    {
        $directoryName = str_replace('.', '-', $directoryName);
        $this->fileDisk->makeDirectory($directoryName);
        $this->fileDisk->makeDirectory($directoryName.DIRECTORY_SEPARATOR.'Trash');
    }

    function createDirectory(string $directory)
    {
        return $this->fileDisk->makeDirectory($directory);
    }

    function uploadFile(UploadedFile $file)
    {
        $directoryName = str_replace('.', '-', auth()->user()->email);
        return $this->fileDisk->putFileAs($directoryName, $file, $file->getClientOriginalName(), 'public');
    }

    function restoreFile(string $deletedFilePath)
    {
        $toPos = strlen($this->homeDirectory.DIRECTORY_SEPARATOR);
        $deletedFileNamePos = strlen($this->getTrashDirectory().DIRECTORY_SEPARATOR);
        $to = substr($deletedFilePath, 0, $toPos).substr($deletedFilePath, $deletedFileNamePos);
        //return [$deletedFilePath, DIRECTORY_SEPARATOR.$to];
        return $this->fileDisk->move($deletedFilePath, DIRECTORY_SEPARATOR.$to);
    }

    function downloadFile(string $filePath)
    {
        return $this->fileDisk->url($filePath);
    }

}