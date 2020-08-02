const fs = require("fs");
const path = require("path");

const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

// parsing
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

const { db } = require("./db/db.json");

// functions start

function filterByQuery(query, notesArray) {
  let titleArray = [];
}

function createNewNote(body, dbArray) {
  const note = body;
  notesArray.push(note);
  fs.writeFileSync(
    path.join(__dirname, "./db/db.json"),
    JSON.stringify({ notes: dbArray }, null, 2)
  );

  return note;
}

//functions end

// get webpages to show on server

// Merge both html pages together Start ------
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});
// Merge both html pages together end -------

// Get previous notes for page ---------
app.get("/api/notes", (req, res) => {});

// Get responses by ID -------
app.get("/api/notes/:id", (req, res) => {
  const result = findById(req.param.id, db);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});

// Post new information -------
app.post("/api/notes", (req, res) => {
  req.body.id = notes.length.toString();

  if (!validateNote(req.body)) {
    res.status(400).send("The note has not been saved.");
  } else {
    const note = createNewNote(req.body, notes);
    res.json(note);
  }
});

// Listen for Port ------
app.listen(3001, () => {
  console.log(`API server now on port 3001!`);
});
