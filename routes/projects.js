const express = require("express");
const { authUser } = require("../basicAuth");
const router = express.Router();
const { projects } = require("../data");
const {
  canViewProject,
  scopedProject,
  canDeleteProject,
} = require("../permissions/project");

router.get("/", authUser, (req, res) => {
  res.json(scopedProject(req.user, projects));
});

router.get("/:projectId", setProject, authUser, authGetProject, (req, res) => {
  res.json(req.project);
});

router.delete(
  "/:projectId",
  setProject,
  authUser,
  authDeleteProject,
  (req, res) => {
    res.send("project deleted");
  }
);

function setProject(req, res, next) {
  const projectId = parseInt(req.params.projectId);
  req.project = projects.find((project) => project.id === projectId);

  if (!Boolean(req.project)) {
    return res.status(404).send("project not found");
  }
  next();
}

function authGetProject(req, res, next) {
  if (!canViewProject(req.user, req.project)) {
    return res.status(401).send("not allowed");
  }

  next();
}

function authDeleteProject(req, res, next) {
  if (!canDeleteProject(req.user, req.project)) {
    return res.status(401).send("not allowed");
  }

  next();
}

module.exports = router;
