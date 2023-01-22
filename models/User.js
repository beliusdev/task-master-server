import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },

  email: {
    type: String,
    unique: true,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: new Date(),
  },
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcryptjs.hash(this.password, 12);
  next();
});

UserSchema.methods.checkPassword = async function (password) {
  return await bcryptjs.compare(password, this.password);
};

UserSchema.methods.getToken = function () {
  return jwt.sign(
    {
      id: this._id,
    },
    process.env.JWT_CODE,
    { expiresIn: process.env.TOKEN_EXPIRE_TIME }
  );
};

export default mongoose.model('User', UserSchema);
