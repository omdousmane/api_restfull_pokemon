const { Pokemon } = require("../db/sequelize");
// inclusion du token de connection
const auth = require("../auth/auth");

module.exports = (app) => {
  app.get("/api/pokemons/:id", auth, (req, res) => {
    Pokemon.findByPk(req.params.id)
      .then((pokemon) => {
        if (pokemon === null) {
          const message =
            "Le pokemons demandé n'existe pas. Reesayer dans quelques instant";
          return res.status(404).json({ message, data: error });
        }
        const message = "Un pokémon a bien été trouvé.";
        res.json({ message, data: pokemon });
      })
      .catch((error) => {
        const message =
          "La liste des pokemons n'a pas été récuperée. Reesayer dans quelques instant";
        res.status(500).json({ message, data: error });
      });
  });
};
