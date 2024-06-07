const fs = require("fs")
const chalk = require("chalk")

const getNotes = () => {
  return "Your notes..."
}

const addNote = (title, body) => {
  const notes = loadNotes()
  const duplicateNote = notes.find((note)=>note.title === title)
  debugger
  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    })
    saveNotes(notes);
    console.log(chalk.green.inverse("New note added!"))
  } else {
    console.log(chalk.red.inverse("Note title taken!"))
  }
}

const removeNote = (title) => {
  const notes = loadNotes()
  const notesTokeep = notes.filter((note) => note.title !== title)

  saveNotes(notesTokeep);
  if (notes.length > notesTokeep) {
    console.log(chalk.green.inverse("Note removed"))
  } else {
    console.log(chalk.red.inverse("No note found"))
  }
}
const listNotes = () => {
  const notes = loadNotes() 

  console.log(chalk.yellow.inverse("Your Notes"))

  notes.forEach((note) => {
    console.log(note.title)
  })
}

const readNotes=(title)=>{
    const notes = loadNotes()
    const note = notes.find((note)=>note.title === title)
    if(note){
        console.log(chalk.inverse(note.title))
        console.log(note.body)
    }
    else{
        console.log(chalk.red.inverse("note not found"))
    }
    
}


const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes)
  fs.writeFileSync("notes.json", dataJSON)
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json")
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
  } catch (e) {
    return []
  }
}

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNotes:readNotes
};
