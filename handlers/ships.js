'use strict'

const { request } = require('http')
const { ships } = require('../models/ship')
const { promisify } = require('util')

const readShips = promisify(ships.readAll)
const createShip = promisify(ships.create)
const readShip = promisify(ships.read)
const updateShip = promisify(ships.update)
const uid = ships.uid
const queryShip = ships.read 

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
const getShip = (request, reply) => {
    const { id } = request.params;
    console.debug(`id: ${id}`)
    readShip(id)
    .then((content) => {
        console.debug(`content: ${content}`)
        reply
            .code(200)
            .type('application/json')
            .send(JSON.stringify(content))
        return
    })
    .catch((err) => {
        console.debug(`error: ${err.code}`)
        reply
            .code(500)
            .send(`Server error: ${err.code}`)
        return
    })
}

const landShip = (request, reply) => {
    const { id } = request.params;
    console.debug(`id: ${id}`)
    readShip(id)
    .then((theShip) => {
        console.debug(`theShip: ${JSON.stringify(theShip)}`)
        theShip['landed'] = true
        updateShip(id, theShip)
        .then((content) => {
            console.debug(`content: ${JSON.stringify(content)}`)
            reply
                .code(200)
                .type('application/json')
                .send(JSON.stringify(content))
            return
        })
        .catch((err) => {
            console.debug(`err.code: ${err.code}`)
            reply
                .code(500)
                .send(`Server error: ${err.code}`)
            return
        })
    })        
}

const shipShoot = (request, reply) => {
    const { id } = request.params;
    console.debug(`id: ${id}`)
    readShip(id)
    .then((theShip) => {
        console.debug(`theShip: ${JSON.stringify(theShip)}`)
        if  (theShip['bullets']<=0) {
            console.debug(' No more bullets :( ')
            reply
                .send(200)
                .type('plain/text')
                .send('No more bullets')
            return
        } 
        console.debug(`bullets: ${theShip['bullets']}`)
        theShip['bullets'] = theShip['bullets'] -1
        
        updateShip(id, theShip)
        .then((data) => {
            console.debug(`data: ${JSON.stringify(data)}`)
            reply
                .code(200)
                .type('application/json')
                .send(JSON.stringify(data))
            return
        })
        .catch((err) => {
            console.debug(`err.code: ${err.code}`)
            reply
                .send(500)
                .send(`Server error: ${err.code}`)        
            return
        })
    })
}

module.exports={
    getShips, postShip, getShip, landShip, shipShoot
}