const fs = require('fs');
const router = require('express').Router();
const notes = require('../db/db.json');
const { v4: uuidv4 } = require('uuid');


router.get('/notes', (req, res) =>
{
    fs.readFile('./db/db.json', (err, data) =>
    {
        if (err) throw err;
        dbData = JSON.parse(data);
        res.send(dbData);
    })
});

router.post('/notes', (req, res) =>
{
    const newNote = req.body;

    fs.readFile('./db/db.json', (err, data) =>
    {
        if (err) throw err;
        dbData = JSON.parse(data);
        dbData.push(newNote);

        let number = 1;
        dbData.forEach((note) =>
        {
            note.id = uuidv4()
            // note.id = number;
            // number++;
            // return dbData;
        });

        console.log(dbData);

        stringData = JSON.stringify(dbData);

        fs.writeFile('./db/db.json', stringData, (err, data) =>
        {
            if (err) throw err;
        });
    });

    res.send('Your note has been submitted!');
});


router.delete('/notes/:id', (req, res) =>
{
    // get the note title to delete the note
    const deleteNote = req.params.id;
    console.log(deleteNote);

    fs.readFile('./db/db.json', (err, data) =>
    {
        if (err) throw err;

        // Comparing each note's id to delete note
        dbData = JSON.parse(data);

        for (let i = 0; i < dbData.length; i++)
        {
            if (dbData[i].id === deleteNote)
            {
                dbData.splice([i], 1);
            }
        }
        console.log(dbData);
        stringData = JSON.stringify(dbData);

        fs.writeFile('./db/db.json', stringData, (err, data) =>
        {
            if (err) throw err;
        });
    });
    // Express response.status(204)
    res.status(204).send();
});


module.exports = router;