const userQuery= require('./userQuery')
const todoQuery = require('./todoQuery')

module.exports = {
    ...todoQuery,
    ...userQuery
}
