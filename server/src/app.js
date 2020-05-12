const express = require('express')
require('./db/mongoose')

const userRouter = require('./routes/user')
const projectRouter = require('./routes/project')

const app = express()

app.use(express.json())
app.use(userRouter)
app.use(projectRouter)

module.exports = app
