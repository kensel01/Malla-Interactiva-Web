import express from 'express';
import authorize from '../middleware/authorize.js';
import subjectController from '../controllers/subjectControlles.js';

const router = express.Router();
router.get('/:id', subjectController.getSubjectById);
router.post('/', subjectController.createSubject);
router.put('/:id', subjectController.updateSubject);
router.get('/by/semester', subjectController.getSubjectsBySemester);
router.get('/semestres/:carreraId',subjectController.getSemestresByCarrera);

export default  router;