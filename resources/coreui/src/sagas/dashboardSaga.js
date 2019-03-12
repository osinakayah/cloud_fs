import { put, call } from 'redux-saga/effects'
import dashboardActions from '../redux/dashboardRedux'
import {reactLocalStorage} from 'reactjs-localstorage'
import { getDocuments } from "../services/dashboardService";
import { deleteDocument, restoreFileFolder, downloandFile} from "../services/dashboardService";

export function * getFiles(action){

    const {directory} = action;

    let user = reactLocalStorage.getObject('user_token', {});
    if(user.token){
        let documentResponse = yield call(getDocuments, directory);
        if(documentResponse.ok){
            yield put(dashboardActions.dashboardDocumentsSuccess(documentResponse.data.data));
        }
        else{
            yield put(dashboardActions.dashboardDocumentsFailure());
        }

    }
}

export function * deleteDocumentSaga(action) {
    const {directory} = action;

    let user = reactLocalStorage.getObject('user_token', {});
    if(user.token){
        let documentDeleteDocumentResponse = yield call(deleteDocument , directory);
        if(documentDeleteDocumentResponse.ok){
            alert('Deleted Successfully')
            yield put(dashboardActions.dashboardDeleteDocumentsSuccess());
            yield put(dashboardActions.dashboardDocumentsRequest('/'));
        }
        else {
            alert('Ops, an error occured');
            yield put(dashboardActions.dashboardDeleteDocumentsFailure());
        }
    }
}

export function *restoreFileFolderSaga(action) {
    const {directory} = action;
    const TRASH_FOLDER = 'Trash';
    let user = reactLocalStorage.getObject('user_token', {});
    if(user.token){
        let documentRestoreDocumentResponse = yield call(restoreFileFolder , directory);
        if(documentRestoreDocumentResponse.ok){
            alert('File Restored Successfully');
            yield put(dashboardActions.dashboardDeleteDocumentsSuccess());
            let directory = user.user.email.replace(/\./g, '-')+'/'+TRASH_FOLDER;
            yield put(dashboardActions.dashboardDocumentsRequest(directory));
        }
        else {
            alert('Oops, an error occured');
            yield put(dashboardActions.dashboardDeleteDocumentsFailure());
        }
    }
}

export function * downloadDocumentSaga(action) {
    console.log(action);
    const {path} = action;
    let user = reactLocalStorage.getObject('user_token', {});
    if(user.token){
        let documentDownloadDocumentResponse = yield call(downloandFile , path);
        if(documentDownloadDocumentResponse.ok){

            window.location = documentDownloadDocumentResponse.data.data;
            alert('Download started');
            yield put(dashboardActions.dashboardDocumentsRequest('/'));
        }
        else {
            alert('Oops, an error occured');
            yield put(dashboardActions.dashboardDeleteDocumentsFailure());
        }
    }

}