const User = require('../../models/User');
const Appointments = require('../../models/Appointment');
const { PDFDocument,StandardFonts,rgb } = require('pdf-lib');
const fs = require('fs')
const nodemailer = require('nodemailer')

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
    app.get('/api/account/fetch/:email', (req, res, next) => {
      let email = req.params.email
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

    app.delete('/api/account/remove',(req,res,next) => {
      /*let email = req.body.email
      let date=req.body.date
      let prescription = req.body.prescription*/
      let {email,date,prescription,name,reason}=req.body
      async function myfunc(){
        const pdfDoc = await PDFDocument.create()
 
        // Embed the Times Roman font
        //const timesRomanFont =  pdfDoc.embedFont(StandardFonts.TimesRoman)
         
        // Add a blank page to the document
        const page = await pdfDoc.addPage()
        pdfDoc.setTitle('Medical Prescription')
         
        // Get the width and height of the page
        const { width, height } = page.getSize()
         
        // Draw a string of text toward the top of the page
        const fontSize = 30
        page.drawText('webDoc Medical Prescription', {
          x: 150,
          y: 700,
          size: fontSize,
          //font: timesRomanFont,
          color: rgb(0, 0.53, 0.71),
        })
        page.drawText("Name :"+name, {
          x: 50,
          y: 620,
          size: 20,
          //font: timesRomanFont,
          color: rgb(0, 0, 0),
        })
        page.drawText("Date :"+new Date(date).toLocaleString(), {
          x: 50,
          y: 590,
          size: 20,
          //font: timesRomanFont,
          color: rgb(0, 0, 0),
        })
        page.drawText("Reason :"+reason, {
          x: 50,
          y: 560,
          size: 20,
          //font: timesRomanFont,
          color: rgb(0, 0, 0),
        })
        page.drawText("Prescription :"+prescription, {
          x: 50,
          y: 530,
          size: 20,
          //font: timesRomanFont,
          color: rgb(0, 0, 0),
        })
         
        // Serialize the PDFDocument to bytes (a Uint8Array)
        fs.writeFileSync('./prescription.pdf', await pdfDoc.save());
        let transport = nodemailer.createTransport({
          service:'gmail',
          auth:{
            user : 'clinic.webtech@gmail.com',
            pass: 'clinicwebtech123'
          }
        });
        let message={
          from:'clinic.webtech@gmail.com',
          to:email,
          subject:'Medical Prescription',
          text:'PFA prescription for your appointment.',
          attachments:[
            {
              name:'prescription.pdf',
              path:'./prescription.pdf'
            }
          ]
        }
        transport.sendMail(message,function(){
          console.log("Email Sent")
          fs.unlink('./prescription.pdf',function(){
            console.log("Deleted")
          })
        })
        //const pdfBytes =  await pdfDoc.save()
      }
      myfunc();
     
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
    app.get('/api/account/disabled/:date',(req,res,next)=>{
      let dt= new Date(req.params.date)
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
    app.get('/api/account/previous/:email',(req,res,next)=>{
      let email = req.params.email
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