const User = require('../models/userModel');

class UserService {
    static async getAllUsers() {
        return await User.findAll();
    }

    static async getUserById(id) {
        const user = await User.findByPk(id);
        return user || null; // Retourne `null` si l'utilisateur n'est pas trouvé
    }

    static async createUser({ name, email }) {
        if (!name || !email) {
            throw new Error('Name and email are required');
        }
        return await User.create({ name, email });
    }

    static async updateUser(id, { name, email }) {
        const user = await User.findByPk(id);
        if (!user) {
            throw new Error('User not found');
        }
        await user.update({ name, email });
        return user;
    }

    static async deleteUser(id) {
        const user = await User.findByPk(id);
        if (!user) {
            return false; // Retourne `false` si l'utilisateur n'existe pas
        }
        await user.destroy();
        return true;
    }
}

module.exports = UserService;
