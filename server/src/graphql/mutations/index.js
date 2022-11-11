const userMutation= require('./userMutation')
const roleMutation= require('./roleMutation')

module.exports = {
    ...userMutation,
    ...roleMutation
}