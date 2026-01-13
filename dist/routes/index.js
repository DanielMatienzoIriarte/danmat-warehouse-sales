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
const sales_routes_1 = __importDefault(require("./sales_routes"));
const router = express_1.default.Router();
//Landpage
router.get('/', (request, response) => {
  response.json({
    status: 'success',
    content: 'Poin Of Sale'
  });
});
router.use('/sales', sales_routes_1.default);
exports.default = router;