'use strict'

const expressJwt = require('express-jwt')
const config = require('../config.json')
const userService = require('../routes/users')

module.exports = jwt;

function jwt() {
    const secret = config.secret
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/api/signin/authenticate',
            '/api/signin/register',
            '/api/signin/forgetPassword',
            '/api/signin/newPassword'
        ]
    });
}

async function isRevoked(req, payload, done) {
    const user = await userService.getById(payload.sub)

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true)
    }

    done()
};