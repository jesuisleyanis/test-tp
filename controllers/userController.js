const UserService = require('../services/userService');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await UserService.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await UserService.getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        const newUser = await UserService.createUser({ name, email });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        const updatedUser = await UserService.updateUser(req.params.id, { name, email });
        res.json(updatedUser);
    } catch (error) {
        res.status(error.message === 'User not found' ? 404 : 500).json({ error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const deleted = await UserService.deleteUser(req.params.id);
        if (!deleted) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
