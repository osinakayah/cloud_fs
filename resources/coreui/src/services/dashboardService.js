import apisauce from 'apisauce'
import { BASE_URL } from '../config'
import {reactLocalStorage} from 'reactjs-localstorage';
let userToken = reactLocalStorage.getObject('user_token', {}).token;

const api = apisauce.create({
        baseURL: BASE_URL + '/api/file',
        headers: {'Authorization': 'Bearer '+userToken}
});

export function getDocuments(directory) {


    return api.post('/documents', {directory});
}

export function deleteDocument(directory) {
    if(directory){
        return api.post('/delete', {directory})
    }
}

export function restoreFileFolder(directory) {
    if(directory){
        return api.post('/restore', {directory})
    }
}


export function downloandFile(directory) {
    if(directory){
        return api.post('/download', {directory});
    }
}

export function renameDocument(oldPath, newName) {
    if (oldPath, newName) {
        return api.patch('/document', {oldPath, newName});
    }
}
