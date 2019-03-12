import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
    dashboardDocumentsRequest: ['directory'],
    dashboardDocumentsSuccess: ['documents'],
    dashboardDocumentsFailure: null,

    dashboardDeleteDocumentsRequest: ['directory'],
    dashboardDeleteDocumentsSuccess: null,
    dashboardDeleteDocumentsFailure: null,

    dashboardRenameDocumentsRequest: ['directory', 'newDirectory'],
    dashboardRenameDocumentsSuccess: null,
    dashboardRenameDocumentsFailure: null,

    dashboardRestoreDocumentsRequest: ['directory'],
    dashboardRestoreDocumentsSuccess: null,
    dashboardRestoreDocumentsFailure: null,

    dashboardDownloadDocumentsRequest: ['path'],


})

export const dashboardTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
    documents: [],
    fetching: false
})

export const dashboardDocumentsSuccess = (state, {documents}) => state.merge({documents, fetching: false})
export const dashboardDocumentsRequest = state => state.merge({fetching: true});
export const dashboardDocumentsFailure = state => state.merge({fetching: false});

export const dashboardDeleteDocumentsRequest = (state) => state.merge({fetching: true})
export const dashboardDeleteDocumentsSuccess = state => state.merge({fetching: false});
export const dashboardDeleteDocumentsFailure = state => state.merge({fetching: false});


export const dashboardRenameDocumentsRequest = (state) => state.merge({fetching: true})
export const dashboardRenameDocumentsSuccess = state => state.merge({fetching: false});
export const dashboardRenameDocumentsFailure = state => state.merge({fetching: false});

export const dashboardRestoreDocumentsRequest = (state) => state.merge({fetching: true})
export const dashboardRestoreDocumentsSuccess = state => state.merge({fetching: false});
export const dashboardRestoreDocumentsFailure = state => state.merge({fetching: false});

export const dashboardDownloadDocumentsRequest = state => state.merge({fetching: true});

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.DASHBOARD_DOCUMENTS_REQUEST]: dashboardDocumentsRequest,
    [Types.DASHBOARD_DOCUMENTS_SUCCESS]: dashboardDocumentsSuccess,
    [Types.DASHBOARD_DOCUMENTS_FAILURE]: dashboardDocumentsFailure,

    [Types.DASHBOARD_DELETE_DOCUMENTS_FAILURE]: dashboardDeleteDocumentsFailure,
    [Types.DASHBOARD_DELETE_DOCUMENTS_SUCCESS]: dashboardDeleteDocumentsSuccess,
    [Types.DASHBOARD_DELETE_DOCUMENTS_REQUEST]: dashboardDeleteDocumentsRequest,

    [Types.DASHBOARD_RENAME_DOCUMENTS_FAILURE]: dashboardRenameDocumentsFailure,
    [Types.DASHBOARD_RENAME_DOCUMENTS_SUCCESS]: dashboardRenameDocumentsSuccess,
    [Types.DASHBOARD_RENAME_DOCUMENTS_REQUEST]: dashboardRenameDocumentsRequest,

    [Types.DASHBOARD_RESTORE_DOCUMENTS_FAILURE]: dashboardRestoreDocumentsFailure,
    [Types.DASHBOARD_RESTORE_DOCUMENTS_SUCCESS]: dashboardRestoreDocumentsSuccess,
    [Types.DASHBOARD_RESTORE_DOCUMENTS_REQUEST]: dashboardRestoreDocumentsRequest,

    [Types.DASHBOARD_DOWNLOAD_DOCUMENTS_REQUEST]: dashboardDownloadDocumentsRequest
})