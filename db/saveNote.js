// Dependecncies-အရင်လုပ်ရန်
const util = require("util");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid"); //  npm install uuid
const readNote = util.promisify(fs.readFile);
const writeNote = util.promisify(fs.writeFile);

//save-နှိပ်ရင်အလုပ်လုပ်ဖို့
class Save {
  write(note) {
    return writeNote("db/db.json", JSON.stringify(note));
  }
  read() {
    return readNote("db/db.json", "utf8");
  }
  retrieveNotes() {
    return this.read().then((notes) => {
      let parsedNotes;
      try {
        parsedNotes = [].concat(JSON.parse(notes));
      } catch (err) {
        parsedNotes = [];
      }
      return parsedNotes;
    });
  }

  //ရေးလိုက်တာတွေကို db-မှာသွားထည့်ဖို့
  addNote(note) {
    const { title, text } = note;
    if (!title || !text) {
      throw new Error("Please, write both title & text!");
    }
    // Use Unique IDs
    const newNote = { title, text, id: uuidv4() };

    // Retrieve, Add, Update Notes
    return this.retrieveNotes()
      .then((notes) => [...notes, newNote])
      .then((updatedNotes) => this.write(updatedNotes))
      .then(() => newNote);
  }

  // Delete Note-လုပ်ဖို့
  deleteNote(id) {
    return this.retrieveNotes()
      .then((notes) => notes.filter((note) => note.id !== id))
      .then((filteredNotes) => this.write(filteredNotes));
  }
}

module.exports = new Save();
