// Dependencies
const path = require("path");
const router = require("express").Router();

// ဒီဟာက တစ်ခြားrouters-တွေထက် ရှေ့ရောက်နေရမယ်
router.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/notes.html"));
});

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// default to homepage
router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = router;
