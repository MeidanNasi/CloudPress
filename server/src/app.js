const express = require("express");
require("./db/mongoose");
const userRouter = require("./routes/user");
const projectRouter = require("./routes/project");
const corsAccess = require("./middleware/cors");
const path = require('path');

const clientDirPath = path.join(__dirname, '../../client/build');

const app = express();
app.use(express.static(clientDirPath));
app.use(corsAccess);
app.use(express.json());
app.use(userRouter);
app.use(projectRouter);

module.exports = app;
