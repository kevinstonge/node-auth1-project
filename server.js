const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const server = express();
server.use(helmet());
server.use(cors({credentials: true, origin: 'http://localhost:3000'}));
server.use(express.json());
const session = require('express-session');
server.use(
  session({
    name: 'authentication-project',
    secret: 'forty-two',
    cookie: {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        secure: false, // only set cookies over https. Server will not send back a cookie over http.
        httpOnly: true,
    }, // 1 day in milliseconds
    resave: true,
    saveUninitialized: true,
  })
);

const usersRouter = require('./api/users/usersRouter.js');

server.use('/api/users', usersRouter);
server.get('/', (req, res) => { res.status(200).json({ message: "server online" }); });


module.exports = server;