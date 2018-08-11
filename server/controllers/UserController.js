import { UserModel } from './../models';

class UserController {

    /**
     * Create a new user
     * Email address will be unique for the users
     * 
     * @param {request} req 
     * @param {response} res 
     */
    async createUser(req, res) {
        const { user } = req.body;
       
        try {
            const { email } = user;
            const filter = { email };

            // check user already exists
            const userExists = await UserModel.getUser(filter);

            if (userExists.result.length > 0) {
                throw new Error('User already exists!');
            }

            // else continue creating a new one
            const userCreated = await UserModel.saveUser(user);

            res.status(200).json(userCreated);
        } catch(error) {console.log('error on createUser >> ', error.message);
            res.status(400).json({ error: error.message });
        }
    };

    /**
     * Update user
     * 
     * @param {request} req 
     * @param {response} res 
     */
    async updateUser(req, res) {
        const { user, id } = req.body;

        try {
            // check going to update to existing email
            const filter = { _id: { $ne: id }, email: user.email };
            const userExists = await UserModel.getUser(filter);

            if (userExists.result.length > 0) {
                throw new Error('Email already exists!');
            }

            // else continue on updating user
            const userUpdated = await UserModel.updateUser(id, user);

            res.status(200).json(userUpdated);
        } catch(error) {
            res.status(400).json({ error: error.message });
        }
    };

    /**
     * Get all users
     * 
     * @param {request} req 
     * @param {response} res 
     */
    async getAllUsers(req, res) {
        try {
            const users = await UserModel.getAllUsers();

            res.status(200).json(users);
        } catch(error) {
            res.status(400).json({ error: error.message });
        }
    };

    

    /**
     * Delete user for a given ID
     * 
     * @param {request} req 
     * @param {response} res 
     */
    async deleteUser(req, res) {
        const { id } = req.params;
        try {
            const filter = { _id: id };
            await UserModel.removeUser(filter);

            res.status(200).json({ message: 'User deleted successfully' });
        } catch(error) {
            res.status(400).json({ error: error.message });
        }
    };
}

export default new UserController;
