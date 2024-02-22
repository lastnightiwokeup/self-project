import { Sequelize, Options, DATE } from 'sequelize';


// Override timezone formatting
DATE.prototype._stringify = function (date: any, options: any) {
    date = this._applyTimezone(date, options);

    // Z here means current timezone, _not_ UTC
    // return date.format('YYYY-MM-DD HH:mm:ss.SSS Z');
    return date.format('YYYY-MM-DD HH:mm:ss');
};

// TODO: Timezone?
const sequelize = new Sequelize(
    //   config.DB_DB,
    //   config.DB_USER,
    //   config.DB_PASSWORD,
    'budget_tracker',
    'root',
    'admin1234',
    {
        dialect: 'mysql',
        host: 'localhost',
    }
    
);

async function testConnection() {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }
  
  testConnection();

export { sequelize };