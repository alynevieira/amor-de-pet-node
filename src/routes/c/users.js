'use strict'

const express = require('express')
const router = express.Router()
const user = require('../users')

// routes
router.get('/', getAll)
router.get('/current', getCurrent)
router.get('/:id', getById)
router.put('/:id', update)
router.delete('/:id', _delete)

function getAll(req, res, next) {
    user.getAll()
        .then(users => res.json(users))
        .catch(err => next(err))
}

function getCurrent(req, res, next) {
    user.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err))
}

function getById(req, res, next) {
    user.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err))
}

function update(req, res, next) {
    user.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err))
}

function _delete(req, res, next) {
    user.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err))
}

module.exports = router