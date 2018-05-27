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
      let userid=JSON.parse(action.payload.config.data).id;
      return Object.assign({}, state, {
        users: state.users.filter((obj)=>obj._id!==userid).concat(action.payload.data)
      });
    case DELETE_USER:
      let deluserid=JSON.parse(action.payload.config.data).id;
      return Object.assign({}, state, {
        users: state.users.filter((obj)=>obj._id!==deluserid)
      });
    case SEARCH_USER:
      return Object.assign({}, state, {
        users: action.payload
      });
    default:
      return state;
  }
}
