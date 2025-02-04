import { Sequelize } from "sequelize";
import sequelize from "../config/config";
import User from "./user";

const db = {
  sequelize,
  Sequelize,
  User,
};

export default db;
