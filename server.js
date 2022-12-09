const express = require('express');
const app = express();

app.use(express.json());

// Stores the waiting clients.
const callbacks = {};

app.post('/client/:id', (req, res) => {
    const id = req.params.id;
    // Define the callback.
    callbacks[id] = (body) => {
        // Delete the callback when the response is received.
        delete callbacks[id];
        res.json(body);
    }
});

app.post('/webhook/:id', (req, res) => {
    const id = req.params.id;
    const body = req.body;
    // execute the callback.
    callbacks[id](body);
    res.end();
});

app.listen(3000, () => {
    console.log('listening on port 3000');
})