// tableu contenant les types de pokemon accepté
const validTypes = [
  "Plante",
  "Poison",
  "Feu",
  "Eau",
  "Insecte",
  "Vol",
  "Normal",
  "Electrik",
  "Fée",
];
module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Pokemon",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "le nom est deja pris",
        },
        validate: {
          notEmpty: {
            msg: "Le nom du pokemon ne doit pas être vide",
          },
          notNull: {
            msg: "Le nom du pokemon est une propriété requise.",
          },
        },
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: "Utilisez uniquement des nombres entiers pour les points de vie",
          },
          notNull: {
            msg: "Les points de vie sont une propriété requise.",
          },
          min: {
            args: [0],
            msg: "Le point de vie doit être superieur ou egal à 0",
          },
          max: {
            args: [999],
            msg: "le point de vie doit être inferieur ou egal a 999",
          },
        },
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: "Utilisez uniquement des nombres entiers pour les points degats",
          },
          notNull: {
            msg: "Les points de degats est une propriété requise.",
          },
          min: {
            args: [0],
            msg: "Le point de degat doit être superieur ou egal à 0",
          },
          max: {
            args: [99],
            msg: "le point de degat doit être inferieur ou egal à 99",
          },
        },
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: {
            msg: "L'url doit être au format URL",
          },
          notNull: {
            msg: "Le champ du pokemon est une propriété requise.",
          },
        },
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          return this.getDataValue("types").split(",");
        },
        set(types) {
          this.setDataValue("types", types.join());
        },
        validate: {
          // validateur personnalisé
          isTypeValid(value) {
            if (!value) {
              throw new Error("Un pokemon doit au moins avoir un type.");
            }
            if (value.split(",").length > 3) {
              throw new Error("Un pokemon ne peut pas avoir plus de 3 types");
            }
            value.split(",").forEach((typess) => {
              if (!validTypes.includes(typess)) {
                throw new Error(
                  `Le type d'un pokemon doit appartenir à la liste suivante:  ${validTypes}`
                );
              }
            });
          },
        },
      },
    },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: false,
    }
  );
};
