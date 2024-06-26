"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
sequelize_1.DATE.prototype._stringify = function (date, options) {
    date = this._applyTimezone(date, options);
    // Z here means current timezone, _not_ UTC
    // return date.format('YYYY-MM-DD HH:mm:ss.SSS Z');
    return date.format('YYYY-MM-DD HH:mm:ss');
};
const sequelize = new sequelize_1.Sequelize('postgres', 'postgres.efvnknssaqlxdtprdifs', process.env.DB_PASSWORD, {
    logging: console.log,
    host: process.env.DB_HOST,
    dialect: 'postgres'
});
exports.sequelize = sequelize;
sequelize
    .authenticate()
    .then(() => {
    console.log('Connection has been established successfully.');
})
    .catch(err => {
    console.error('Unable to connect to the database:', err);
});
// import { Sequelize, Options, DATE } from 'sequelize';
// DATE.prototype._stringify = function (date: any, options: any) {
//     date = this._applyTimezone(date, options);
//     // Z here means current timezone, _not_ UTC
//     // return date.format('YYYY-MM-DD HH:mm:ss.SSS Z');
//     return date.format('YYYY-MM-DD HH:mm:ss');
//   };
// const sequelize = new Sequelize(
//     'budget_tracker', 'root', 'Lauren0627', {
//     logging: console.log,
//     host: 'localhost',
//     dialect: 'mysql'
// });
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });
//   export { sequelize };
//# sourceMappingURL=database.js.map