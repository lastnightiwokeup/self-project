"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import morgan from 'morgan';
// import helmet from 'helmet';
const budgetItem_1 = __importDefault(require("../routes/controllers/api/budgetItem"));
const expressApp = (0, express_1.default)();
expressApp.use(express_1.default.json());
expressApp.use(express_1.default.urlencoded({ extended: false }));
// Handle API requests
expressApp.use('/api/budgetItem', budgetItem_1.default);
const port = 3306; // Example port number
expressApp.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
exports.default = expressApp;
//# sourceMappingURL=app.js.map