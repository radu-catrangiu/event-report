const uuid = require('uuid').v4;

async function create(env, request, response) {
    const { email, password } = request.body;
    const user = {
        _id: uuid(),
        email,
        password,
        admin: true,
        created: new Date()
    };

    const goodEmail = typeof email === 'string' && email.length > 3;
    const goodPass = typeof password === 'string' && password.length > 3;
    if (!goodEmail || !goodPass) {
        return response.sendStatus(403);
    }

    await env.db.users.insertOne(user);

    return response.sendStatus(200);
}

async function login(env, request, response) {
    const { email, password } = request.query;
    const user = await env.db.users.findOne(
        { email, password },
        { projection: { password: false } }
    );

    if (!user) {
        return response.sendStatus(403);
    }

    const session = {
        _id: uuid(),
        user_id: user._id,
        admin: user.admin,
        expire_at: new Date(Date.now() + 24 * 3600 * 1000)
    };

    await env.db.sessions.insertOne(session);

    return response.send({
        admin: true,
        email: user.email,
        login_token: session._id
    });
}

async function token(env, request, response) {
    const { login_token: loginToken } = request.query;

    const session = await env.db.sessions.findOne({ _id: loginToken });
    if (!session) {
        return response.sendStatus(403);
    }

    const user = await env.db.users.findOne({ _id: session.user_id });
    if (!user) {
        return response.sendStatus(403);
    }

    response.send({
        admin: user.admin,
        email: user.email
    });
}

module.exports = {
    create, login, token
};