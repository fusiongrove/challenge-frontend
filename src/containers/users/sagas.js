import { takeEvery, put, call } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import {
    getUsersSuccess,
    getUsersFailed,
    addUserSuccess,
    addUserFailed,
    deleteUserSuccess,
    deleteUserFailed,
    editUserSuccess,
    editUserFailed
} from './actions';
import apiCall from './../../middleware/users_api';
import {
    LIST_USERS,
    ADD_USER,
    DELETE_USER,
    EDIT_USER,
} from './../../constants/users_types';

export function* getUsers() {
    try {
        const result = yield call(apiCall.getUsers);
        yield put(getUsersSuccess(result.data));
    } catch (error) {
        yield put(getUsersFailed(error.message));
    }
}

export function* addUsers(data) {
    try {
        const result = yield call(apiCall.addUser, data.user);
        yield put(addUserSuccess(true));
    } catch (error) {
        yield put(addUserFailed(error.message));
    }
}

export function* editUser(data) {
    try {
        const result = yield call(apiCall.editUser, data.user);
        yield put(editUserSuccess(true));
    } catch (error) {
        yield put(editUserFailed(error.message));
    }
}

export function* deleteUser(data) {
    try {
        const result = yield call(apiCall.deleteUser, data.userId);
        yield put(deleteUserSuccess(true));
    } catch (error) {
        yield put(deleteUserFailed(error.message));
    }
}

export default function* usersSagas() {
    yield* [
        takeEvery(LIST_USERS, getUsers),
        takeEvery(ADD_USER, addUsers),
        takeEvery(EDIT_USER, editUser),
        takeEvery(DELETE_USER, deleteUser),
    ];
}
