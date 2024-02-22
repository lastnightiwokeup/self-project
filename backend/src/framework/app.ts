import express from 'express';
// import morgan from 'morgan';
// import helmet from 'helmet';

import budgetItemRouter from '../expense_tracker/routes/controllers/api/budgetItem'


const expressApp = express();


expressApp.use(express.json());
expressApp.use(express.urlencoded({ extended: false }));

// Handle API requests
expressApp.use('/api/ping', budgetItemRouter);

export default expressApp;
