const Sequelize = require("Sequelize");
const env = process.env.NODE_ENV || "development";
const UserModel = require("./UserModel").UserModel;

let serielize;

if (env !== "production") {
  sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
      dialect: "postgres",
      logging: false,
    }
  );
} else {
  sequelize = new Sequelize(process.env.DATABASE_URL);
}

// authenticate db
sequelize
  .authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error:" + err));

const User = UserModel(sequelize, Sequelize);
module.exports = { sequelize, Sequelize, User };
