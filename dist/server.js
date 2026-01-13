"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
//import cookieParser from "cookie-parser";
//import db from "./models/index.model.js";
const index_1 = __importDefault(require("./routes/index"));
const server = (0, express_1.default)();
const port = 30000;
var corsOptions = {
  origin: "http://localhost:30000",
  optionsSuccessStatus: 200
};
/*
db.sequelize.sync({force: false}).then(() => {
  console.log('Database connected successfully!');
}).catch((error: any) => {
  console.error('Unable to connect to the database: ', error);
});
*/
server.use((0, cors_1.default)(corsOptions));
server.use((0, morgan_1.default)('dev'));
server.use(body_parser_1.default.json());
server.use(body_parser_1.default.urlencoded({
  extended: true
}));
server.use(express_1.default.urlencoded({
  extended: true
}));
//server.use(cookieParser());
server.use(express_1.default.json());
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
server.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
/*
server.get('/', (rquest, response) => {
    response.send(`listening to port${port}`);
}); */
server.use('/', index_1.default);