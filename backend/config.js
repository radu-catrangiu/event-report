module.exports = {
    port: process.env.PORT || 8081,
    mongo: {
        host: process.env.MONGO_HOST || "ds125693.mlab.com",
        port: process.env.MONGO_PORT || "25693",
        db: process.env.MONGO_DB || "event_report",
        user: process.env.MONGO_USER || "padawan",
        password: process.env.MONGO_PWD || "123Parola",
        collections: ['events', 'users', 'sessions', 'images']
    },
    mail: {
        user: 'project.event.report@gmail.com',
        pass: '123Parola!'
    }
};