const express = require('express')
const memorieRouter = express.Router()
const multer = require('multer');
const {postMemorie, getMemories, deleteMemorie, updateMemorie, getMemorieById} = require('../controllers/memories.controllers')


// Set up multer storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'images');
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + file.originalname;
      cb(null, uniqueSuffix);
    },
  });
  
const upload = multer({ storage: storage });

// POST Memorie
memorieRouter.post('/upload', upload.single('file'), postMemorie)
// GET Memories
memorieRouter.get('/memories', getMemories)
// GET Memorie by id
memorieRouter.get('/memorie/:memorieId', getMemorieById)
// DELETE Memorie
memorieRouter.delete('/memorie/:id', deleteMemorie)
// Update Memorie by id
memorieRouter.put('/memorie/:id', upload.single('file'), updateMemorie)

module.exports = memorieRouter