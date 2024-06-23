'use strict'
const fastify = require('fastify')({
  logger: true  
})

const { ADDRESS = 'localhost', PORT = '3000' } = process.env;

const index = require('./routes/index')

fastify.register(index)

fastify.get('/', function(req, rep){
  rep.send({hello: 'world'});
})

const start = async () => {
  try {
    await fastify.listen({host: ADDRESS, port:PORT})
  } catch(err) {
    console.log(err)
    process.exit(1)
  }
  console.log(`server listening on ${PORT}`)
}
start()