const mongoose = require("mongoose");
const {mongodbUrl} = require("../../config/config");

mongoose.connect(mongodbUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
}).then(r => {
  console.log('db connected');
  console.log(r);
}).catch(e => {
  console.log('db couldnt connected');
  console.log(e);
});
