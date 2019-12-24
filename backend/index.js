const config = require('./config');
const app = require('express')();
const json = require('body-parser').json;
const cors = require('cors');
const uuid = require('uuid').v4;
const initModules = require('./modules');

app.use(json());
app.use(cors());

let db;

app.get('/auth/login', (request, response) => {
    response.send({
        id: uuid(),
        admin: true,
        login_token: uuid()
    });
});

app.get('/auth/token', (request, response) => {
    response.send({
        id: uuid(),
        admin: true
    });
});

app.post('/auth', (request, response) => {
    response.sendStatus(200);
});

app.get('/events', async (request, response) => {
    const events = await db.events.find().toArray();

    response.setHeader('content-type', 'application/json');
    response.send(events);
});

app.post('/events', async (request, response) => {
    const { title, description, tag, location, image_id } = request.body;
    const event = {
        id: uuid(),
        title,
        description,
        tag,
        location,
        image_id,
        resolved: false,
        report_date: new Date()
    };

    await db.events.insertOne(event);

    response.setHeader('content-type', 'application/json');
    response.send(event);
});


async function start() {
    const modules = await initModules();
    db = modules.db;
    app.listen(config.port, () => {
        console.log("Server started on port " + config.port);
    });
}

start();