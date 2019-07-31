'use strict'

;(async() => {
    const config = require('../config.json');
    const mongoose = require('mongoose');

    await mongoose.connect(process.env.MONGODB_URI || config.connectionString, { useCreateIndex: true, useNewUrlParser: true });
    mongoose.Promise = global.Promise;

    console.log('MongoDB connected')
})()

module.exports = {
    User: require('../models/user.model')
};