exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("tasks_table", function(table) {
      table.increments("id");
      table.string("title");
      table.string("body");
      table.string("priority");
      table.string("status");
      table.string("created_by");
      table.string("assigned_to");
    })
    .createTable("users", function(table) {
      table.increments("id");
      table.string("username");
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("tasks_table").dropTable("users");
};
