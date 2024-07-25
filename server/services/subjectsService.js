import { ObjectId } from 'mongodb';  
import { Subject } from '../models/ModelMalla.js';
import { getDB } from '../dbMongo.js';  
import userModel from '../models/userModel.js';

const subjectService = {
  async getSubjectById(subjectId) {
    const db = await getDB();
    if (!ObjectId.isValid(subjectId)) {
      throw new Error('Invalid ID format');
    }
    return await db.collection('Subjects').findOne({ _id: new ObjectId(subjectId) });
  },

  async getSubjectsBySemester() {
    try {
      const subjectsBySemester = await Subject.aggregate([
        { $sort: { semestre: 1 } },
        { $group: { _id: "$semestre", subjects: { $push: "$$ROOT" } } },
        { $sort: { _id: 1 } }
      ]);
      return subjectsBySemester;
    } catch (error) {
      throw new Error('Error fetching subjects by semester: ' + error.message);
    }
  },
  async getSemestresByCarreraId(carreraId, userId) {
    const db = await getDB();
    const career = await db.collection('carreras').findOne({ _id: new ObjectId(carreraId) });
    if (!career) {
      throw new Error('Carrera no encontrada');
    }
    const semestresData = await db.collection('semestres').find({ carreraName: career.name }).toArray();
    const semestres = [];
    
    for (const semestre of semestresData) {
      const asignaturas = await this.getAsignaturasBySemestreId(semestre._id, userId, carreraId);
      console.log("asignaturas:",asignaturas)
      semestres.push({
        semestreId: semestre._id,
        nombreSemestre: semestre.nombre,
        semestreNumber: semestre.semestreNumber,
        asignaturas: asignaturas
      });
    }

    return semestres;
  },

  async getAsignaturasBySemestreId(id_semestre, userId, carreraId) {
    const db = await getDB();
    const semestre = await db.collection('semestres').findOne({ _id: new ObjectId(id_semestre) });
    if (!semestre || !semestre.subjects) {
      return [];
    }

    const userCareer = await db.collection('usercareers').findOne({ user_id: userId });
    if (!userCareer) {
      throw new Error('Datos de carrera del usuario no encontrados o incompletos');
    }
    var carrera = userCareer.progress.find(career => career.id_carrera = carreraId);
    if (!carrera) {
      throw new Error('Carrera no encontrada en el progreso del usuario');
    }

    var semestreCarreras = carrera.asignatura_semestre.find(semester => semester.id_semestre = id_semestre);
    if (!semestreCarreras) {
      throw new Error('Semestre no encontrado en la carrera del usuario');
    }

    const asignaturasPromises = semestreCarreras.estado_asignaturas.map(async asignatura => {
      const asignaturaCompleta = await db.collection('Subjects').findOne({ _id: new ObjectId(asignatura.id_asignatura) });
      return {
        id_asignatura: asignatura.id_asignatura,
        estado: asignatura.estado,
        nombre: asignaturaCompleta.nombre,
        requisitos: asignaturaCompleta.requisitos,
        apertura: asignaturaCompleta.apertura,
        creditos: asignaturaCompleta.creditos
      };
    });

    const asignaturas = await Promise.all(asignaturasPromises);
    return asignaturas;
  }
};



export default subjectService;