const config = require('./config');
const app = require('express')();
const json = require('body-parser').json;
const cors = require('cors');
const initModules = require('./modules');
const handlers = require('./handlers');

app.use(json());
app.use(cors());

async function start() {
    const env = await initModules();

    app.get('/auth/login', (req, res) => handlers.auth.login(env, req, res));
    app.get('/auth/token', (req, res) => handlers.auth.token(env, req, res));
    app.post('/auth/create', (req, res) => handlers.auth.create(env, req, res));

    app.get('/events', (req, res) => handlers.events.get(env, req, res));
    app.post('/events', (req, res) => handlers.events.post(env, req, res));

    app.listen(config.port, () => {
        console.log("Server started on port " + config.port);
    });
}

start();