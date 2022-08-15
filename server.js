const { notes } = require('./db/db.json');
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
// parse incoming string or array data
app.use(express.urlencoded({ extended:true }));
// parse incoming JSON data
app.use(express.json());
const PORT = process.env.PORT || 3001;

// To serve the html file and the js and css files connected to it.
app.use(express.static('public'));

function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
       JSON.stringify({ notes: notesArray }, null, 2) 
    );
    return note;
}

//Redirects '/' route to index
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});


// If clicked then open the notes.html file
app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
});

// Wildcard route, if a client makes a request to a nonexistent route
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, './public/index.html'));
// });


// API routes
app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.post('/api/notes', (req, res) => {
    //set id based on what  the next index of the array will be
    req.body.id = notes.length.toString();

    // add notes to json file and notes array in this function
    const note = createNewNote(req.body, notes);

    res.json(note);
});

app.delete('/api/notes/:id',  (req, res) => {
    const { id } = req.params;

    const notesIndex = notes.findIndex(p => p.id == id);
    notes.splice(notesIndex, 1);

    fs.writeFile("./db/db.json", JSON.stringify(notes),
    function(err, data) {
    res.json(notes);
    })
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});