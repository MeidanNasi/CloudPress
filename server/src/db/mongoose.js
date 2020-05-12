const mongoose = require('mongoose')
const { mongodbUrl } = require('../../config/config')

mongoose.connect(mongodbUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})