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
const http_status_codes_1 = require("http-status-codes");
const general_error_1 = __importDefault(require("../helpers/general_error"));
const user_repository_1 = __importDefault(require("../database/repositories/user_repository"));
const jwt_service_1 = __importDefault(require("../service/jwt_service"));
const COOKIE_EXPIRATION_DAYS = 3;
const expirationDate = new Date(Date.now() + COOKIE_EXPIRATION_DAYS * 24 * 60 * 60 * 1000);
const cookieOptions = {
  expires: expirationDate,
  secure: false,
  httpOnly: true
};
class AuthorizationController {
  constructor() {
    /**
     *
     * @param request Request
     * @param response Response
     * @returns Promise<Response<any, Record<string, any>>>
     */
    this.login = (request, response) => __awaiter(this, void 0, void 0, function* () {
      try {
        const {
          email,
          password
        } = request.body;
        const user = yield this.userRepository.findOne(email, password);
        if (!request.body) {
          return response.json({
            status: http_status_codes_1.StatusCodes.BAD_REQUEST,
            message: 'Bad Request'
          });
        }
        if (!user) {
          throw new general_error_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'Incorrect Credentials');
        }
        this.createCookie(user, response);
        return response.json({
          status: http_status_codes_1.StatusCodes.OK,
          message: 'User logged in successfully'
        });
      } catch (error) {
        return response.json({
          status: http_status_codes_1.StatusCodes.FORBIDDEN,
          message: error.message
        });
      }
    });
    this.userRepository = new user_repository_1.default();
    this.jwtService = new jwt_service_1.default();
  }
  /**
   * Creates a cookie carrying a JWT and adds it to the response.
   * @param user IUser
   * @param response Response
   */
  createCookie(user, response) {
    const token = this.jwtService.createToken(user);
    response.cookie('jwt', token, cookieOptions);
  }
}
exports.default = AuthorizationController;