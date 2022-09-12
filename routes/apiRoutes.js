//Dependencies
const router = require("express").Router();
const saveNote = require("../db/saveNote");

//Get method
router.get("/notes", function (req, res) {
  saveNote
    .retrieveNotes()
    .then((notes) => res.json(notes))
    .catch((err) => res.status(500).json(err));
});

//Post method
router.post("/notes", function (req, res) {
  saveNote
    .retrieveNotes()
    .then((notes) => res.json(notes))
    .catch((err) => res.status(500).json(err));
});

//Delete method
router.delete("/notes/:id", function (req, res) {
  saveNote
    .deleteNote(req.params.id)
    .then(() => res.json({ ok: true }))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
