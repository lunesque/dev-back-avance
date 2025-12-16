const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
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