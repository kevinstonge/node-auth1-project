const express = require('express');
const router = express.Router();
const db = require('./usersModel');
const bcrypt = require('bcrypt');

const generateHash = async (password) => {
    try {
        const saltRounds = Math.ceil(Math.random * 20);
        return bcrypt.hash(password, saltRounds)
    }
    catch (error) {
        res.status(500).json({message: "error generating salted hash of password"})
    }
}

const checkIfUsernameExists = async (req, res, next) => {
    try {
        const [user] = await db.getUser(req.body.username);
        if (user) {
            res.status(401).json({message: "that username already exists"})
        }
        else {
            next();
        }
    }
    catch (error) {
        throw error
    }
}

router.get('/', async (req, res) => {
    try {
        const users = await db.getUsers();
        res.status(200).json({users})
    }
    catch (error) {
        res.status(500).json({error})
    }
});

router.post('/', checkIfUsernameExists, async (req, res) => {
    try {
        if (req.body) {
            const { username, email, password } = req.body;
            if (!username || !email || !password) { res.status(401).json({ message: "error: username, email, and password are required. New user registration failed!" }) }
            else {
                const hash = await generateHash(password);
                const userObject = { username, email, hash }
                console.log(hash);
                const newUserId = await db.register(userObject);
                res.status(201).json({message: `user created with user id: ${newUserId}`})
            }
        }
    }
    catch (error) {
        res.status(500).json({message: "error creating user", error})
    }
})

module.exports = router;