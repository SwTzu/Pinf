require('dotenv').config();

const RUN_PORT = process.env.RUN_PORT || 8080;
const NODE_ENV = process.env.NODE_ENV;

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const DB_DIALECT = process.env.DB_DIALECT;
const DB_POOL_MAX = parseInt(process.env.DB_POOL_MAX, 10);
const DB_POOL_MIN = parseInt(process.env.DB_POOL_MIN, 10);
const DB_POOL_ACQUIRE = parseInt(process.env.DB_POOL_ACQUIRE, 10);
const DB_POOL_IDLE = parseInt(process.env.DB_POOL_IDLE, 10);

const JWT_SECRET = process.env.JWT_SECRET;
const MAIL_USER = process.env.MAIL_USER;
const PASS_USER = process.env.PASS_USER;



module.exports = {
    RUN_PORT,
    NODE_ENV,
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    DB_DIALECT,
    DB_POOL_MAX,
    DB_POOL_MIN,
    DB_POOL_ACQUIRE,
    DB_POOL_IDLE,
    JWT_SECRET,
    MAIL_USER,
    PASS_USER
}
