const fs = require('fs');
const path = require('path');
const express = require('express');
//random id generator
const { v4: uuidV4 } = require('uuid')
var notes = require ('./db/db.json')

const PORT = process.env.PORT || 3001;
const app = express();

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
//makes public folder available to pull from- css, js, images etc.
app.use(express.static('public'));

//adds new note to db.json file (list of all notes)
function addNote(note, notesArray) {

  notesArray.push(note)
fs.writeFileSync(
    path.join(__dirname, './db/db.json'),
    JSON.stringify(notes, null, 2)
  );
  return note;
}

//routes
app.get('/notes', (req, res)=> {
    res.sendFile(path.join(__dirname, './public/notes.html'));
  })

  app.get('/api/notes', (req, res)=> {
    
   return res.json(notes)
  })

  app.get('*', (req, res)=> {
    res.sendFile(path.join(__dirname, './public/index.html'));
  })
  //stores new note
  app.post('/api/notes', (req, res)=> {
      
    newNote = req.body
    newNote.id = uuidV4()
    addNote(newNote, notes)

    res.json(newNote)
   })

   app.delete('/api/notes/:id', (req, res) => {
     
     for(i=0; i<notes.length; i++) {
       var current = notes[i]
       if (current.id === req.params.id ) {
         notes.splice([i], 1);
       }
      }

      fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(notes, null, 2)
      )
      
      res.json(notes)
     
   })

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });