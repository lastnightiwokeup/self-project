"use strict";
// import express, { Request, Response } from 'express';
// import mysql2 from 'mysql2/promise';
// import cors from 'cors';
// import budgetItemRouter from './budget_tracker/routes/controllers/api/budgetItem';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const app = express();
// const db = mysql2.createPool({
//   host: "localhost",
//   user: "root",
//   password: "Lauren0627",
//   database: "budget_tracker",
// });
// // to send from html body
// app.use(express.json());
// app.use(cors());
// app.use('/api/budgetItem', budgetItemRouter);
// app.listen(8080, () => {
//   console.log("Connect to backend.");
// });
const express_1 = __importDefault(require("express"));
const pg_1 = require("pg");
const cors_1 = __importDefault(require("cors"));
const budgetItem_1 = __importDefault(require("./budget_tracker/routes/controllers/api/budgetItem"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const pool = new pg_1.Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});
// to send from html body
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api/budgetItem', budgetItem_1.default);
app.listen(8080, () => {
    console.log("Connect to backend.");
});
//# sourceMappingURL=index.js.map