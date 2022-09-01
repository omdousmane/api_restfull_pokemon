const { Pokemon } = require("../db/sequelize");
const { ValidationError, UniqueConstraintError } = require("sequelize");
// inclusion du token de connection
const auth = require("../auth/auth");

module.exports = (app) => {
  app.put("/api/pokemons/:id", auth, (req, res) => {
    const id = req.params.id;
    Pokemon.update(req.body, {
      where: { id: id },
    })
      .then((_) => {
        return Pokemon.findByPk(id).then((pokemon) => {
          if (pokemon === null) {
            const message = `Le pokemon ${pokemon.name} est introuvable ou n'existe pas. Reesayer dans quelques instant`;
            return res.status(404).json({ message, data: error });
          }
          const message = `Le pokémon ${pokemon.name} a bien été modifié.`;
          res.json({ message, data: pokemon });
        });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        if (error instanceof UniqueConstraintError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        const message =
          "La liste des pokemons n'a pas été récuperée. Reesayer dans quelques instant";
        res.status(500).json({ message, data: error });
      });
  });
};
