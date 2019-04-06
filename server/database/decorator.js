const User = require("./models/User");
const Tasks = require("./models/Tasks");
module.exports = function(req, res, next) {
  req.database = { User, Tasks };

  next();
};
