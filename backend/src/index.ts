import express, { Request, Response } from 'express';
import mysql2 from 'mysql2/promise';
import cors from 'cors';
import budgetItemRouter from './budget_tracker/routes/controllers/api/budgetItem';

const app = express();

const db = mysql2.createPool({
  host: "localhost",
  user: "root",
  password: "Lauren0627",
  database: "budget_tracker",
});

// to send from html body
app.use(express.json());
app.use(cors());
app.use('/api/budgetItem', budgetItemRouter);

app.listen(8080, () => {
  console.log("Connect to backend.");
});
