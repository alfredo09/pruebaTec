"use strict";

const debug = require("debug")("mod:db:setup");
//const inquirer = require("inquirer");
//const chalk = require("chalk");
const minimist = require("minimist");
const db = require("./");

const args = minimist(process.argv);
//const prompt = inquirer.createPromptModule();

async function setup() {
  const config = {
    database: process.env.DB_NAME || "pruebatec",
    username: process.env.DB_USER || "pruebatec",
    password: process.env.DB_PASS || "pruebatec",
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
    logging: (s) => debug(s),
    setup: true,
  };

  await db(config).catch(handleFatalError);

  console.log("Exito!");
  process.exit(0);
}

function handleFatalError(err) {
  //console.error(`${chalk.red("[fatal error]")} ${err.message}`);
  console.error(err.stack);
  process.exit(1);
}
setup();