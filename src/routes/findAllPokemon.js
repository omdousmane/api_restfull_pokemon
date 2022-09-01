const pokemons = require("../db/mock-pokemon");
const { Pokemon } = require("../db/sequelize");
// inclusion du token de connection
const auth = require("../auth/auth");

// les operateurs sequelize
const { Op } = require("sequelize");

module.exports = (app) => {
  app.get("/api/pokemons", auth, (req, res) => {
    // rechercher un pokemon par son nom dans l'URL
    if (req.query.name) {
      const name = req.query.name;
      const limit = parseInt(req.query.limit) || 5;

      if (name.lenght < 2) {
        const message = `Le terme de recherche doit contenir au minimum 2 carctères`;
        return res.status(400).json({ message });
      }

      return Pokemon.findAndCountAll({
        where: {
          // name est la propriété du modèle pokemon
          name: {
            [Op.like]: `%${name}%`, // est le critère de recherche
          },
        },
        order: ["name"],
        limit: limit,
      }).then(({ count, rows }) => {
        const message = `Il y a ${count} pokemon dans le pokedex qui correspond au terme de recherche ${name}`;
        res.json({ message, data: rows });
      });
    } else {
      Pokemon.findAll({ order: ["name"] })
        .then((pokemons) => {
          const message = "La liste des pokémons a bien été récupérée.";
          res.json({ message, data: pokemons });
        })
        .catch((error) => {
          const message =
            "La liste des pokemons n'a pas été récuperée. Reesayer dans quelques instant";
          res.status(500).json({ message, data: error });
        });
    }
  });
};
