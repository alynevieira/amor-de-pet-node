'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    name: String,
    type: String,
    race: String,
    gender: String,
    date: String,
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true })

module.exports = mongoose.model('Animal', schema, 'animal')