const config = require('./config');
const app = require('express')();
const json = require('body-parser').json;
const cors = require('cors');
const uuid = require('uuid').v4;
const multer = require('multer');
const mime = require('mime');
const initModules = require('./modules');

let db = null;

const upload = multer({
    fileFilter(req, file, callback) {
        return callback(null, true);
    },
    storage: multer.memoryStorage()
});

app.use(json());
app.use(cors());

app.post('/image/upload', upload.single("image"), async (request, response) => {
    const { buffer } = request.file;
    const str = buffer.toString('base64');
    const image = {
        _id: uuid(),
        expire_at: new Date(Date.now() + 5 * 60 * 1000),
        encoded: str
    };

    await db.images.insertOne(image);

    response.setHeader('content-type', 'application/json');
    response.send({ image_id: image._id });
});

app.get('/image/:id', async (request, response) => {
    const { id } = request.params;

    const res = await db.images.findOne({ _id: id });
    const decoded = Buffer.from(res.encoded, 'base64');
    response.send(decoded);
});

async function start() {
    const modules = await initModules();
    db = modules.db;
    app.listen(config.port, () => {
        console.log("Server started on port " + config.port);
    });
}

start();
