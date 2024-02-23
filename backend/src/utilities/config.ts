
/**
 * dotenv .env file import
 * TODO: Configure NODE_ENV in .env file, and set default to 'production'
 */
import dotenv from 'dotenv';

dotenv.config({ path: process.env.DOTENV_CONFIG_PATH });
process.env.NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'production';

const NODE_ENV: string = process.env.NODE_ENV || 'production';
const LOGGING_LEVEL: string = process.env.LOGGING_LEVEL || 'info';
// const REACT_APP_VCARD_URL: string = process.env.REACT_APP_VCARD_URL;
const TIMEZONE = "Asia/Hong_Kong"

const HTTP_LISTEN_PORT: string | number = normalizePort(process.env.HTTP_LISTEN_PORT !== undefined ? process.env.HTTP_LISTEN_PORT : '') || 3000;
const SESSION_TIMEOUT: number = Number.parseInt(process.env.SESSION_TIMEOUT || '1800', 10);


// const DB_DRIVER: string = process.env.DB_DRIVER;
// const DB_SERVER: string = process.env.DB_SERVER;
// const DB_USER: string = process.env.DB_USER;
// const DB_PASSWORD: string = process.env.DB_PASSWORD;
// const DB_PORT: number = Number.parseInt(process.env.DB_PORT, 10);
// const DB_DB: string = process.env.DB_DB;
// const APP_URL: string = process.env.APP_URL;
/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val: string) {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        // named pipe
        return val;
    }
    if (port >= 0) {
        // port number
        return port;
    }
    return false;
}

export default {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "admin1234",
    DB: "budget_tracker"
  };

export {
    NODE_ENV,
    LOGGING_LEVEL,
    //   REACT_APP_VCARD_URL,
    HTTP_LISTEN_PORT,
    SESSION_TIMEOUT,
    //   DB_DRIVER,
    //   DB_SERVER,
    //   DB_USER,
    //   DB_PASSWORD,
    //   DB_PORT,
    //   DB_DB,
    //   APP_URL,
    TIMEZONE
};
