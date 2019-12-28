db.createUser({
    user: 'padawan',
    pwd: '123Parola',
    roles: [
        {
            role: 'readWrite',
            db: 'event_report'
        }
    ]
});
