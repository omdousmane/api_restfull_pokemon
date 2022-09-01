// impportation des moduls installés
const express = require("express");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const sequelize = require("./src/db/sequelize");

const app = express();
// definition du port en la production et en local
const port = process.env.PORT || 3000;

// moiddlewares installé
app.use(favicon("./favicon.ico")).use(bodyParser.json());

// appelle de la fonction initdb depuis le module sequelize
sequelize.initDb();

app.get("/", (req, res) => {
  res.json("Hello, Mamabou Bobo Comment vas tu?");
});

// ici, nous placerons les futures terminaison
require("./src/routes/findAllPokemon")(app);
require("./src/routes/fndPokemonByPk")(app);
require("./src/routes/createPokemon")(app);
require("./src/routes/updatePokemon")(app);
require("./src/routes/deletePokemon")(app);
require("./src/routes/login")(app);

// on ajoute une gestion des erreurs 404
app.use(({ req, res }) => {
  const message =
    "impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL";
  res.status(404).json({ message });
});

// lancement du serveur node avec l'ecoute du port
app.listen(port, () =>
  console.log(`notre application web est demarrer: http://localhost:${port}`)
);
