const express = require('express');
const pModel = require('../data/helpers/projectModel.js');

const router = express.Router();

//get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await pModel.get();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500)
      .json({ error: `Error occurred while retrieving projects: ${error}` })
  }
});

//get project by id
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const project = await pModel.get(id);
    res.status(200).json(project);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error occurred while retrieving project: ${error}` });
  }
});

//post new project
router.post('/', async (req, res) => {
  const { name, description } = req.body;
  console.log(req.body);
  if (!name || !description) {
    req
      .status(400)
      .json({ message: `Bad request. Both a name and description are required.` });
  }
  try {
    newProject = await pModel.insert(req.body);
    res.status(201).json({ message: `New project added: `, newProject });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error occurred while adding project`, error });
  }
});

//update project
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  const { name, description } = changes;

  if (!name || !description) {
    req.status(400).json({ message: `Bad request. Both a name and description are required.` });
  }
  try {
    const updatedProj = await pModel.update(id, changes);
    res
      .status(200)
      .json({ message: `Project was successfully updated`, updatedProj });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error occurred while updating project: ${error}` });
  }
});

//delete project
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const postToDelete = await pModel.get(id);
    if (!postToDelete) {
      res
        .status(404)
        .json({ message: `Project doesn't exist` });
    } else {
      const deletedPost = await pModel.remove(id);
      res
        .status(200)
        .json(deletedPost);
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error occurred while deleting post: ${error}` });
  }
});

//get project actions
router.get('/:id/actions', async (req, res) => {
  const id = req.params.id;
  try {
    const actions = await pModel.getProjectActions(id);
    res
      .status(200)
      .json(actions);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error occurred while retrieving actions: ${error}` })
  }
})

module.exports = router;