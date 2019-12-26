const uuid = require('uuid').v4;

async function get(env, request, response) {
    const events = await env.db.events.find().toArray();

    response.setHeader('content-type', 'application/json');
    response.send(events);
}

async function post(env, request, response) {
    const { title, description, tag, location, image_id } = request.body;
    const event = {
        id: uuid(),
        title,
        description,
        tag,
        location,
        image_id,
        resolved: false,
        report_date: new Date()
    };

    const findQuery = { admin: true };
    const findOpts = { projection: { email: true } };
    const admins = await env.db.users.find(findQuery, findOpts).toArray() || [];
    admins.forEach(admin => {
        env.sendMail(admin, event);
    });

    await env.db.events.insertOne(event);

    response.setHeader('content-type', 'application/json');
    response.send(event);
}


module.exports = {
    get,
    post
};
