<?php
/**
 * Created by PhpStorm.
 * User: proteux
 * Date: 5/19/18
 * Time: 6:07 AM
 */

namespace CloudFs\Modules\FileSystem\Contracts;


use Illuminate\Http\UploadedFile;

interface FileSystemInterface
{
    function getFiles(string $path);
    function getFile(string $filePath);
    function deleteFile(string $filePath);
    function createUserHomeDirectory(string $directoryName);
    function createDirectory(string $directory);
    function getTrashDirectory();
    function uploadFile(UploadedFile $uploadedFile);
    function restoreFile(string $trashPath);
    function downloadFile(string $filePath);
}