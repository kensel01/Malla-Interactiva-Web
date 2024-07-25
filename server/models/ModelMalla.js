import mongoose from 'mongoose';


const Schema = mongoose.Schema;

// Esquema para Carreras
const careerSchema = new Schema({
  name: { type: String, required: true },
  subjects: [{ type: Schema.Types.ObjectId, ref: 'Subject' }],
  duration: { type: Number, required: true }
});

// Esquema para Asignaturas
const subjectSchema = new Schema({
  nombre: { type: String, required: true },
  semestre: { type: Number, required: true },
  requisitos: [{ type: Schema.Types.ObjectId, ref: 'Subject' }],
  carrera: { type: Schema.Types.ObjectId, ref: 'Career' }
});

const Career = mongoose.model('Career', careerSchema);
const Subject = mongoose.model('Subject', subjectSchema);

export { Career, Subject };