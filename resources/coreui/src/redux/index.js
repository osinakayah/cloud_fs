/**
 * Created by proteux on 5/16/18.
 */
import { combineReducers } from 'redux'
import configureStore from './createStore'
import rootSaga from '../sagas/'

export default () => {
    /* ------------- Assemble The Reducers ------------- */
    const rootReducer = combineReducers({
        login: require('./loginRedux').reducer,
        dashboard: require('./dashboardRedux').reducer,
        registration: require('./registrationRedux').reducer
    })

    return configureStore(rootReducer, rootSaga)
}

