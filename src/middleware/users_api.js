import axios from 'axios';
import appConfig from 'appConfig';

axios.defaults.withCredentials = true;

const usersApi = {
    getUsers:() => axios.get(`${appConfig.api_end_point}/api/users`, {}),

    addUser: user => {
        return axios.post(`${appConfig.api_end_point}/api/user`, { user });
    },

    editUser: user => {
        return axios.put(`${appConfig.api_end_point}/api/user`, { id: user._id, user });
    },

    deleteUser: id => {
        return axios.delete(`${appConfig.api_end_point}/api/user/${id}`);
    },
}

export default usersApi;
