const bookshelf = require("../bookshelf");

class Tasks extends bookshelf.Model {
  get tableName() {
    return "tasks_table";
  }
  get hasTimestamps() {
    return false;
  }
}

module.exports = bookshelf.model("Tasks", Tasks);
