/**
 * Created by proteux on 5/19/18.
 */
import { put, call } from 'redux-saga/effects'
import registrationActions from '../redux/registrationRedux'
import { registrationRequest } from '../services/authService'
import {reactLocalStorage} from 'reactjs-localstorage';

// attempts to login
export function * registerSaga (action) {

    const {data} = action;

    let registerResponse = yield call(registrationRequest, data);

    if(registerResponse.ok && registerResponse.data.status == 'success'){
        alert('Registered Successfuly')
        yield put(registrationActions.registrationSuccess(registerResponse.data));
    }else{
        alert('Ops, an error occured');
        yield put(registrationActions.registrationFailure());
    }
}
