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
} from './../constants/users_types';

const initialState = {
    users: [],
    getUsersError: null,
    userAdded: false,
    addUserError: null,
    userEdited: false,
    editUserError: null,
    userDeleted: false,
    deleteUserError: null,
};

export default function users(state = initialState, action) {console.log('action', action)
    switch (action.type) {
        case LIST_USERS:
            return { ...state, users: [], userAdded: false, userEdited: false, userDeleted: false };
        case LIST_USERS_SUCCESS:
            return { ...state, users: action.users.result };
        case LIST_USERS_FAILED:
            return { ...state, users: [], getUsersError: action.error };  
        case ADD_USER:
            return { ...state, userAdded: false, addUserError: null };  
        case ADD_USER_SUCCESS:
            return { ...state, userAdded: action.userAdded, addUserError: null };  
        case ADD_USER_FAILED:
            return { ...state, userAdded: false, addUserError: action.error };
        case EDIT_USER:
            return { ...state, userEdited: false, editUserError: null };
        case EDIT_USER_SUCCESS:
            return { ...state, userEdited: true, editUserError: null };
        case EDIT_USER_FAILED:
            return { ...state, userEdited: false, editUserError: action.error };
        case DELETE_USER:
            return { ...state, userDeleted: false, deleteUserError: null };
        case DELETE_USER_SUCCESS:
            return { ...state, userDeleted: action.userDeleted };
        case DELETE_USER_FAILED:
            return { ...state, userDeleted: false, deleteUserError: action.error };
        default:
            return state;
    }
}
