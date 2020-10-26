const User = require('../../models/User');

module.exports = (app) => {
app.post('/api/account/book', (req, res, next) => {
    const { body } = req;
    let {email,reason,name,date}=body;
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
      console.log("Users",users)
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
          currentAppointment: {'Date':date,'Reason':reason}
        }
      }, null, (err, sessions) => {
        if (err) {
          console.log(err);
          return res.send({
            success: false,
            message: 'Error: Server error'
          });
        }
        console.log("PREV",user.currentAppointment);
        return res.send({
          success: true,
          message: 'Good'
        });
      });
     
     /* return res.send({
          success:true,
          message:'Success'
      });*/

      // Otherwise correct user

     /*   return res.send({
          success: true,
          message: 'Valid sign in',
          token: doc._id
        });*/
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
       
       /* return res.send({
            success:true,
            message:'Success'
        });*/
  
        // Otherwise correct user
  
       /*   return res.send({
            success: true,
            message: 'Valid sign in',
            token: doc._id
          });*/
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
          //console.log(myDoc.email)
          appointments.push(myDoc.currentAppointment[0])
        })
        return res.send({
          success:true,
          appointments:appointments
        })
      })
      
    });
};