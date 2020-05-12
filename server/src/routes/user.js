const express = new require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')


// Creates new user
router.post('/api/users', async (req, res) => {
  const user = new User(req.body)

  try {
    await user.save()
    const token = await user.generateAuthToken()
    res.status(201).send({ user, token })
  } catch (e) {
    res.status(400).send(e)
  }
})

// Update my user
router.patch('/api/users/me', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['email', 'password']
  const isValidOperation = updates.every(update => allowedUpdates.includes(update))

  if (!isValidOperation) {
    return res.status(403).send({ error: 'Invalid updates!' })
  }

  try {
    updates.forEach(update => req.user[update] = req.body[update])
    await req.user.save()
    res.send(req.user)
  } catch (e) {
    res.status(400).send(e)
  }
})

// Get my user
router.get('/api/users/me', auth, async (req, res) => {

  try {
    res.send(req.user)
  } catch (e) {
    res.status(500).send()
  }
})



// Loging-in a user
router.post('/api/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()
    res.send({ user, token })
  } catch (e) {
    res.status(400).send()
  }
})

// Loging-out a user
router.post('/api/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => token.token !== req.token)
    await req.user.save()
    res.send()
  } catch (e) {
    res.status(500).send()
  }
})

// Deleting all tokens
router.post('/api/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = []
    await req.user.save()

    res.send(200)
  } catch (e) {
    res.status(500).send()
  }
})

// Delete my user
router.delete('/api/users/me', auth, async (req, res) => {
  try {
    await req.user.remove()
    sendByeByeEmail(req.user.email, req.user.name)
    res.send(req.user)
  } catch (e) {
    res.status(500).send()
  }
})


module.exports = router
