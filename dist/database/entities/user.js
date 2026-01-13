"use strict";

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
    r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
    d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = this && this.__metadata || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
const typeorm_1 = require("typeorm");
const base_entity_1 = __importDefault(require("./base_entity"));
const user_authorization_token_1 = __importDefault(require("./user_authorization_token"));
let User = class User extends base_entity_1.default {};
__decorate([(0, typeorm_1.Column)({
  length: 128,
  nullable: false
}), __metadata("design:type", String)], User.prototype, "email", void 0);
__decorate([(0, typeorm_1.Column)({
  length: 64,
  nullable: false
}), __metadata("design:type", String)], User.prototype, "password", void 0);
__decorate([(0, typeorm_1.Column)({
  name: "is_active",
  default: true
}), __metadata("design:type", Boolean)], User.prototype, "is_active", void 0);
__decorate([(0, typeorm_1.OneToOne)(() => user_authorization_token_1.default, userAuthToken => userAuthToken.user), __metadata("design:type", user_authorization_token_1.default)], User.prototype, "userAuthToken", void 0);
User = __decorate([(0, typeorm_1.Entity)('user')], User);
exports.default = User;