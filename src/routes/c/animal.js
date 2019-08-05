'use strict'

const express = require('express')
const router = express.Router()
const animal = require('../animal')

router.get('/', getAll)
router.post('/register', register)
router.get('/:id', getById)
router.put('/:id', update)
router.delete('/:id', _delete)

function getAll(req, res, next) {
    animal.getAll()
        .then(animal => res.json(animal))
        .catch(err => next(err))
}

function register(req, res, next) {
    animal.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err))
}

function getById(req, res, next) {
    animal.getById(req.params.id)
        .then(animal => animal ? res.json(animal) : res.sendStatus(404))
        .catch(err => next(err))
}

function update(req, res, next) {
    animal.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err))
}

function _delete(req, res, next) {
    animal.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err))
}

module.exports = router