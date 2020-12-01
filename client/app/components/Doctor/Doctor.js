import React, { Component } from 'react';
import Collapsible from 'react-collapsible';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
//import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Button, Backdrop } from '@material-ui/core';
class Doctor extends Component{
    constructor(props){
        super(props);
    this.state={
        gotAppointment:false,
        AppointmentResponse: null
    };
}
getAllAppointments=()=>{
    fetch('/api/account/get', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(res=>res.json())
      .then(json=>{
          console.log(json)
          this.setState({
              gotAppointment:true,
              AppointmentResponse:json.appointments
          })
      })
}
handleRemove=(email,date,name,reason)=>{
    let tar=document.querySelector('#'+email.slice(0,email.indexOf('@')))
    fetch('/api/account/remove', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          date:date,
          prescription:tar.value,
          name:name,
          reason:reason
        }),
      })
      .then(res => res.json())
      .then(json =>{
          console.log(json.message)
          this.getAllAppointments();
      })
}
showPreviousAppointment=(email)=>{
    fetch('/api/account/previous',{
        method: 'POST',
        headers:{
        'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            email:email
        }),
    })
    .then(res=>res.json())
    .then(json=>{
        console.log(json)
    })
}
render(){
    let AppointmentList=null;
    if(this.state.gotAppointment){
        let sortedAppointmentResponse=this.state.AppointmentResponse
        sortedAppointmentResponse.sort(function(a,b){
            return new Date(a.Date)-new Date(b.Date)
        })
        AppointmentList=sortedAppointmentResponse.map((appointment,index)=>{
            let previousAppointmentList=appointment.previous.map((appt,index)=>{
                return (
                    <div key={index}>
                        Date:{ new Date(appt.Date).toLocaleString()}<br/>
                        Reason:{appt.Reason}<br/>
                        Name :{appt.Name}<br/>
                        Prescription :{appt.Prescription}<br/>
                    </div>
                )
            })
            return(
                <div key={appointment.email}>
                    <p>
                    Date:   {new Date(appointment.Date).toLocaleString()}<br/>
                    Reason:{appointment.Reason}<br/>
                    Name : {appointment.Name}
                    </p>
                <Accordion style={{width:'20%',marginLeft:'0%',borderRadius:'10px'}}>
                    <AccordionSummary
                    //expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography>Show Previous Appointments</Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{overflowY:'scroll',maxHeight:'200px'}}>
                    <Typography>
                       {previousAppointmentList}
                    </Typography>
                    </AccordionDetails>
                </Accordion>
                    <textarea id={appointment.email.slice(0,appointment.email.indexOf('@'))} placeholder="Enter prescription"></textarea>
                    <button onClick={()=>this.handleRemove(appointment.email,appointment.Date,appointment.Name,appointment.Reason)}>Remove</button>
                </div>
            )
        })
    }

    return(
        <div>
        <h>Doctor's Page</h>
        <div className="appointments">
        <button onClick={this.getAllAppointments}>Get Appointments
        </button>
        {AppointmentList}
        </div>
        </div>
    )
}
}
export default Doctor;