// all routes define here
import {
    UserController
} from './controllers';

const express = require('express');
const routes = express.Router();

export default (app) => {

    // User routes
    if (UserController) {
        routes.post('/user', UserController.createUser);
        routes.put('/user', UserController.updateUser);
        routes.get('/users', UserController.getAllUsers);
        routes.delete('/user/:id', UserController.deleteUser);
    }

    app.use('/api', routes);
};
