const express = require("express");
const app = express();
const port = 3000;
const { users, ROLE } = require("./data");
const projectRouter = require("./routes/projects");
const { authUser, authRole } = require("./basicAuth");

const setUser = (req, res, next) => {
  const userId = req.body.userId;
  if (userId) {
    req.user = users.find((user) => user.id === userId);
  }
  next();
};

app.use(express.json());
app.use(setUser);
app.use("/projects", projectRouter);

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.get("/dashboard", authUser, (req, res) => {
  res.send("Dashboard Page");
});

app.get("/admin", authUser, authRole(ROLE.ADMIN), (req, res) => {
  res.send("Admin Page");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
