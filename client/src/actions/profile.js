import axios from 'axios';
import {
  GET_USERS,
  ADD_USER,
  EDIT_USER,
  DELETE_USER,
  SEARCH_USER
} from "../constants/profile";

const ProfileService = 'http://localhost:3030';

/**
 * Get users
 * @param data
 * @returns {{type, payload: *}}
 */
function _getUsers(data) {
  return {
    type: GET_USERS,
    payload: data
  };
}

/**
 * Add user
 * @param data
 * @returns {{type, payload: *}}
 */
function _addUser(data) {
  return {
    type: ADD_USER,
    payload: data
  };
}

/**
 * Edit user
 * @param data
 * @returns {{type, payload: *}}
 */
function _editUser(data) {
  return {
    type: EDIT_USER,
    payload: data
  };
}

/**
 * Delete user
 * @param data
 * @returns {{type, payload: *}}
 */
function _deleteUser(data) {
  return {
    type: DELETE_USER,
    payload: data
  };
}

/**
 * Search user
 * @param data
 * @returns {{type, payload: *}}
 */
function _searchUser(data) {
  return {
    type: SEARCH_USER,
    payload: data
  };
}

/**
 * Request for get users
 * @param data
 * @returns {payload}
 */
export const getUsers = () => dispatch => {
  axios.get(`${ProfileService}/getUsers`)
  .then(function (json) {
    console.log('ssssssssssssssss', json);
      dispatch(_getUsers(json.data));
  })
  .catch(function (error) {
    console.log(error);
  });
};

/**
 * Request for add user
 * @param data
 * @returns {func}
 */
export const addUser = data => dispatch => {

  // console.log('stringify new user data: ', queryString.stringify(data));
  // console.log('Not stringify new user data: ', data);

  axios.post(`${ProfileService}/addUser`, data)
  .then(function (json) {
    console.log('Add new user: ', json);
    dispatch(_addUser(json));
  })
  .catch(function (error) {
    console.log('Add user error ', error);
  });
};

/**
 * Request for edit user
 * @param data
 * @returns {func}
 */
export const editUser = data => dispatch => {
  axios.put(`${ProfileService}/editUser`, data)
  .then(function (json) {
    console.log('Edit user: ', json);
    dispatch(_editUser(json));
  })
  .catch(function (error) {
    console.log('Edit user error ', error);
  });
};

/**
 * Request for delete user
 * @param data
 * @returns {func}
 */
export const deleteUser = data => dispatch => {
  axios.delete(`${ProfileService}/deleteUser`, data)
  .then(function (json) {
    console.log('Delete user: ', json);
    dispatch(_deleteUser(json));
  })
  .catch(function (error) {
    console.log('Delete user error ', error);
  });
};

/**
 * Request for search user
 * @param data
 * @returns {func}
 */
export const searchUser = data => dispatch => {
  axios.get(`${ProfileService}/searchUser`, { params : data })
  .then(function (json) {
    console.log('Search user: ', json);
    dispatch(_searchUser(json));
  })
  .catch(function (error) {
    console.log('Search user error ', error);
  });
};
