const mongoose = require('mongoose');

const FormPatientSchema = new mongoose.Schema({
  name: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  age: {
    type: Number,
    default: 18
  },
  height: {
    type: Array,
    default: []
  },
  weight:{
    type: Array,
    default:[]
  },
  bloodSugar:{
    type : Array,
    default:[]
  },
  bpDia:{
    type : Array,
    default:[]
  },
  bpSys:{
    type : Array,
    default:[]
  },
  hemoglobin:{
    type : Array,
    default:[]
  }
});

module.exports = mongoose.model('FormPatient', FormPatientSchema, 'users');
