'use strict'

const db = require('../helpers/db')
const Animal = db.Animal

async function getAll() {
    return await Animal.find()
}

async function getById(id) {
    return await Animal.findById(id)
}

async function create(param) {
    const animal = new Animal(param)

    await animal.save()
}

async function update(id, userParam) {
    const animal = await Animal.findById(id)

    Object.assign(animal, userParam)
    
    await animal.save()
}

async function _delete(id) {
    await Animal.findByIdAndRemove(id)
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
}