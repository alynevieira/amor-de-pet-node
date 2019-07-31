'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    firstname: String,
    lastname: String,
    address: String,
    city: String,
    state: String,
    email: String,
    username: String,
    password: String,
    hash: String,
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true })

module.exports = mongoose.model('User', schema, 'users')