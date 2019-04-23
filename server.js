const express = require('express');

const server = express();
//Import router
const blogRouter = require('./blog-router.js');


server.use(express.json());

server.get('/', (req, res) => {
  res.send(`
    <h2>Blog Post Schema</h2>
    <p>Welcome to the Blog Post Schema</p>
  `);
});

server.use('/api/posts', blogRouter);

// export default server
module.exports = server;