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

db.users.insert({
    _id: '8da8a96c-bc36-438f-aefe-8cd5261e15e7',
    email: 'admin',
    password: '123Parola',
    admin: true,
    created: new Date()
});
