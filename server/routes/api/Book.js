const User = require('../../models/User');
const Appointments = require('../../models/Appointment');

module.exports = (app) => {
app.post('/api/account/book', (req, res, next) => {
    const { body } = req;
    let {email,reason,name,date}=body;
    let d=new Date(date)
    email = email.toLowerCase();
    email = email.trim();
    let strDate=d.getFullYear()+'-'+d.getMonth()+'-'+d.getDate()

    User.find({
      email: email
    }, (err, users) => {
      if (err) {
        console.log('err 2:', err);
        return res.send({
          success: false,
          message: 'Error: server error'
        });
      }
      if (users.length != 1) {
        return res.send({
          success: false,
          message: 'Error: Invalid'
        });
      }
      const user = users[0];
      if(user.currentAppointment.length == 1){
        return res.send({
          success : false,
          message : 'Can book only one appontment at a time!'
        })
      }
      User.updateOne({
        _id: user._id,
      }, {
        $push: {
          currentAppointment: {'Date':date,'Reason':reason,'Name':name}
        }
      }, null, (err, sessions) => {
        if (err) {
          console.log(err);
          return res.send({
            success: false,
            message: 'Error: Server error'
          });
        }
      });
      Appointments.findOneAndUpdate({date:strDate},{
        $push: {
          slots: d
        }
      },{upsert:true},
  (err,date)=>{
        if(err){
          console.log(err)
        }
        return res.send({
          success:true,
          message:'Booked!'
        })
      })
      });
      
    });
    app.post('/api/account/fetch', (req, res, next) => {
      const {body}=req;
      let email=body.email;
      email = email.toLowerCase();
      email = email.trim();
      User.find({
        email: email
      }, (err, users) => {
        if (err) {
          console.log('err 2:', err);
          return res.send({
            success: false,
            message: 'Error: server error'
          });
        }
        if (users.length != 1) {
          return res.send({
            success: false,
            message: 'Error: Invalid'
          });
        }
        const user = users[0];
        if(user.currentAppointment.length==0){
          return res.send({
            success: false,
            message : 'No Upcoming Appointments' 
          })
        }
        return res.send({
          success: true,
          currentAppointment : user.currentAppointment[0]
        })
        });
    });
    app.get('/api/account/get', (req, res, next) => {
     /* User.find().foreach(function(myDoc){
        console.log(myDoc.currentAppointment)
      })*/
      let appointments=[]
      User.find({},function(err,users){
        if(err) throw err;
        users.forEach(function(myDoc){
          if(myDoc.currentAppointment[0]){
          myDoc.currentAppointment[0]['email']=myDoc.email
          myDoc.currentAppointment[0]['previous']=myDoc.previousAppointments
          appointments.push(myDoc.currentAppointment[0])
          }
        })
        return res.send({
          success:true,
          appointments:appointments
        })
      })
      
    });

    app.post('/api/account/remove',(req,res,next) => {
      let email = req.body.email
      let date=req.body.date
      let prescription = req.body.prescription
      User.find({email:email},function(err,users){
        if(err) throw err;
        user=users[0]
        let currentAppointment=user.currentAppointment[0]
        currentAppointment['Prescription']=prescription
        User.updateMany({
          _id: user._id,
        }, {
          $push: {
            previousAppointments : currentAppointment
          },
          $pop: {
            currentAppointment: 1
          }
        }, null, (err, sessions) => {
          if (err) {
            console.log(err);
            return res.send({
              success: false,
              message: 'Error: Server error'
            });
          }
          return res.send({
            success: true,
            message: 'Deleted'
          });
        });

      })
    })
    app.post('/api/account/disabled',(req,res,next)=>{
      let dt= new Date(req.body.date)
      let year=dt.getFullYear()
      let month=dt.getMonth()
      let date=dt.getDate()
      let strDate2=year+'-'+month+'-'+date
      let bookedAppointments=[]
      Appointments.find({date:strDate2},function(err,appointments){
        if(err) {
          console.log(err);
          return res.send({
            success: false,
            message: 'Error: Server error'
          });
        }
        if(appointments.length==1){
        return res.send({
          success:true,
          appointments:appointments[0].slots
        })
        }
        else{
          return res.send({
            success:true,
            appointments:[]
          })
        }
      })
    })
    app.post('/api/account/previous',(req,res,next)=>{
      let email = req.body.email
      if(email){
      User.find({email:email},(err,users)=>{
        if(err){
          return res.send({
            previous:"fail"
          })
        }
        return res.send({
          previous:users[0].previousAppointments
        })
      })
    }
    })

};