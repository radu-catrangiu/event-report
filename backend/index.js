const config = require('./config');
const app = require('express')();
const json = require('body-parser').json;
const cors = require('cors');
const uuid = require('uuid').v4;

app.use(json());
app.use(cors());

const db = [];
for (let i = 0; i < 10; i++) {
    db.push({
      id: "!11241" + i,
      title: "New event bla bla",
      resolved: Math.random() > 0.5,
      description: "Something happened at bla bla and people ARE DYING!!!"
    });
}

app.get('/events', (request, response) => {
    response.setHeader('content-type', 'application/json');
    response.send(db);
});

app.post('/events', (request, response) => {
    const event = request.body;
    event.id = uuid();
    event.resolved = false;
    event.report_date = new Date();
    db.unshift(event);
    response.setHeader('content-type', 'application/json');
    response.send(event);
});

app.listen(config.port, () => {
    console.log("Server started on port " + config.port);
});
