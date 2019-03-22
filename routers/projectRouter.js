const express = require('express');
const pModel = require('../data/helpers/projectModel.js');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const projects = await pModel.get();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500)
      .json({ error: `Error occurred while retrieving projects: ${error}` })
  }
});

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

router.post('/', async (req, res) => {
  const { name, description } = req.body;
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



module.exports = router;