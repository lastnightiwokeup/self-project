// import express, { Express, Request, Response } from "express";
// import dotenv from "dotenv";
// import mysql, { ConnectionOptions } from "mysql2";
// import config from "./config";
// import application from '../framework/app'
// import startServer from '../framework/http';

// dotenv.config();

// const app: Express = express();
// const port = process.env.PORT || 8080;

// // Create a new MySQL connection
// const access: ConnectionOptions = {
//   host: config.HOST,
//   user: config.USER,
//   password: config.PASSWORD,
//   database: config.DB
// };

// const conn = mysql.createConnection(access);

// // Connect to the MySQL database
// conn.connect((error) => {
//   if (error) {
//     console.error('Error connecting to MySQL database:', error);
//   } else {
//     console.log('Connected to MySQL database!');
//   }
// });

// app.get("/", (req: Request, res: Response) => {
//   res.send("Express + TypeScript Server");
// });

// app.listen(port, () => {
//   console.log(`[server]: Server is running at http://localhost:${port}`);
// });

// startServer(application);

// // Close the MySQL connection when the application is shutting down
// process.on('exit', () => {
//   conn.end();
// });