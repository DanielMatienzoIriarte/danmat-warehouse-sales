"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const typeorm_1 = require("typeorm");
const config_1 = __importDefault(require("./config"));
const init_seeder_1 = __importDefault(require("../database/seeders/init.seeder"));
const options = {
  type: 'postgres',
  host: config_1.default.POSTGRES_HOST,
  port: config_1.default.POSTGRES_PORT,
  username: config_1.default.POSTGRES_USERNAME,
  password: config_1.default.POSTGRES_PASSWORD,
  database: config_1.default.POSTGRES_DB,
  synchronize: false,
  logging: true,
  entities: (0, typeorm_1.getMetadataArgsStorage)().tables.map(tbl => tbl.target),
  migrations: ['../database/migrations/*{.ts,.js}'],
  seeds: [init_seeder_1.default]
};
exports.default = new typeorm_1.DataSource(options);