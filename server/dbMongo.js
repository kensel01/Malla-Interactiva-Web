import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/asignaturas', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB connection error:', err));

const getDB = () => mongoose.connection;

export { getDB };

