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

function createNewNote(body, dbArray) {
  const note = body;
  dbArray.push(note);
  fs.writeFileSync(
    path.join(__dirname, "./db/db.json"),
    JSON.stringify({ db: dbArray }, null, 1)
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
app.post("/api/db", (req, res) => {
  req.body.id = db.length.toString();

  const note = createNewNote(req.body, db);
  if (!validateNote(req.body)) {
    res.status(400).send("The note has not been saved.");
  } else {
    const note = createNewNote(req.body, db);
    res.json(note);
  }
});

// Listen for Port ------
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
