<?php
/**
 * Created by PhpStorm.
 * User: proteux
 * Date: 5/19/18
 * Time: 5:41 AM
 */

namespace CloudFs\Modules\FileSystem\Controllers;


use App\Http\Controllers\Controller;
use CloudFs\Modules\FileSystem\Contracts\FileSystemInterface;
use Illuminate\Http\Request;

class FileSystemController extends Controller
{
    private $fileSystemRepo;
    function __construct(FileSystemInterface $fileSystem)
    {
        $this->fileSystemRepo = $fileSystem;
    }

    public function index(Request $request){
        try{
            $folder = $request->get('directory', '/');

            $folder = $folder ? $folder : '/';

            return jsend_success($this->fileSystemRepo->getFiles($folder));
        }catch (\Exception $exception) {
            return jsend_error('Unable to get files '.$exception->getMessage());
        }
    }

    public function createFolder(Request $request){
        try{
            return jsend_success($this->fileSystemRepo->createDirectory($request->get('directory', auth()->user()->email)));
        }catch (\Exception $exception) {
            return jsend_error('Error '.$exception->getMessage());
        }
    }

    public function delete(Request $request){
        try{
            return jsend_success($this->fileSystemRepo->deleteFile($request->get('directory', '')));
        }catch (\Exception $exception) {
            return jsend_error('Error '.$exception->getMessage());
        }
    }

    public function uploadFile(Request $request){
        $response = $this->fileSystemRepo->uploadFile($request->file('qqfile'));
        return response()->json(['success' => $response,]);
    }

    public function downloadFile($file){
        return $this->fileSystemRepo->getFile($file);
    }

    public function restore(Request $request){
        try{
            return jsend_success($this->fileSystemRepo->restoreFile($request->get('directory', '')));
        }catch (\Exception $exception) {
            return jsend_error('Error '.$exception->getMessage());
        }
    }

    public function download(Request $request){
        try{
            return jsend_success($this->fileSystemRepo->downloadFile($request->get('directory', '')));
        }catch (\Exception $exception) {
            return jsend_error('Error '.$exception->getMessage());
        }
    }

    public function rename(Request $request) {
        try {
            return jsend_success($this->fileSystemRepo->renameFile($request->get('oldPath'), $request->get('newName')));
        }
        catch (\Exception $exception) {
            return jsend_error('Error '.$exception->getMessage());
        }
    }
}