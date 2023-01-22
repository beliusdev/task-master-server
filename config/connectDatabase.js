import mongoose from 'mongoose';

export default function connectDatabase() {
  const uri = process.env.MONGODB;
  mongoose.set('strictQuery', true);
  return mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}
