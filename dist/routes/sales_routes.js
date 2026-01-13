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
const authorization_controller_1 = __importDefault(require("../controller/authorization_controller"));
const salesRouter = (0, express_1.default)();
const authorizationController = new authorization_controller_1.default();
salesRouter.post('/login', authorizationController.login);
exports.default = salesRouter;