import mongoose, { SchemaType } from 'mongoose';
const Schema = mongoose.Schema;

const asignaturaSchema = new Schema({
  id_asignatura: { type: Schema.Types.ObjectId, ref: 'Subjects' },
  estado : {type: Number}
});
const semestreSchema = new Schema({
  id_semestre: {type: Schema.Types.ObjectId, ref: 'semestres'},
  estado_asignaturas : [asignaturaSchema]
});
const carreraSchema = new Schema({
  id_carrera: {type: Schema.Types.ObjectId, ref: 'carreras'},
  asignatura_semestre: [semestreSchema]
});

const userSchema = new Schema({
  user_id: { type: String, required: true, unique: true },
  progress: [carreraSchema],
}); 

const User = mongoose.model('User', userSchema);
const Carrera = mongoose.model('Carrera',carreraSchema);
const Semestre = mongoose.model('Semestre', semestreSchema);
const Asignatura = mongoose.model('Asignatura',asignaturaSchema);

export default {User, Carrera, Semestre, Asignatura};
