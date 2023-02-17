import { Sequelize } from "sequelize";

const db = new Sequelize("register", "root", "", {
  host: "localhost",
  dialect: "mysql",
  //logging:false
});

export default db;
