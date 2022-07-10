const { faker } = require("@faker-js/faker");

const USERS = [];
const THINGS = [];

function createRandomUser() {
  return {
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
  };
}

function createRandomThing() {
  return {
    name: faker.commerce.product(),
    ranking: 1,
    userId: Math.ceil(Math.random() * 10)
  };
}

Array.from({ length: 10 }).forEach(() => USERS.push(createRandomUser()));
Array.from({ length: 20 }).forEach(() => THINGS.push(createRandomThing()));

module.exports = { USERS, THINGS, createRandomThing, createRandomUser };