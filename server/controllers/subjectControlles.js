import subjectService from '../services/subjectsService.js';

   const subjectController = {
     async getSubjectById(req, res) {
       try {
         const subject = await subjectService.getSubjectById(req.params.id);
         if (!subject) {
           return res.status(404).json({ message: 'Subject not found' });
         }
         res.json(subject);
       } catch (error) {
         res.status(500).json({ message: error.message });
       }
     },

     async createSubject(req, res) {
       try {
         const newSubject = await subjectService.createSubject(req.body);
         res.status(201).json(newSubject);
       } catch (error) {
         res.status(400).json({ message: error.message });
       }
     },

     async updateSubject(req, res) {
       try {
         const success = await subjectService.updateSubject(req.params.id, req.body);
         if (!success) {
           return res.status(404).json({ message: 'Subject not found' });
         }
         res.json({ message: 'Subject updated' });
       } catch (error) {
         res.status(400).json({ message: error.message });
       }
     },

     async getSubjectsBySemester(req, res) {
      try {
        const subjectsBySemester = await subjectService.getSubjectsBySemester();
        res.json(subjectsBySemester);
      } catch (error) {
        console.error("Error fetching subjects by semester:", error);
        res.status(500).json({ message: "Internal Server Error. Please try again later." });
      }
    },

    async getSemestresByCarrera(req, res) { 
      
      const header = req.headers;
      const userid = header.userid;
      const token = header.authorization;
      if (!userid || !token) {
        return res.status(401).json({ message: "Usuario no autenticado" });
      }
    
      const carreraId = header.carreerid;
      const userId = userid;
    
      try {
        const semestres = await subjectService.getSemestresByCarreraId(carreraId, userId);
        res.json(semestres);
      } catch (error) {
        console.error("Error al obtener semestres por carrera:", error);
        res.status(500).json({ message: error.message });
      }
    }
   };
   

   export default subjectController;
 
 
 