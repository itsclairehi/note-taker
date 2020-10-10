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



app.get('/notes', (req, res)=> {
    res.sendFile(path.join(__dirname, './public/notes.html'));
  })

//   app.get('*', (req, res)=> {
//     res.sendFile(path.join(__dirname, './public/index.html'));
//   })

  app.get('/api/notes', (req, res)=> {
    
   return res.json(notes)
  })


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });