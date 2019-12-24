module.exports = {
    port: process.env.PORT || 8082,
    mongo: {
        host: "ds125693.mlab.com",
        port: "25693",
        db: "event_report",
        user: "padawan",
        password: "123Parola",
        collections: ['images']
    }
};
