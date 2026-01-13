"use strict";

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_status_codes_1 = require("http-status-codes");
const general_error_1 = __importDefault(require("../helpers/general_error"));
const config_1 = __importDefault(require("../config/config"));
const jwtSecret = config_1.default.SECRET_KEY;
const authorization = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
  const authorization = request.headers.authorization;
  if (!authorization) {
    return next(new general_error_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Unouthorizaed Access"));
  }
  const [, token] = authorization.split('');
  try {
    const decodedToken = jsonwebtoken_1.default.verify(token, jwtSecret);
    request.user = {
      id: decodedToken.id,
      email: '',
      password: '',
      is_active: true
    };
    return next();
  } catch (error) {
    return next(new general_error_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Unouthorizaed Access"));
  }
});
exports.default = authorization;