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
    storage: multer.memoryStorage()
});

app.use(json());
app.use(cors());

app.post('/image/upload', upload.single('image'), async (request, response) => {
    response.setHeader('content-type', 'application/json');

    const { file } = request;
    const { buffer, mimetype } = file;

    if (mimetype.split('/')[0] !== 'image') {
        response.status(403);
        return response.send({ message: 'File should be an image!' });
    }

    const encoded = buffer.toString('base64');
    const image = {
        _id: uuid(),
        expire_at: new Date(Date.now() + 5 * 60 * 1000),
        encoded
    };

    await db.images.insertOne(image);

    return response.send({ image_id: image._id });
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
        console.log('Server started on port ' + config.port);
    });
}

start();
