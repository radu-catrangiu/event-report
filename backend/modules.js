const config = require('./config');
const { MongoClient } = require('mongodb');
const nodemailer = require('nodemailer');
const handlebars = require('handlebars');

const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: config.mail
});

function getMongoUrl(mongoConfig) {
    const { host, port, db, user, password: pass } = mongoConfig;
    return `mongodb://${user}:${pass}@${host}:${port}/${db}`;
}

async function initMongo() {
    const mongoUrl = getMongoUrl(config.mongo);
    const mongoOpts = { useUnifiedTopology: true };
    const mongo = await MongoClient.connect(mongoUrl, mongoOpts);
    const db = mongo.db();
    config.mongo.collections.forEach(collection => {
        db[collection] = db.collection(collection);
    });

    db.users.createIndex({ email: 1 }, { unique: true });
    db.sessions.createIndex({ expire_at: 1 }, { expireAfterSeconds: 0 });

    return { db };
}

const mailSubjectTemplate = handlebars.compile(
    '[EventReport] New Event `{{title}}`'
);
const mailTemplate = handlebars.compile(
    `<h1>{{title}}</h1>
\   <span>Type:</span> <h4>{{tag}}</h4>
\   <span>Description:</span> <p>{{description}}</p>
\   <h5>Check platform for more details!</h5>`
);

function sendMail(admin, event) {
    const { title, tag, description } = event;
    const mailOptions = {
        from: config.mail.user,
        to: admin.email,
        subject: mailSubjectTemplate({ title }),
        html: mailTemplate({ title, tag, description })
    };

    return mailTransport.sendMail(mailOptions);
}

async function init() {
    const { db } = await initMongo();

    return { db, sendMail };
}

module.exports = init;
