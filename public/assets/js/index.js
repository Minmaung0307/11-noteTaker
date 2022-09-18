var $noteTitle = $(".note-title");
var $noteText = $(".note-textarea");
var $saveNoteBtn = $(".save-note");
var $newNoteBtn = $(".new-note");
var $noteList = $(".list-container .list-group");

// note-တွေကို ခြေရာခံခြင်း
var activeNote = {};

// db-ထဲက note-တွေကို ရယူခြင်း
var getNotes = function () {
  return $.ajax({
    url: "/api/notes",
    method: "GET",
  });
};

// saving notes to db
var saveNote = function (note) {
  return $.ajax({
    url: "/api/notes",
    data: note,
    method: "POST",
  });
};

// deleting notes from db
var deleteNote = function (id) {
  return $.ajax({
    url: "api/notes/" + id,
    method: "DELETE",
  });
};

// If activeNote, display it, otherwise render empty
var renderActiveNote = function () {
  $saveNoteBtn.hide();
  if (activeNote.id) {
    $noteTitle.attr("readonly", true);
    $noteText.attr("readonly", true);
    $noteTitle.val(activeNote.title);
    $noteText.val(activeNote.text);
  } else {
    $noteTitle.attr("readonly", false);
    $noteText.attr("readonly", false);
    $noteTitle.val("");
    $noteText.val("");
  }
};

// get notes from input, save to db
var handleNoteSave = function () {
  var newNote = {
    title: $noteTitle.val(),
    text: $noteText.val(),
  };

  saveNote(newNote).then(function (data) {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// delete notes
var handleNoteDelete = function (event) {
  // prevents the click listener for the list from being called when the button inside of it is clicked
  event.stopPropagation();

  var note = $(this).parent(".list-group-item").data();

  if (activeNote.id === note.id) {
    activeNote = {};
  }

  deleteNote(note.id).then(function () {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Set activeNote
var handleNoteView = function () {
  activeNote = $(this).data();
  renderActiveNote();
};

// user can enter notes
var handleNewNoteView = function () {
  activeNote = {};
  renderActiveNote();
};

// hide save button if no title no text
var handleRenderSaveBtn = function () {
  if (!$noteTitle.val().trim() || !$noteText.val().trim()) {
    $saveNoteBtn.hide();
  } else {
    $saveNoteBtn.show();
  }
};

// show lists of note titles
var renderNoteList = function (notes) {
  $noteList.empty();

  var noteListItems = [];

  for (var i = 0; i < notes.length; i++) {
    var note = notes[i];

    var $li = $("<li class='list-group-item'>").data(note);
    var $span = $("<span>").text(note.title);
    var $delBtn = $(
      "<i class='fas fa-trash-alt float-right text-danger delete-note'>"
    );

    $li.append($span, $delBtn);
    noteListItems.push($li);
  }

  $noteList.append(noteListItems);
};

// get notes from db and show
var getAndRenderNotes = function () {
  return getNotes().then(function (data) {
    renderNoteList(data);
  });
};

$saveNoteBtn.on("click", handleNoteSave);
$noteList.on("click", ".list-group-item", handleNoteView);
$newNoteBtn.on("click", handleNewNoteView);
$noteList.on("click", ".delete-note", handleNoteDelete);
$noteTitle.on("keyup", handleRenderSaveBtn);
$noteText.on("keyup", handleRenderSaveBtn);

// calling function
getAndRenderNotes();
