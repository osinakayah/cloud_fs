/**
 * Created by proteux on 5/19/18.
 */

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
    registrationRequest: ['data'],
    registrationSuccess: ['payload'],
    registrationFailure: null,
})

export const registrationTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
    success: false,
    fetching: false
})

export const registrationRequest = state => state.merge({success: false, fetching: true})
export const registrationSuccess = state => state.merge({success: true, fetching: false})
export const registrationFailure = state => state.merge({success: false, fetching: false})

export const reducer = createReducer(INITIAL_STATE, {
    [Types.REGISTRATION_REQUEST]: registrationRequest,
    [Types.REGISTRATION_SUCCESS]: registrationSuccess,
    [Types.REGISTRATION_FAILURE]: registrationFailure
})