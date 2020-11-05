const mongoose = require('mongoose');
const AppointmentSchema = new mongoose.Schema({
  date: {
    type: String,
    default: ''
  },
  slots:{
      type:Array,
      default:[]
  }
});
module.exports = mongoose.model('Appointment', AppointmentSchema);