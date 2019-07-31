'use strict'

const express = require('express')
const router = express.Router()
const api = require('./api')

// routes
router.get('/', getAll)
router.get('/current', getCurrent)
router.get('/:id', getById)
router.put('/:id', update)
router.delete('/:id', _delete)

function getAll(req, res, next) {
    api.getAll()
        .then(users => res.json(users))
        .catch(err => next(err))
}

function getCurrent(req, res, next) {
    api.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err))
}

function getById(req, res, next) {
    api.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err))
}

function update(req, res, next) {
    api.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err))
}

function _delete(req, res, next) {
    api.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err))
}

module.exports = router