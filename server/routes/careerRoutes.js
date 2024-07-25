import express from 'express';
import careerController from '../controllers/careerController.js';

const router = express.Router();

// En tu archivo de rutas, por ejemplo, careerRoutes.js
router.post('/updateAsignaturaState', async (req, res) => {
    const { userId, asignaturaId, nuevoEstado } = req.body;
    try {
      const success = await careerService.updateAsignaturaState(userId, asignaturaId, nuevoEstado);
      if (success) {
        res.status(200).send({ message: 'Estado actualizado correctamente' });
      } else {
        res.status(400).send({ message: 'No se pudo actualizar el estado' });
      }
    } catch (error) {
      res.status(500).send({ message: 'Error al actualizar el estado', error: error.message });
    }
  });


export default router;

