const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const server = express();
server.use(helmet());
server.use(cors());
server.use(express.json());
const usersRouter = require('./api/users/usersRouter.js');
server.use('/api/users', usersRouter);
server.get('/', (req, res) => { res.status(200).json({ message: "server online" }) });


module.exports = server;