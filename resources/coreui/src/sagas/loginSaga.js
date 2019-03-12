import { put, call } from 'redux-saga/effects'
import loginActions from '../redux/loginRedux'
import { loginApiRequest} from '../services/authService'
import {reactLocalStorage} from 'reactjs-localstorage';

// attempts to login
export function * login (action) {

    const {email, password} = action.data;

    const response = yield call(loginApiRequest, email, password);

    if(response.data.status == 'success'){
        reactLocalStorage.setObject('user_token', response.data.data);
        yield put(loginActions.loginSuccess(response.data.data));
    }else{
        alert(response.data.data);
        yield put(loginActions.loginFailure(response.data.data));
    }
}
