"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const configFile = '.env';
dotenv_1.default.config({
  path: path_1.default.resolve(__dirname, configFile)
});
const {
  SECRET_KEY,
  PORT,
  POSTGRES_DB,
  POSTGRES_USERNAME,
  POSTGRES_PASSWORD,
  POSTGRES_SYNC,
  POSTGRES_SSL
} = process.env;
const POSTGRES_HOST = process.env.POSTGRES_HOST || 'localhost';
const POSTGRES_PORT = parseInt(String(process.env.POSTGRES_PORT), 10) || 5440;
exports.default = {
  SECRET_KEY,
  PORT,
  POSTGRES_DB,
  POSTGRES_PORT,
  POSTGRES_HOST,
  POSTGRES_USERNAME,
  POSTGRES_PASSWORD,
  POSTGRES_SYNC,
  POSTGRES_SSL
};