"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const config_1 = __importDefault(require("../config/config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtSecret = config_1.default.SECRET_KEY;
class JWTService {
  /**
   * @inheritdoc
   */
  createToken(user) {
    const {
      id
    } = user;
    const token = jsonwebtoken_1.default.sign({
      id
    }, jwtSecret, {
      expiresIn: '1d'
    });
    return token;
  }
}
;
exports.default = JWTService;