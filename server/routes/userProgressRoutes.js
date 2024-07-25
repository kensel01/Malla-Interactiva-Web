import express from 'express';
import userCareerController from '../controllers/UserProgressController.js';
const router = express.Router();

router.get('/checkUserCareer',  userCareerController.checkUserCareer);

export default router;