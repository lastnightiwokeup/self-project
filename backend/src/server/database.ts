import { Sequelize, Options, DATE } from 'sequelize';

DATE.prototype._stringify = function (date: any, options: any) {
    date = this._applyTimezone(date, options);
  
    // Z here means current timezone, _not_ UTC
    // return date.format('YYYY-MM-DD HH:mm:ss.SSS Z');
    return date.format('YYYY-MM-DD HH:mm:ss');
  };
  
const sequelize = new Sequelize(
  'postgres', 'postgres.efvnknssaqlxdtprdifs', process.env.DB_PASSWORD, {
    logging: console.log,
    host: process.env.DB_HOST,
    dialect: 'postgres'
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


export { sequelize };