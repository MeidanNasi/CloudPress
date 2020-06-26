const express = new require("express");
const router = new express.Router();
const Project = require("../models/project");
const auth = require("../middleware/auth");
const { workerDns, masterDns } = require("./../../config/config");
const UserPort = require("../models/userPort");
const createCluster = require("../utils/createCluster");

// Create a new project
router.post("/api/projects", auth, async (req, res) => {
  let newProject;
  let nextPortCount;

  try {
    nextPortCount = (await UserPort.fetchCurrentPort()) + 1;
    const project = new Project({
      ...req.body,
      owner: req.user._id,
      port: nextPortCount,
    });
    newProject = await project.save();
    await UserPort.setCurrentPort(nextPortCount);
  } catch (e) {
    res.status(400).send(e);
  }

  try {
    //TODO: test cluster creation
    //TODO: handle createCluster async fallback (in case of exception)

    await createCluster(
      workerDns,
      masterDns,
      newProject._id.toString(),
      nextPortCount
    );
    res.status(201).send(newProject);
  } catch (e) {
    //in case of failure rollback project, and port number
    try {
      await deleteProject({
        user: req.user,
        params: {
          id: newProject._id,
        },
      });
      await UserPort.setCurrentPort(nextPortCount - 1);
      res.status(500).send(e);
    } catch (e) {
      res.status(500).send(e);
    }
  }
});

// Get project by id
router.get("/api/projects/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const project = await Project.findOne({ _id, owner: req.user._id });

    if (!project) {
      return res.status(404).send();
    }
    res.send(project);
  } catch (e) {
    res.status(500).send(e);
  }
});

// Get all projects
router.get("/api/projects", auth, async (req, res) => {
  try {
    const projects = await Project.find({ owner: req.user._id });
    res.send(projects);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Update an existing project
router.patch("/api/projects/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name"];
  const isValidUpdates = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidUpdates) {
    return res.status(403).send({ error: "Invalid updates!" });
  }

  try {
    const project = await Project.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!project) {
      return res.status(404).send();
    }

    updates.forEach((update) => (project[update] = req.body[update]));
    await project.save();
    res.send(project);
  } catch (e) {
    res.status(500).send(e);
  }
});

//Delete project
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!project) {
      if (res) {
        return res.status(404).send();
      }
      throw new Error("Could not find project");
    }
    return res ? res.send(project) : undefined;
  } catch (e) {
    if (res) {
      return res.status(500).send(e);
    }
    throw new Error(e);
  }
};

router.delete("/api/projects/:id", auth, deleteProject);

module.exports = router;
