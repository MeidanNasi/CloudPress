const express = new require('express')
const router = new express.Router()
const Project = require('../models/project')
const auth = require('../middleware/auth')

// Create a new project
router.post('/api/projects', auth, async (req, res) => {
  const project = new Project({
    ...req.body,
    owner: req.user._id
  })

  try {
    await project.save()
    res.status(201).send(project)
  } catch (e) {
    res.status(400).send(e)
  }

})

// Get project by id
router.get('/api/projects/:id', auth, async (req, res) => {
  const _id = req.params.id

  try {
    const project = await Project.findOne({ _id, owner: req.user._id })

    if (!project) {
      return res.status(404).send()
    }
    res.send(project)
  } catch (e) {
    res.status(500).send(e)
  }
})

// Get all projects
router.get('/api/projects', auth, async (req, res) => {
  try {
    const projects = await Project.find({ owner: req.user._id })
    res.send(projects)

  } catch (e) {
    res.status(400).send(e)
  }
})

// Update an existing project
router.patch('/api/projects/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name']
  const isValidUpdates = updates.every(update => allowedUpdates.includes(update))

  if (!isValidUpdates) {
    return res.status(403).send({ error: 'Invalid updates!' })
  }

  try {
    const project = await Project.findOne({ _id: req.params.id, owner: req.user._id })


    if (!project) {
      return res.status(404).send()
    }

    updates.forEach(update => project[update] = req.body[update])
    await project.save()
    res.send(project)

  } catch (e) {
    res.status(500).send(e)
  }
})

//Delete project
router.delete('/api/projects/:id', auth, async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({_id: req.params.id, owner: req.user._id})

    if (!project) {
      return res.status(404).send()
    }

    res.send(project)
  } catch (e) {
    res.status(500).send()
  }
})

module.exports = router