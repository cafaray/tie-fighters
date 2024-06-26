'use strict'

const {getShips, postShip, getShip, landShip, shipShoot} = require('../handlers/ships')

const shipSchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
        id: { type: 'string' }, 
        model: { type:'string' }, 
        bullets: {type: 'integer'}, 
        landed: {type: 'boolean'}, 
        pilot: {type: 'string'}, 
        alias: {type: 'string'},
    }
}

const optsGetShip = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: { type: shipSchema }
            }
        }
    }, 
    handler: getShip
}

const optsLandShip = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: { type: shipSchema }
            }
        }
    },
    handler: landShip
}

const optsShipShoot = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: { type: shipSchema }
            }
        }
    },
    handler: shipShoot
}

const optsGetShips = {
    schema: {
        response: {
            200: {
                type: 'array',
                items: { 
                    type: 'object',
                    properties: { type: shipSchema }
                }
            }
        }
    },
    handler: getShips
}

const optsPostShip = {
    schema: {
        body: {
            type: 'object',
            additionalProperties: false,
            required: ['data'],
            properties: {
                data: {
                    type: 'object',
                    properties: {
                        model: { type:'string' }, 
                        bullets: {type: 'integer'}, 
                        landed: {type: 'boolean'}, 
                        pilot: {type: 'string'}, 
                        alias: {type: 'string'}
                    }
                }
            }
        },
        response: {
          201: {
            id: {type: 'string'}
          }
        }
    },
    handler: postShip
}

module.exports = async function (fastify, opts, done) {
    fastify.get('/tie-fighters', optsGetShips)
    fastify.post('/tie-fighters', optsPostShip)
    fastify.get('/tie-fighters/:id', optsGetShip)
    fastify.put('/tie-fighters/:id/land', optsLandShip)
    fastify.put('/tie-fighters/:id/shoot', optsShipShoot)
    done()
}