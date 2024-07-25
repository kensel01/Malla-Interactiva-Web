import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userCareerSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  careerId: { type: Schema.Types.ObjectId, ref: 'Career', required: true },
  subjects: [{
    subjectId: { type: Schema.Types.ObjectId, ref: 'Subject' },
    status: { type: String, enum: ['en curso', 'aprobada', 'no disponible'], default: 'no disponible' }
  }]
});

const UserCareer = mongoose.model('UserCareer', userCareerSchema);
export default {UserCareer};
