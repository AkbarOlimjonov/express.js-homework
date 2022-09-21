const { Router } = require("express");
const router = Router();
const db = require("../db");
const Joi = require("joi");
const fs = require("fs");
const path = require("path");
const { join } = require("path");

router.post("/add", async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().trim().required().min(2),
    price: Joi.number().integer().required().min(100),
  });

  const validation = schema.validate(req.body);

  if (!!validation.error) {
    return res.status(400).send(validation.error.message);
  }

  const course = {
    name: req.body.name,
    price: req.body.price,
    id: db.courses.length + 1,
  };

  const dbPath = path.join(__dirname, "..", "data", "db.json");

  fs.readFile(dbPath, "utf-8", (err, value) => {
    if (err) return res.status(400).send(err);
    else {
      let courses = JSON.parse(value);
      courses.push(course);

      fs.writeFile(dbPath, JSON.stringify(courses), (err) => {
        if (err) return res.status(400).send(err);
        res.status(201).send('Created');
      });
    }
  });
});

router.get("/", (req, res) => {
  res.send(db.courses);
});

router.put("/:name", (req, res) => {
  const course = db.courses.find((val) => val.name === req.params.name);

  course.name = req.body.name;

  return res.send("Course update");
});

router.delete("/:name", (req, res) => {
  const course = db.courses.find((val) => val.name === req.params.name);

  db.courses.splice(course, 1);

  return res.send("Course delete");
});

module.exports = router;
