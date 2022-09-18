// Dependencies
const path = require("path");
const router = require("express").Router();

// ဒီဟာက notes.html မှတ်ချက်။ ။တစ်ခြားrouters-တွေထက် ရှေ့ရောက်နေရမယ်
router.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/notes.html"));
});

//ဒါက index.html default
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// homepage
router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = router;
