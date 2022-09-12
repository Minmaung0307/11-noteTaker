//Dependencies
const fs = require("fs");
const util = require("util");

const readNote = util.promisify(fs.readFile);
const writeNote = util.promisify(fs.writeFile);

class Save {
  write(note) {
    return writeNote("db/db.json", JSON.stringify(note));
  }
  read() {
    return readNote("db/db.json", "utf8");
  }
  retrieveNote() {
    return this.read().then((note) => {
      let parsedNote;
    });
  }
}
