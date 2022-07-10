const {conn} = require("./conn");
const { STRING, INTEGER } = conn.Sequelize;
const {User} = require('./User');

const Thing = conn.define("thing", {
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  ranking: {
    type: INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});



Thing.addHook('beforeValidate', (thing) => {
  if(!thing.userId){
    thing.userId = null;
  }
});

module.exports = {Thing};
