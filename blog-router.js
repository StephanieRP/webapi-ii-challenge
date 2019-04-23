const express = require('express');

const db = require("./data/db.js");

const router = express.Router();

// Main Get request to get current data --> /
router.get('/', async (req, res) => {
    try {
      const posts = await db.find(req.query);
      res.status(200).json(posts);
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'THe posts information could not be received',
      });
    }
  });

  // Get request for posts by id --> /:id
  router.get('/:id', async (req, res) => {
    try {
      const postID = await db.findById(req.params.id);

      postID.length !== 0 ? res.status(200).json(postID) : res.status(404).json({ message: "The post with the specified ID does not exist." })

    } catch (error) {
      // log error to database
      res.status(500).json({
        message: "The post information could not be retrieved."
      });
    }
  });

  // Post request to add new posts --> /
  router.post('/', async (req, res) => {
    try {
      const posts = await db.insert(req.body);
      const { title, contents } = req.body;

      title && contents ?  res.status(201).json(posts) : res.status(400).json({
        message: "Please provide title and content for the post."
      })
      console.log(req.body)
    } catch (error) {
      // log error to database
      res.status(500).json({
        message: "There was an error while saving the post to the database" 
      });
    }
  });


  // Delete request to delete posts --> /:id
  router.delete('/:id', async (req, res) => {
    try {
      const posts = await db.remove(req.params.id);
    posts > 0 ? res.status(204).end() : res.status(404).json({ message: "The post with the specified ID does not exist."  });
      
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        error: "The post could not be removed"
      });
    }
  })

  // Put request to edit posts --> /:id
  router.put('/:id', async (req, res) => {
    try {
      const { id } = req.params
      const posts = await db.update(id, req.body);
      const { title, contents } = req.body

      if(!title && !contents) {
        res.status(400).json({ message: "Please provide title and contents for the post."  });
      }
      posts ? res.status(200).json(req.body) : res.status(404).json({ message: "The post with the specified ID does not exist." });
      }
    catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "The post information could not be modified."
      });
    }
  });


module.exports = router;
