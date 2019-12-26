const config = require('./config');
const { MongoClient } = require('mongodb');

function getMongoUrl(mongoConfig) {
    const { host, port, db, user, password: pass } = mongoConfig;
    return `mongodb://${user}:${pass}@${host}:${port}/${db}`;
}

async function init() {
    const mongoUrl = getMongoUrl(config.mongo);
    const mongoOpts = { useUnifiedTopology: true };
    const mongo = await MongoClient.connect(mongoUrl, mongoOpts);
    const db = mongo.db();
    config.mongo.collections.forEach(collection => {
        db[collection] = db.collection(collection);
    });

    db.images.createIndex({ expire_at: 1 }, { expireAfterSeconds: 0 });
    db.images.createIndex({ event_id: 1 }, { unique: true });

    return { db };
}

module.exports = init;