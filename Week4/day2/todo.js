const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');

});

app.listen(3000, () => {
    console.log('server started at http://localhost:3000');
}
);