const userMutation= require('./userMutation')
const todoMutation = require('./todoMutation')

module.exports = {
    ...userMutation,
    ...todoMutation
}