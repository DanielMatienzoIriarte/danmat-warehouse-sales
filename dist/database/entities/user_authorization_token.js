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
const user_1 = __importDefault(require("./user"));
let UserAuthToken = class UserAuthToken {};
__decorate([(0, typeorm_1.PrimaryColumn)('uuid', {
  type: 'varchar',
  unique: true,
  nullable: false,
  comment: 'ID of the associated user.'
}), __metadata("design:type", String)], UserAuthToken.prototype, "user_id", void 0);
__decorate([(0, typeorm_1.Column)({
  type: 'varchar',
  name: 'jwt_token',
  comment: 'User token'
}), __metadata("design:type", String)], UserAuthToken.prototype, "jwtToken", void 0);
__decorate([(0, typeorm_1.OneToOne)(() => user_1.default, user => user.userAuthToken), (0, typeorm_1.JoinColumn)({
  name: 'user_id'
}), __metadata("design:type", user_1.default)], UserAuthToken.prototype, "user", void 0);
UserAuthToken = __decorate([(0, typeorm_1.Entity)('user_auth_token')], UserAuthToken);
exports.default = UserAuthToken;