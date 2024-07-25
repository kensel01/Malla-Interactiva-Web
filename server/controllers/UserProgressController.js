import UserCareer from '../models/UserCareer.js';
import {Career} from '../models/ModelMalla.js'; 
import careerService from '../services/careerService.js';

const userCareerController = {

  async checkUserCareer(req, res) {
    try {
      const carreras = await careerService.generarCarreras();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export default userCareerController;