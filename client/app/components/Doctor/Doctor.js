import React, { Component } from 'react';

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
handleRemove=(email)=>{
    fetch('/api/account/remove', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email
        }),
      })
      .then(res => res.json())
      .then(json =>{
          console.log(json.message)
          this.getAllAppointments();
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
            return(
                <div key={index}>
                    <p>
                    Date:   {new Date(appointment.Date).toLocaleString()}<br/>
                    Reason:{appointment.Reason}<br/>
                    Name : {appointment.Name}
                    </p>
                    <button onClick={()=>this.handleRemove(appointment.email)}>Remove</button>
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