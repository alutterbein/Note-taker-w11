const express = require('express');
const fs = require('fs');
const uuid = require('./helpers/uuid');
const PORT = 3001;
const path = require('path');
const app = express();
app.use(express.json());
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '../public/notes.html'))
);

app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a note`)

    const { title, text } = req.body;
    if (title && text) {
        const newNote = {
            title,
            text,
            note_id: uuid(),
        };
        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if  (err) {
                console.error(err);
            } else {
                const parsedNotes = JSON.parse(data);
                parsedNotes.push(newNote);
                fs.writeFile('./db/db.json', JSON.stringify(parsedNotes, null, 4), (writeErr) => 
                writeErr
                ? console.error(writeErr)
                : console.log('Note saved!'));
}
        });
        const response = {
            status: 'success',
            body: newNote,
        };
        console.log(response);
        res.status(201).json(response);
        } else {
            res.status(500).json('Error in posting note');
        }
    });
    app.listen(PORT, () => 
        console.log(`App listening at http://localhost:${PORT}`));
