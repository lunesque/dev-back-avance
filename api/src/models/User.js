const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: String,
  role: { type: String, enum: ["user", "admin"], default: "user"}
});

UserSchema.methods.verifyPassword = async function(candidatePassword) {
  try {
    const match = await bcrypt.compare(candidatePassword, this.password);
    return match;
  } catch (error) {
    console.error('Erreur lors de la vérification du mot de passe :', error);
    throw error;
  }
};

const User = mongoose.model('User', UserSchema);
module.exports = User;