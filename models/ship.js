'use strict'

module.exports = {
  ships: shipModel()
}

function shipModel () {
  // const db = {
  //   1: { id: "1", model:"TIE-Fighter", bullets:12, landed:false, pilot: 'Dark-pilot 1', alias: 'dark-leader' },
  //   2: { id: "2", model:"TIE-Fighter", bullets:9, landed:false, pilot: 'Dark-pilot 2', alias: 'dark-rightwind' },
  //   3: { id: "3", model:"TIE-Fighter", bullets:9, landed:false, pilot: 'Dark-pilot 3', alias: 'dark-leftwind' },
  //   4: { id: "4", model:"TIE-Fighter", bullets:22, landed:false, pilot: 'Dark Joker', alias: 'dark-punisher' },
  //   5: { id: "5", model:"TIE-Fighter", bullets:40, landed:false, pilot: 'Incognit', alias: 'dark-force' },
  // }
  const db = [
    { id: "1", model:"TIE-Fighter", bullets:12, landed:false, pilot: 'Dark-pilot 1', alias: 'dark-leader' },
    { id: "2", model:"TIE-Fighter", bullets:9, landed:false, pilot: 'Dark-pilot 2', alias: 'dark-rightwind' },
    { id: "3", model:"TIE-Fighter", bullets:9, landed:false, pilot: 'Dark-pilot 3', alias: 'dark-leftwind' },
    { id: "4", model:"TIE-Fighter", bullets:22, landed:false, pilot: 'Dark Joker', alias: 'dark-punisher' },
    { id: "5", model:"TIE-Fighter", bullets:40, landed:false, pilot: 'Incognit', alias: 'dark-force' },
  ]

  return {
    uid,
    create,
    read,
    readAll,
    update,
    del
  }

  function uid () {
    // return Object.keys(db)
    //   .sort((a, b) => a - b)
    //   .map(Number)
    //   .filter((n) => !isNaN(n))
    //   .pop() + 1 + ''
      return parseInt(Object.values(db)[db.length-1].id) + 1
  }

  function create (id, data, cb) {
    db.forEach((row, _) => {
      console.debug(`row['id'] = ${row['id']}`)
      if (row['id']===id) {
        const err = Error('ship exists')
        err.code = 'E_RESOURCE_EXISTS'
        setImmediate(() => cb(err))
        return
      }
    });
    data['id'] = id
    console.debug(`data: ${JSON.stringify(data)}`)
    db[db.length] = data
    setImmediate(() => cb(null, id))
  }

  function readAll(cb) {
    console.debug(`data: ${db}`)
    setImmediate(() => cb(null, db))
  }

  function read (id, cb) {
    db.forEach((row, index) => {
      if (row['id']===id) {
        setImmediate(() => cb(null, db[index]))
        return
      }
    })    
    const err = Error('ship not found')
    err.code = 'E_NOT_FOUND'
    setImmediate(() => cb(err))
    return    
  }
  
  function update (id, data, cb) {
    db.forEach((row, index) => {
      if (row['id']===id){
        console.debug(`id found: ${id}`)
        db[index] = data
        setImmediate(() => cb(null, db[index]))
        return
      }
    })    
    const err = Error('ship not found')
    err.code = 'E_NOT_FOUND'
    setImmediate(() => cb(err))
    return    
  }

  function del (id, cb) {
    if (!(db.hasOwnProperty(id))) {
      const err = Error('ship not found')
      err.code = 'E_NOT_FOUND'
      setImmediate(() => cb(err))
      return
    }
    delete db[id]
    setImmediate(() => cb())
  }
}