/**
 * Created by proteux on 5/16/18.
 */
import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
    loginRequest: ['data'],
    loginSuccess: ['payload'],
    loginFailure: ['error'],
    loginSetEmail: ['email'],
    loginSetPassword: ['password']
})

export const loginTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
    data: null,
    payload: null,
    error: null,
    email: '',
    password: '',
    fetching: false
})


/* ------------- Reducers ------------- */
export const loginRequest = state => state.merge({fetching: true})
export const setEmail = (state, {email}) => state.merge({email});
export const setPassword = (state, {password}) => state.merge({password});
export const loginSuccess = (state, { payload }) => state.merge({payload, fetching: false});
export const loginFailure = (state, {error}) => state.merge({error, fetching: false});

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.LOGIN_REQUEST]: loginRequest,
    [Types.LOGIN_SET_EMAIL]: setEmail,
    [Types.LOGIN_SET_PASSWORD]: setPassword,
    [Types.LOGIN_SUCCESS]: loginSuccess,
    [Types.LOGIN_FAILURE]: loginFailure
})