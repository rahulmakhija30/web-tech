const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    default: ''
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  signUpDate: {
    type: Date,
    default: Date.now()
  },
  currentAppointment:{
    type: Array,
    default:[]
  },
  previousAppointments:{
    type : Array,
    default:[]
  }
});
UserSchema.methods.generateHash = function(password) {
  console.log("password")
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};
module.exports = mongoose.model('User', UserSchema);