const config = require('./config');
const { MongoClient } = require('mongodb');

function getMongoUrl(mongoConfig) {
    const { host, port, db, user, password: pass } = mongoConfig;
    return `mongodb://${user}:${pass}@${host}:${port}/${db}`;
}

async function init() {
    let mongo = await MongoClient.connect(getMongoUrl(config.mongo));
    const db = mongo.db();
    config.mongo.collections.forEach(collection => {
        db[collection] = db.collection(collection);
    });
    return { db };
}

module.exports = init;