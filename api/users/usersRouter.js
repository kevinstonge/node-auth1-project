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
        if (req.body && req.body.username) {
            const [user] = await db.getUser(req.body.username);
            if (user) {
                req.userExists = true;
            }
            else {
                req.userExists = false;
            }
            next();
        }
        else { res.status(401).json({message: "error: please provide a username"})}
    }
    catch (error) {
        throw error
    }
}

router.get('/', async (req, res) => {
    console.log(req.session);
    if (req.session.loggedIn === true) {
        try {
            const users = await db.getUsers();
            res.status(200).json({ users })
        }
        catch (error) {
            res.status(500).json({ error })
        }
    }
    else {
        res.status(401).json({message: "error: you are not logged in!"})
    }
});

router.post('/register', checkIfUsernameExists, async (req, res) => {
    try {
        if (req.userExists === true) { res.status(401).json({message: "error: username already exists"})}
        if (req.body) {
            const { username, email, password } = req.body;
            if (!username || !email || !password) { res.status(401).json({ message: "error: username, email, and password are required. New user registration failed!" }) }
            else {
                const hash = await generateHash(password);
                const userObject = { username, email, hash }
                const newUserId = await db.register(userObject);
                res.status(201).json({message: `user created with user id: ${newUserId}`})
            }
        }
    }
    catch (error) {
        res.status(500).json({message: "error creating user", error})
    }
})

router.post('/login', checkIfUsernameExists, async (req, res) => {
    try {
        if (req.userExists) {
            const [user] = await db.getUsers(req.body.username);
            const loggedIn = await bcrypt.compare(req.body.password, user.hash);
            if (loggedIn) {
                req.session.loggedIn = true;
                res.status(200).json({ message: "logged in!" });
            }
            else {
                res.status(401).json({message: "incorrect password"})
            }
        }
        else {
            res.status(401).json({message: "error: that username does not exist"})
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({message: "server error ocurred while attempting to log in", error})
    }
})

module.exports = router;