'use strict'

const bcrypt = require('bcryptjs')
const db = require('../helpers/db')
const User = db.User


async function getAll() {
    return await User.find().select('-password')
}

async function getById(id) {
    return await User.findById(id).select('-password')
}

async function update(id, userParam) {
    const user = await User.findById(id)

    // validate
    if (!user) throw 'Usuário não encontrado.';
    if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
        throw 'Usuário "' + userParam.username + '" já está sendo usado.'
    }

    if (userParam.password) {
        userParam.password = bcrypt.hashSync(userParam.password, 10)
    }
    
    Object.assign(user, userParam)
    
    await user.save()
}

async function _delete(id) {
    await User.findByIdAndRemove(id)
}

module.exports = {
    getAll,
    getById,
    update,
    delete: _delete
}