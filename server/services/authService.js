import bcrypt from 'bcrypt';
import pool from '../dbuser.js';
import jwtGenerator from '../utils/jwtGenerator.js';
import userModel from '../models/userModel.js';
import careerService from '../services/careerService.js';
import { getDB } from '../dbMongo.js';  

async function registerUser(email, name, password) {
    try {
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (user.rows.length > 0) {
            throw new Error("User already exists!");
        }
        const salt = await bcrypt.genSalt(10);
        const bcryptPassword = await bcrypt.hash(password, salt);
        const newUser = await pool.query(
            "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
            [name, email, bcryptPassword]
        );
        const jwtToken = jwtGenerator(newUser.rows[0].user_id);
        const User = userModel.User;
        const db = await getDB();
        const carreras = await careerService.generarCarreras();
        const userS = new User({user_id: newUser.rows[0].user_id, progress: carreras});

        try {
            const result = await db.collection('usercareers').insertOne(userS);
            console.log("Insertado en MongoDB:", result);
        } catch (mongoErr) {
            console.error("Error al insertar en MongoDB:", mongoErr);
            throw mongoErr;  
        }
        return { jwtToken };
    } catch (err) {
        console.error("Error en registerUser:", err);
        throw err;
    }
}

async function loginUser(email, password) {
    try {
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (user.rows.length === 0) {
            throw new Error("Invalid Credentials");
        }
        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!validPassword) {
            throw new Error("Invalid Credentials");
        }
        const jwtToken = jwtGenerator(user.rows[0].user_id);
        return { jwtToken };
    } catch (err) {
        throw err;
    }
}

async function getUserDataById(userId) {
    try {
        const userData = await pool.query("SELECT * FROM users WHERE user_id = $1", [userId]);
        if (userData.rows.length === 0) {
            throw new Error("User not found");
        }
        return userData.rows[0];
    } catch (err) {
        throw err;
    }
}

export { registerUser, loginUser, getUserDataById };
