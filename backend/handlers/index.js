const auth = require('./auth');
const events = require('./events');

function middleware(method) {
    return async (env, request, response) => {
        try {
            await method(env, request, response);
        } catch (error) {
            return response.sendStatus(500);
        }
    };
}

function applyMiddleware(handlerModule) {
    const methods = Object.keys(handlerModule);

    const result = methods.reduce((newHandlerModule, methodName) => {
        newHandlerModule[methodName] = middleware(handlerModule[methodName]);
        return newHandlerModule;
    }, {});

    return result;
}

module.exports = {
    auth: applyMiddleware(auth),
    events: applyMiddleware(events)
};
