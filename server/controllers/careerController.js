import careerService from '../services/careerService.js';


const careersController = {
  async getICI(req, res) {
    try {
      const subjects = await careerService.getSubjectsByCareer('ICI');
      res.json(subjects);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async getICCI(req, res) {
    try {
      const subjects = await careerService.getSubjectsByCareer('ICCI');
      res.json(subjects);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async getICM(req, res) {
    try {
      const subjects = await careerService.getSubjectsByCareer('ICM');
      res.json(subjects);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export default careersController;

