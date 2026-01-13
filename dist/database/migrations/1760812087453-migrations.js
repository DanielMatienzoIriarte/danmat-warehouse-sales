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
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Migrations1760812087453 = void 0;
class Migrations1760812087453 {
  constructor() {
    this.name = 'Migrations1760812087453';
  }
  up(queryRunner) {
    return __awaiter(this, void 0, void 0, function* () {
      yield queryRunner.query(`CREATE TABLE "user_auth_token" ("user_id" uuid NOT NULL, "jwt_token" character varying NOT NULL, CONSTRAINT "PK_e4dbc40e1c38f1497e0de9d1670" PRIMARY KEY ("user_id")); COMMENT ON COLUMN "user_auth_token"."user_id" IS 'ID of the associated user.'; COMMENT ON COLUMN "user_auth_token"."jwt_token" IS 'User token'`);
      yield queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(128) NOT NULL, "password" character varying(64) NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "updated_on" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")); COMMENT ON COLUMN "user"."email" IS 'Email address of the user.'; COMMENT ON COLUMN "user"."password" IS 'Password of the user.'; COMMENT ON COLUMN "user"."is_active" IS 'Flag indicating if the state of the user is active.'; COMMENT ON COLUMN "user"."updated_on" IS 'Date of the update of the user.'`);
      yield queryRunner.query(`ALTER TABLE "user_auth_token" ADD CONSTRAINT "FK_e4dbc40e1c38f1497e0de9d1670" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    });
  }
  down(queryRunner) {
    return __awaiter(this, void 0, void 0, function* () {
      yield queryRunner.query(`ALTER TABLE "user_auth_token" DROP CONSTRAINT "FK_e4dbc40e1c38f1497e0de9d1670"`);
      yield queryRunner.query(`DROP TABLE "user"`);
      yield queryRunner.query(`DROP TABLE "user_auth_token"`);
    });
  }
}
exports.Migrations1760812087453 = Migrations1760812087453;