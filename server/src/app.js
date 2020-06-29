const express = require("express");
require("./db/mongoose");
const userRouter = require("./routes/user");
const projectRouter = require("./routes/project");
const corsAccess = require("./middleware/cors");

const app = express();
app.use(corsAccess);
app.use(express.json());
app.use(userRouter);
app.use(projectRouter);

module.exports = app;
