const { Sequelize, DataTypes } = require("sequelize");
const pokemonModel = require("../models/pokemon");
const userModel = require("../models/user");
const pokemons = require("./mock-pokemon");
const bcrypt = require("bcrypt");

// création de la connexion a la base de donnée
const sequelize = new Sequelize("pokedex", "root", "", {
  host: "localhost",
  dialect: "mariadb",
  dialectOptions: {
    timezone: "Etc/GMT-2",
  },
  logging: true,
});

const Pokemon = pokemonModel(sequelize, DataTypes);
const User = userModel(sequelize, DataTypes);

const initDb = () => {
  return sequelize.sync({ force: true }).then((_) => {
    pokemons.map((pokemon) => {
      Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        picture: pokemon.picture,
        types: pokemon.types,
      }).then((pokemon) => console.log(pokemon.toJSON()));
    });
    bcrypt.hash("ousmane", 10).then((hash) => {
      User.create({
        username: "ousmane",
        password: hash,
      }).then((user) => console.log(user.toJSON()));
    });

    console.log("La base de donnée pokedex a bien été initialisée");
  });
};
module.exports = {
  initDb,
  Pokemon,
  User,
};
