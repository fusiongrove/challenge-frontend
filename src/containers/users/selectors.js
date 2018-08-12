import { createSelector } from 'reselect';

// user profile
const selectUsersState = state => state.users;

const makeSelectGetAllUsers = () => createSelector(
    selectUsersState,
    (currentState) => currentState.users
);

const makeSelectGetAllUsersFailed = () => createSelector(
    selectUsersState,
    (currentState) => currentState.getUsersError
);

const makeSelectAddUserSuccess = () => createSelector(
    selectUsersState,
    (currentState) => currentState.userAdded
);

const makeSelectAddUserFailed = () => createSelector(
    selectUsersState,
    (currentState) => currentState.addUserError
);

const makeSelectEditUserSuccess = () => createSelector(
    selectUsersState,
    (currentState) => currentState.userEdited
);

const makeSelectEditUserFailed = () => createSelector(
    selectUsersState,
    (currentState) => currentState.editUserError
);

const makeSelectDeleteUserSuccess = () => createSelector(
    selectUsersState,
    (currentState) => currentState.userDeleted
);

const makeSelectDeleteUserFailed = () => createSelector(
    selectUsersState,
    (currentState) => currentState.deleteUserError
);

export {
    makeSelectGetAllUsers,
    makeSelectGetAllUsersFailed,
    makeSelectAddUserSuccess,
    makeSelectAddUserFailed,
    makeSelectDeleteUserSuccess,
    makeSelectDeleteUserFailed,
    makeSelectEditUserSuccess,
    makeSelectEditUserFailed,
};
