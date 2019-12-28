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
        tag: String(tag).toLowerCase(),
        location,
        image_id: String(image_id).toLowerCase(),
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

async function put(env, request, response) {
    const { id } = request.params;
    const { login_token: loginToken, resolved } = request.body;
    const session = await env.db.sessions.findOne({ _id: loginToken });
    if (!session || !session.admin) {
        return response.sendStatus(403);
    }

    await env.db.events.updateOne({ _id: id }, { $set: { resolved } });

    return response.sendStatus(200);
}

async function deleteEvent(env, request, response) {
    const { id } = request.params;
    const { login_token: loginToken } = request.query;
    const session = await env.db.sessions.findOne({ _id: loginToken });
    if (!session || !session.admin) {
        return response.sendStatus(403);
    }

    await env.db.events.deleteOne({ _id: id });
    await env.db.images.deleteOne({ event_id: id });

    return response.sendStatus(200);
}

module.exports = {
    get,
    post,
    put,
    deleteEvent
};
