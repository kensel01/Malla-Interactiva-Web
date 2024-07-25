import { ObjectId } from 'mongodb';
import { getDB } from '../dbMongo.js';
import userModel from '../models/userModel.js';

const careerService = {
  async getAllCareers() {
    const db = await getDB();
    return await db.collection('carreras').find({}).toArray();
  },

  async getCareerById(careerId) {
    const db = await getDB();
    return await db.collection('carreras').findOne({ _id: ObjectId(careerId) });
  },

  async updateCareer(careerId, updates) {
    const db = await getDB();
    const result = await db.collection('carreras').updateOne(
      { _id: ObjectId(careerId) },
      { $set: updates }
    );
    return result.modifiedCount > 0;
  },

  async getCareersId() {
    const db = await getDB();
    const carreraid= await db.collection('carreras').find({}, { projection: { _id: 1 } }).toArray();
    return await carreraid;
  },

  async getSemestreId(nombreSemestre) {
    const db = await getDB();
    const result =await db.collection('semestres').find({carreraName: nombreSemestre},{projection:{_id:1}}).toArray();
    return result;
  },

  async generarListaAsignaturas(id_semestre){
    const db = await getDB();
    const result = await db.collection('semestres').findOne({_id:id_semestre},{projection:{subjects: 1}});
    const numerosemestre = await db.collection('semestres').findOne({_id: id_semestre},{projection:{semestreNumber:1}});
    const asignaturas = [];
    const Asignatura = userModel.Asignatura;
    for(const asignatura of result.subjects){ 
      var estado = 0;
      if (numerosemestre.semestreNumber != 1){
        estado = 2;
      } 
      const asignaturaS = new Asignatura({id_asignatura: asignatura._id, estado:estado});
      asignaturas.push(asignaturaS);
    }
    return asignaturas;
  },


  async generarSemestres(id_carrera){
    const db = await getDB();
    const career = await db.collection('carreras').findOne({ _id:id_carrera}, { projection: { name: 1 } });
    if (!career) {
      throw new Error('Carrera no encontrada');
    }
    const result = await this.getSemestreId(career.name);
    const Semestre = userModel.Semestre;
    const semestres = [];
    for(const semestre of result){
      const asignaturas = await this.generarListaAsignaturas(semestre._id);
      const semestreS = new Semestre({id_semestre: semestre._id, estado_asignaturas:asignaturas})
      semestres.push(semestreS);
    }
    return semestres;
  },
  
  async generarCarreras(){
    const result = await this.getCareersId();
    const Carrera = userModel.Carrera;
    const carreras = [];
    for(const carrera of result){
      const semestres =await  this.generarSemestres(carrera._id);
      const carreraS = new Carrera({id_carrera: carrera._id, asignatura_semestre:semestres});
      carreras.push(carreraS);

    };

    return carreras;
  },
  async updateAsignaturaState(userId, asignaturaId, nuevoEstado) {
    const db = await getDB();
    try {
      const result = await db.collection('usercareers').updateOne(
        { userId: userId, "asignaturas.id_asignatura": asignaturaId },
        { $set: { "asignaturas.$.estado": nuevoEstado } }
      );
      return result.modifiedCount > 0;
    } catch (error) {
      console.error('Error al actualizar el estado en la base de datos:', error);
      throw error;  
    }
  }

};

export default careerService;