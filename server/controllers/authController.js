import { registerUser, loginUser, getUserDataById } from '../services/authService.js';

async function handleRegister(req, res) {
    const { email, name, password } = req.body;
    try {
        const result = await registerUser(email, name, password);
        res.json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

async function handleLogin(req, res) {
    const { email, password } = req.body;
    try {
        const result = await loginUser(email, password);
        res.json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

async function handleGetUserDataById(req, res) {
    const userId = req.params.userId;
    try {
        const userData = await getUserDataById(userId);
        res.json(userData);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export { handleRegister, handleLogin, handleGetUserDataById };
