import { Telegraf } from 'telegraf'
import 'dotenv/config'
import { createPool } from 'mysql2';

const ENV = process.env;
const bot = new Telegraf(ENV.TOKEN)
const conn = createPool({
    host: ENV.DB_HOST,
    port: ENV.DB_PORT,
    user: ENV.DB_USER,
    password: ENV.DB_PASS,
    database: ENV.DB_NAME,
    connectionLimit: 150
})
const group_id = ENV.GROUP_ID;

export { bot, ENV, conn, group_id}
