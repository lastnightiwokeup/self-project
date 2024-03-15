import { Sequelize, Options, DATE } from 'sequelize';

DATE.prototype._stringify = function (date: any, options: any) {
    date = this._applyTimezone(date, options);
  
    // Z here means current timezone, _not_ UTC
    // return date.format('YYYY-MM-DD HH:mm:ss.SSS Z');
    return date.format('YYYY-MM-DD HH:mm:ss');
  };
  
const sequelize = new Sequelize(
    'budget_tracker', 'root', 'Lauren0627', {
    host: 'localhost',
    dialect: 'mysql'
});

export { sequelize };