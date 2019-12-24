const config = require('./config');
const app = require('express')();
const json = require('body-parser').json;
const cors = require('cors');
const uuid = require('uuid').v4;

app.use(json());
app.use(cors());

app.post('/image/upload', upload.single("image"), (request, response) => {
    response.sendStatus(200);
});

app.listen(config.port, () => {
    console.log("Server started on port " + config.port);
});
