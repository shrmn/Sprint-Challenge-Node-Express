const express = require('express');
const helmet = require('helmet');

const projectRouter = require('./routers/projectRouter.js');
const actionRouter = require('./routers/actionRouter.js');

const server = express();

server.use(express.json());
server.use(helmet());

server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);

server.get('/', (req, res) => {
  res.send(`
    <h2>Node/Express Sprint Challenge</h2>
    <p>Server is running!</p>
    `)
});

module.exports = server;