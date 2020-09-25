// Update with your config settings.
import * as dotenv from 'dotenv'

dotenv.config({ path: __dirname + '/.env' });
export default {
  client: 'oracledb',
  connection: {
    database: process.env.DB_DBNAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
  },
  pool: {
    min: 2,
    max: 10
  },


};
