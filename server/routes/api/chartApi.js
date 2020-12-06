const Patient = require('../../models/FormModel');
const app = require('../../server');

module.exports = (app) => {
    app.get('/api/patientChart/:email', (req, res, next) => {
        let patient=[]
        Patient.find({email: req.params.email},(err,users) => {
          if(err) throw err;
          console.log("this is email: ",req.params.email);
          patient.push(users[0])
          console.log(users);
          return res.send({
            success:true,
            patient:patient
          })
        })
        
    });
}
