const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

// To serve the html file and the js and css files connected to it.
app.use(express.static('public'));

//Redirects '/' route to index
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});


// If clicked then open the notes.html file
app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
});

// Wildcard route, if a client makes a request to a nonexistent route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});