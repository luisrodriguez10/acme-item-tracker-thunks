const { conn } = require("./conn");
const { Thing } = require("./Thing");
const { STRING } = conn.Sequelize;

const User = conn.define("user", {
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

User.addHook("beforeDestroy", async (user) => {
  await Thing.destroy({
    where: {
      userId: user.id,
    },
  });
});

User.hasMany(Thing);

module.exports = { User };
