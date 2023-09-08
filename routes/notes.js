const notes = require("express").Router();
const { readFromFile, readAndAppend } = require("../helpers/fsUtils");
const { v4: uuidv4 } = require("uuid");

// GET request to pull data from db.json and than parses the response
notes.get("/", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

// POST request to add a new note and append it to the db.json file
notes.post("/", (req, res) => {
  console.log(req.body);
  const { title, text } = req.body;

  if (req.body) {
    const newTask = {
      id: uuidv4(),
      title: title,
      text: text,
    };

    readAndAppend(newTask, "./db/db.json");
    res.json("New note added successfully");
  } else {
    res.error("Error adding new note");
  }
});

// DELETE request for individual notes based off the id
notes.delete("/:id", (req, res) => {
  const { id } = req.params;

  if (req.id) {
    id.delete('./db/db.json', (err) => {
      if (err) {
        res.status(500).send("Error deleting note");
      } else {
        res.status(200).send("Successfully deleted note");
      }
    });
  }
});

module.exports = notes;
