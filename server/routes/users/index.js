const express = require("express");
const router = express.Router();

router
  .route("/users")
  .get((req, res) => {
    return new req.database.User()
      .fetchAll()
      .then(users => {
        return res.json(users);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  })
  .post((req, res) => {
    const username = req.body.username;
    return new req.database.User({ username })
      .save()
      .then(user => {
        return res.json({ success: true });
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  });

router.get("/tasks", (req, res) => {
  // console.log("HELLOOOO", req.database);
  return new req.database.Tasks()
    .fetchAll()
    .then(tasks => {
      return res.json(tasks);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

//creates a new card
router.post("/tasks", (req, res) => {
  const data = req.body;
  const title = data.title;
  const body = data.body;
  const priority = data.priority;
  const status = data.status;
  const created_by = data.created_by;
  const assigned_to = data.assigned_to;
  console.log("posting", data);
  return new req.database.Tasks({
    title,
    body,
    priority,
    status,
    created_by,
    assigned_to
  })
    .save()
    .then(data => {
      // res.redirect("/");
      return res.json({ success: true });
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

//allows clients to move status of card up
router.post("/tasks/up", (req, res) => {
  const data = req.body;
  const id = data.id;
  const title = data.title;
  const body = data.body;
  const priority = data.priority;
  const status = data.status;
  const created_by = data.created_by;
  const assigned_to = data.assigned_to;
  return new req.database.Tasks({
    id,
    title,
    body,
    priority,
    status,
    created_by,
    assigned_to
  })
    .save()
    .then(data => {
      return res.json({ success: true });
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

//allows clients to move status of card down
router.post("/tasks/down", (req, res) => {
  let data = req.body;
  const id = data.id;
  const title = data.title;
  const body = data.body;
  const priority = data.priority;
  const status = data.status;
  const created_by = data.created_by;
  const assigned_to = data.assigned_to;
  return new req.database.Tasks({
    id,
    title,
    body,
    priority,
    status,
    created_by,
    assigned_to
  })
    .save()
    .then(data => {
      return res.json({ success: true });
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

module.exports = router;
