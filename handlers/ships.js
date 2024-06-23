'use strict'

const { request } = require('http')
const { ships } = require('../models/ship')
const { promisify } = require('util')

const readShips = promisify(ships.readAll)
const createShip = promisify(ships.create)
const uid = ships.uid 

const getShips = (request, reply) => {
    readShips()
    .then((content) => {
        console.debug('content', content)
        reply
            .code(200)
            .type('application/json')
            .send(JSON.stringify(content))
        return
    })
    .catch((err) => {
        console.debug('error', err.code)
        if(err.code==='E_NOT_FOUND'){
            reply.code(400).send('Resource not found!')
            return
        }
        reply.code(500).send(`Server error: ${err.code} - ${err.message}`)
        return
    })
}

const postShip = (request, reply) => {
    const { data } = request.body
    const id = uid()
    console.debug(`data: ${data}`)
    createShip(id, data)
    .then((content) => {
        console.debug(`content: ${data}`)
        reply
            .code(201)
            .type('application/json')
            .send(JSON.stringify(content))
        return
    })
    .catch((err) => {
        console.debug('error', err.code)
        reply.code(500).send(`Server error: ${err.code} - ${err.message}`)
        return
    })
}

module.exports={
    getShips, postShip
}