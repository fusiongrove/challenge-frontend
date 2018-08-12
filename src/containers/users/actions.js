import {
    LIST_USERS,
    LIST_USERS_IN_PROGRESS,
    LIST_USERS_SUCCESS,
    LIST_USERS_FAILED,
    ADD_USER,
    ADD_USER_IN_PROGRESS,
    ADD_USER_SUCCESS,
    ADD_USER_FAILED,
    EDIT_USER,
    EDIT_USER_IN_PROGRESS,
    EDIT_USER_SUCCESS,
    EDIT_USER_FAILED,
    DELETE_USER,
    DELETE_USER_IN_PROGRESS,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAILED
} from './../../constants/users_types';

// list users
const getUsers = () => ({
    type: LIST_USERS
});

const getUsersInProgress = () => ({
    type: LIST_USERS_IN_PROGRESS
});

const getUsersSuccess = users => ({
    type: LIST_USERS_SUCCESS,
    users
});

const getUsersFailed = error => ({
    type: LIST_USERS_SUCCESS,
    error
});

// add new user
const addUser = user => ({
    type: ADD_USER,
    user
});

const addUserInProgress = () => ({
    type: ADD_USER_IN_PROGRESS
});

const addUserSuccess = userAdded => ({
    type: ADD_USER_SUCCESS,
    userAdded
});

const addUserFailed = error => ({
    type: ADD_USER_FAILED,
    error
});

// edit user
const editUser = user => ({
    type: EDIT_USER,
    user
});

const editUserSuccess = userEdited => ({
    type: EDIT_USER_SUCCESS,
    userEdited
});

const editUserFailed = error => ({
    type: EDIT_USER_FAILED,
    error
});

// delete user
const deleteUser = userId => ({
    type: DELETE_USER,
    userId
});

const deleteUserSuccess = userDeleted => ({
    type: DELETE_USER_SUCCESS,
    userDeleted
});

const deleteUserFailed = error => ({
    type: DELETE_USER_FAILED,
    error
});

export {
    getUsers,
    getUsersInProgress,
    getUsersSuccess,
    getUsersFailed,
    addUser,
    addUserInProgress,
    addUserSuccess,
    addUserFailed,
    deleteUser,
    deleteUserSuccess,
    deleteUserFailed,
    editUser,
    editUserSuccess,
    editUserFailed
};
