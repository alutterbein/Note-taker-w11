const router = require('express').Router();
const fs = require('fs');
const uuid = require('../helpers/uuid');

// router get
router.get('/api/notes', async (req, res) => {
    const notesDB = await JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    res.json(notesDB);
});

// router post
router.post('/api/notes', (req, res) => {
    const notesDB = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuid(),
    };
    notesDB.push(newNote);
    fs.writeFileSync('./db/db.json', JSON.stringify(notesDB));
    res.json(notesDB);
    });


module.exports = router;