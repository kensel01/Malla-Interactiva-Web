import authorize from "../middleware/authorize.js";
import pool from "../dbuser.js";
import express from 'express';
const router = express.Router();


router.post("/", authorize, async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT name FROM users WHERE user_id = $1",
      [req.user.id] 
    ); 
    
    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

export default router;