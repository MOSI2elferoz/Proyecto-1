const express = require('express');
const router = express.Router();
const { Project, Task } = require('../models');

// Create Project
router.post('/', async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all Projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.findAll({
      include: ['user'] // include owner info
    });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Project by ID
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id, {
      include: ['user', 'tasks']
    });
    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Project
router.put('/:id', async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (project) {
      await project.update(req.body);
      res.json(project);
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete Project
router.delete('/:id', async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (project) {
      await project.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
