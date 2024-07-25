import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import jwtAuthRouter from './routes/jwtAuth.js';
import dashboardRouter from './routes/dashboard.js';
import careerRoutes from './routes/careerRoutes.js';
import subjectRoutes from './routes/subjectRoutes.js';
import userProgressRoutes from './routes/userProgressRoutes.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

// Importación de rutas
app.use("/authentication", jwtAuthRouter);
app.use("/dashboard", dashboardRouter);
app.use('/careers', careerRoutes);
app.use('/subjects', subjectRoutes);
app.use('/progress',userProgressRoutes);


app.listen(5000, () => {
  console.log(`Server is starting on port 5000`);
});
