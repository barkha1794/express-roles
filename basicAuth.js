function authUser(req, res, next) {
  if (!Boolean(req.user)) {
    return res.status(403).send("You need to sign in");
  }
  next();
}

function authRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(401).send("not allowed");
    }
    next();
  };
}

module.exports = {
  authUser,
  authRole,
};
