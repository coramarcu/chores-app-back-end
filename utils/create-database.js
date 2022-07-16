const mysql = require("mysql2/promise");
const path = require("path");
const args = process.argv.slice(2)[0];
const envFile = args === "test" ? "../.env.test" : "../.env";
require("dotenv").config({ path: path.join(__dirname, envFile) });
const { DB_PASSWORD, DB_NAME, DB_USER, DB_HOST, DB_PORT } = process.env;

const setUpDatabase = async () => {
  try {
    const db = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      port: DB_PORT,
    });

    await db.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`);
    await db.query(`USE ${DB_NAME}`);
    await db.query(`CREATE TABLE IF NOT EXISTS Family(
      familyID INT PRIMARY KEY AUTO_INCREMENT,
      familyName VARCHAR(25) NOT NULL
     )`);

    await db.query(`CREATE TABLE IF NOT EXISTS User(
      userID INT PRIMARY KEY AUTO_INCREMENT,
      email VARCHAR(255) NOT NULL,
      name VARCHAR(25),
      role VARCHAR(25),
      familyID INT,
      FOREIGN KEY (familyID) REFERENCES Family(familyID),
      balance INT,
      amountRequested INT
     )`);

    await db.query(`CREATE TABLE IF NOT EXISTS Chores(
      choreID INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(25),
      price INT,
      status VARCHAR(25),
      familyID INT,
      FOREIGN KEY(familyID) REFERENCES Family(familyID),
      owner INT
     )`);

    db.close();
  } catch (err) {
    console.log(
      `Your environment variables might be wrong. Please double check .env file`
    );
    console.log("Environment Variables are:", {
      DB_PASSWORD,
      DB_NAME,
      DB_USER,
      DB_HOST,
      DB_PORT,
    });
    console.log(err);
  }
};

setUpDatabase();
