const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

// If clicked then open the notes.html file
app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
})

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});