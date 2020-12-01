const db = require('../../data/dbConfig.js');

const getUsers = async () => {
    try {
        return await db('users')
    }
    catch (error) {
        throw error;
    }
}

const getUser = async (username) => {
    try {
        return await db('users').where({ username });
    }
    catch (error) {
        throw error;
    }
}

const register = async (userObject) => {
    try {
        return await db('users').insert(userObject);
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = { getUsers, register, getUser }