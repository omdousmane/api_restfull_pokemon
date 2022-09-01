// importation des modules crée par nos soins
let pokemons = require("./src/db/mock-pokemon");
const { success, getUniqueId } = require("./helper");

// les middlewares logger crée manuelement
// app.use((req, res, next) => {
//   console.log(`URL : ${req.url}`);
//   next();
// });

// creation des routes endpoint
app.get("/", (req, res) => res.send("bonjour diallo ousmane"));
app.get("/api/pokemons/:id", (req, res) => {
  //recuperer un parametre de l'url
  const id = Number(req.params.id);
  const pokemon = pokemons.find((pokemon) => pokemon.id === id);
  const message = "un pokemon dans le pokebox";
  res.json(success(message, pokemon));
});

// recuperations de tout les pokemons
app.get("/api/pokemons", (req, res) => {
  message = "la liste de tout les pokemoms dans le pokedesx";
  res.json(success(message, pokemons));
});

// ajout d'un pokemon dans le pokebex
app.post("/api/pokemons", (req, res) => {
  const id = getUniqueId(pokemons);
  // const id = 123;
  const pokemonCreated = { ...req.body, ...{ id: id, created: new Date() } };
  pokemons.push(pokemonCreated);
  const message = `Le pokémon ${pokemonCreated.name} a bien été crée.`;
  res.json(success(message, pokemonCreated));
});

// Modifier un element dans le pokebex
app.put("/api/pokemons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pokemonUpdated = { ...req.body, id: id };
  pokemons = pokemons.map((pokemon) => {
    return pokemon.id === id ? pokemonUpdated : pokemon;
  });
  const message = `la mise à jour du pokemon ${pokemonUpdated.name} a été effectué`;
  res.json(success(message, pokemons));
});
// suppression d'un pokemon
app.delete("/api/pokemons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pokemomIdDeleted = pokemons.find((pokemon) => pokemon.id === id);
  pokemons.filter((pokemon) => pokemon.id !== id);
  const message = `le pokemon ${pokemomIdDeleted.name} a été supprimer.`;
  res.json(success(message, pokemomIdDeleted));
});
