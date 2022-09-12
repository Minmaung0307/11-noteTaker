//Dependencies
const path = require("path");
const router = require("express").Router();

//require routes
router.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "../public/index.html"))
);

router.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "../public/notes.html"))
);

//default to homepage
router.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "../public/index.html"))
);

module.exports = router;
