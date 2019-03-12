/**
 * Created by proteux on 5/16/18.
 */
import { takeLatest, all } from 'redux-saga/effects'

/* ------------- Types ------------- */
import { loginTypes } from "../redux/loginRedux";
import { dashboardTypes } from "../redux/dashboardRedux";
import { registrationTypes } from '../redux/registrationRedux'

/* ------------- Sagas ------------- */
import {login} from "./loginSaga";
import { getFiles, deleteDocumentSaga, restoreFileFolderSaga, downloadDocumentSaga, renameDocumentSaga } from "./dashboardSaga";
import { registerSaga } from './registerSaga'

export default function *root() {
    yield all([
        takeLatest(loginTypes.LOGIN_REQUEST, login),
        takeLatest(dashboardTypes.DASHBOARD_DOCUMENTS_REQUEST, getFiles),
        takeLatest(dashboardTypes.DASHBOARD_DELETE_DOCUMENTS_REQUEST, deleteDocumentSaga),
        takeLatest(registrationTypes.REGISTRATION_REQUEST, registerSaga),
        takeLatest(dashboardTypes.DASHBOARD_RESTORE_DOCUMENTS_REQUEST, restoreFileFolderSaga),
        takeLatest(dashboardTypes.DASHBOARD_DOWNLOAD_DOCUMENTS_REQUEST, downloadDocumentSaga),
        takeLatest(dashboardTypes.DASHBOARD_RENAME_DOCUMENTS_REQUEST, renameDocumentSaga)
    ]);
}
