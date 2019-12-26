const uuid = require('uuid').v4;

async function get(env, request, response) {
    const events = await env.db.events
        .find()
        .sort({ report_date: -1 })
        .toArray();

    response.setHeader('content-type', 'application/json');
    response.send(events);
}

async function post(env, request, response) {
    const { title, description, tag, location, image_id } = request.body;
    const event = {
        _id: uuid(),
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
    const admins = await env.db.users.find(findQuery, findOpts).toArray();
    admins.forEach(admin => {
        env.sendMail(admin, event);
    });

    const imageCount = await env.db.images.count({ _id: image_id });
    if (imageCount === 0) {
        return response.sendStatus(404);
    }

    await env.db.events.insertOne(event);
    await env.db.images.updateOne(
        { _id: image_id },
        {
            $unset: { expire_at: true },
            $set: { event_id: event._id }
        }
    );

    response.setHeader('content-type', 'application/json');
    response.send(event);
}

module.exports = {
    get,
    post
};
