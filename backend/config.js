module.exports = {
    port: process.env.PORT || 8081,
    mongo: {
        host: "ds125693.mlab.com",
        port: "25693",
        db: "event_report",
        user: "padawan",
        password: "123Parola",
        collections: ['events', 'users', 'sessions', 'images']
    },
    mail: {
        user: 'project.event.report@gmail.com',
        pass: '123Parola!'
    }
};