import {
  GET_USERS,
  ADD_USER,
  EDIT_USER,
  DELETE_USER,
  SEARCH_USER
} from "../constants/profile";

const initialState = {
  users: []
};

export default function Profile(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return Object.assign({}, state, {
        users: action.payload
      });
    case ADD_USER:
      return Object.assign({}, state, {
        users: state.users.concat(action.payload.data)
      });
    case EDIT_USER:
      return Object.assign({}, state, {
        users: action.payload
      });
    case DELETE_USER:
      return Object.assign({}, state, {
        users: action.payload
      });
    case SEARCH_USER:
      return Object.assign({}, state, {
        users: action.payload
      });
    default:
      return state;
  }
}
