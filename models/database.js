const Sequelize = require("Sequelize");
const env = process.env.NODE_ENV || "development";
const UserModel = require("./UserModel").UserModel;

let serielize;

if (env !== "production") {
  serielize = new Sequelize(
    process.env.DATABASE,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
      dialect: "postgres",
      logging: false,
    }
  );
} else {
  serielize = new Sequelize(process.env.DATABASE_URL);
}

// authenticate db
serielize
  .authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error:" + err));

const User = UserModel(serielize, Sequelize);
module.exports = { serielize, Sequelize, User };
