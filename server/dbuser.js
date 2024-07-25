import pkg from "pg";
const {Pool}= pkg;

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "1234",
  port: 5432,
  database: "registrouser"
});

export default pool;