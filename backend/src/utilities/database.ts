import express, { Request, Response } from 'express';
import { Sequelize, Options, DATE } from 'sequelize';

const app = express();
const port = 8000;
const table = 'budgetitem';

// Override timezone formatting
DATE.prototype._stringify = function (date: any, options: any) {
  date = this._applyTimezone(date, options);

  // Z here means current timezone, _not_ UTC
  // return date.format('YYYY-MM-DD HH:mm:ss.SSS Z');
  return date.format('YYYY-MM-DD HH:mm:ss');
};

const sequelize = new Sequelize('budget_tracker', 'root', 'admin1234', {
  dialect: 'mysql',
  host: 'localhost',
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection();

app.listen(port, () => {
  console.log(`App server now listening to port ${port}`);
});

app.get('/api/users', async (req: Request, res: Response) => {
  try {
    const users = await sequelize.query(`SELECT * FROM ${table}`);
    res.send(users);
  } catch (err) {
    res.send(err);
  }
});

export { sequelize };