const {conn} = require('./conn');
const { USERS, THINGS } = require('./seed-data');
const {User} = require('./User');
const {Thing} = require('./Thing');

const seeder = async() => {

  try {
    await conn.sync({force: true});
    await Promise.all(USERS.map((user) => User.create(user)));
    await Promise.all(THINGS.map((thing) => Thing.create(thing)));

  } catch (ex) {
    console.log(ex);
  }
}



module.exports = {
  seeder
};