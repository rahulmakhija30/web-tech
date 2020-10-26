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
render(){
    let AppointmentList=null;
    if(this.state.gotAppointment){
        AppointmentList=this.state.AppointmentResponse.map((appointment,index)=>{
            return(
                <div key={index}>
                    <p>
                        {appointment.Date}
                        {appointment.Reason}
                    </p>
                </div>
            )
        })
    }

    return(
        <div>
        <h>Doctor's Page</h>
        <div className="appointments">
        <button onClick={this.getAllAppointments}>GET
        </button>
        {AppointmentList}
        </div>
        </div>
    )
}
}
export default Doctor;