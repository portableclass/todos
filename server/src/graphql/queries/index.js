const userQuery= require('./userQuery')
const roleQuery= require('./roleQuery')

module.exports = {
    ...userQuery,
    ...roleQuery
}
