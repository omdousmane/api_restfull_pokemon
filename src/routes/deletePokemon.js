const { Pokemon } = require("../db/sequelize");
// inclusion du token de connection
const auth = require("../auth/auth");

module.exports = (app) => {
  app.delete("/api/pokemons/:id", auth, (req, res) => {
    Pokemon.findByPk(req.params.id)
      .then((pokemon) => {
        if (pokemon === null) {
          const message =
            "Le pokemons demandé n'existe pas. Reesayer dans quelques instant";
          return res.status(404).json({ message, data: error });
        }
        const pokemonDeleted = pokemon;
        return Pokemon.destroy({
          where: { id: pokemon.id },
        }).then((_) => {
          const message = `Le pokémon avec l'identifiant n°${pokemonDeleted.id} a bien été supprimé.`;
          res.json({ message, data: pokemonDeleted });
        });
      })
      .catch((error) => {
        const message =
          "La liste des pokemons n'a pas été supprimé. Reesayer dans quelques instant";
        res.status(500).json({ message, data: error });
      });
  });
};
