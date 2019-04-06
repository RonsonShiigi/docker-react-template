exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("tasks_table")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("tasks_table")
        .insert([
          {
            title: "Hit the Gym",
            body: "GET YO ASS IN SHAPE",
            priority: "medium",
            status: "queue",
            created_by: "Mr. T",
            assigned_to: "Ronson"
          },
          {
            title: "Go grocery shopping",
            body: "Buy them veggies",
            priority: "medium",
            status: "progress",
            created_by: "Martha",
            assigned_to: "Ronson"
          },
          {
            title: "Smoke Weed",
            body: "Get High",
            priority: "medium",
            status: "pau",
            created_by: "Nate Dogg",
            assigned_to: "Ronson"
          }
        ])
        .then(function() {
          return knex("users")
            .del()
            .insert([{ username: "Ronny" }, { username: "Fuck Sauce" }]);
        });
    });
};
