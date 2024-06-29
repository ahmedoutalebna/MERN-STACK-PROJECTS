const Memories = require('../models/memories.model')
const path = require('path')
// Post memories
const postMemorie = async(req, res) => {
    console.log(req.file)
    console.log(req.body)
    const newMemorie = new Memories({
      creator: req.body.creator,
      title: req.body.title,
      message: req.body.message,
      tags: req.body.tags,
      image: req.file.filename
    })
    if(newMemorie)
    {
      try
      {
        const savedMemorie = await newMemorie.save()
        if(!savedMemorie) return res.status(404).json({message: 'Memorie not saved'})
        res.status(200).json({message: savedMemorie})
      }
      catch(err)
      {
        console.error(err)
        res.status(500).json({message: 'Internal server error '})
      }
    }
  
  };

// get All memories
const getMemories = async(req, res)=>{
    try
    {
        const memories = await Memories.find()
        if(!memories) return res.status(404).json({message: 'Memories are not found'})
        res.status(200).json(memories)
    }
    catch(err)
    {
        res.status(500).json({message: 'Internal Server error'})
        console.error(err)
    }
}
// Delete memorie controller
const deleteMemorie = async(req, res)=>{
    const memorieId = req.params.id  
    try
    {
        const deletedMemorie = await Memories.findByIdAndDelete(memorieId)
        if(!deletedMemorie) return res.status(404).json({message: 'Cannot be deleted'})
        res.status(200).json(deletedMemorie)
    }
    catch(err)
    {
        console.error(err)
        res.status(500).json({message: 'Internal server error'})
    }
}
const getMemorieById = async(req, res)=>{
    const memorieId = req.params.memorieId
    try
    {
        const memorie = await Memories.findById(memorieId)
        if(!memorie) return res.status(404).json({message: 'Error not found'})
        res.status(200).json(memorie)
    }
    catch(err)
    {
        res.status(500).json({message: 'Internal server error'})
    }
}
// Update Memorie
const updateMemorie = async (req, res) => {
    const memorieId = req.params.id;
    console.log(memorieId);
    console.log('.......');
    console.log(req.body);

    try {
        const updateData = {
            creator: req.body.creator,
            title: req.body.title,
            message: req.body.message,
            tags: req.body.tags,
        };

        if (req.file) {
            updateData.image = req.file.filename;
        }

        const updatedMemorie = await Memories.findByIdAndUpdate(memorieId, updateData, { new: true });

        if (!updatedMemorie) return res.status(404).json({ message: 'Memories not found' });

        res.status(200).json(updatedMemorie);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {postMemorie, getMemories, updateMemorie, deleteMemorie, getMemorieById}