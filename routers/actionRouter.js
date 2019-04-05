const express = require('express');
const aModel = require('../data/helpers/actionModel.js');

const router = express.Router();

//get action by id
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const action = await aModel.get(id);
    res.status(200).json(action);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error occurred while retrieving action: ${error}` });
  }
});

//post new action
router.post('/', async (req, res) => {
  const newAction = req.body;
  const { project_id, description, notes } = req.body;
  if (!project_id || !description || !notes) {
    req
      .status(400)
      .json({ message: `Bad request. Project ID, description, and notes are required.` });
  }
  try {
    newaction = await aModel.insert(req.body);
    res.status(201).json({ message: `New action added: `, newaction });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error occurred while adding action`, error });
  }
});

//update action
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  const { project_id, description, notes } = changes;

  if (!project_id || !description || !notes) {
    req.status(400).json({ message: `Bad request. Both a name and description are required.` });
  }
  try {
    const updatedProj = await aModel.update(id, changes);
    res
      .status(200)
      .json({ message: `action was successfully updated`, updatedProj });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error occurred while updating action: ${error}` });
  }
});

//delete action
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const actionToDelete = await aModel.get(id);
    if (!actionToDelete) {
      res
        .status(404)
        .json({ message: `action doesn't exist` });
    } else {
      const deletedaction = await aModel.remove(id);
      res
        .status(200)
        .json(deletedaction);
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error occurred while deleting post: ${error}` });
  }
});

module.exports = router;