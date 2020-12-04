import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Collapsible from 'react-collapsible';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
class Patient extends Component{
    constructor(props){
        super(props);
    this.state={
        name:'',
        date:new Date().setMinutes(0,0,0),
        reason:'',
        disabled:[],
        previous:[]
    };
    this.bookAppoinment=this.bookAppoinment.bind(this);
    this.handleNameChange=this.handleNameChange.bind(this);
}
    componentDidMount(){
        this.fetchAppointment();
        this.getPreviousAppointments(this.props.email);
    }
    bookAppoinment=()=>{
        console.log(this.state.date,typeof(this.state.date))
        fetch('/api/account/book', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: this.props.email,
              name: this.state.name,
              reason : this.state.reason,
              date: this.state.date
            })/*body:{
                email: this.props.email,
              name: this.state.name,
              reason : this.state.reason,
              date: this.state.date
            }*/,
          })
          .then(res => res.json())
          .then(json=>{
              console.log("JSON",json);
              alert(json.message)
              this.fetchAppointment();
          })
          
    }
    fetchDisabled=(date)=>{
        console.log(date)
        fetch('/api/account/disabled/'+date, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            
          })
          .then(res=>res.json())
          .then(json=>{
              console.log(json.appointments,"Booked")
              let bookedAppointments=json.appointments.map(d=> new Date(d))
              if(json.success){
                  this.setState({
                    disabled:bookedAppointments
                  })
              }
              
          })
    }
    fetchAppointment=()=>{
        fetch('/api/account/fetch/'+this.props.email, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
          })
          .then(res => res.json())
          .then(json=>{
              console.log("JSON1",json);
              if(json.success){
                let div=document.querySelector('.current')
                //console.log("Date type",typeof(json.currentAppointment.Date))
                //console.log(new Date(json.currentAppointment.Date).toLocaleString(),"Locale")
                div.innerHTML="Upcoming Appointments"+"<br/>"+ new Date(json.currentAppointment.Date).toLocaleString() + "</br>" + json.currentAppointment.Reason
            }
          })
    }
    getPreviousAppointments=(email)=>{
        fetch('/api/account/previous/'+email,{
            method: 'GET',
            headers:{
            'Content-Type': 'application/json'
            },
           /* body:JSON.stringify({
                email:email
            }),*/
        })
        .then(res=>res.json())
        .then(json=>{
            console.log(json)
            this.setState({
                previous:json.previous
            })
        })
    }
    handleNameChange=(e)=>{
        this.setState({
            name:e.target.value
        });
    }
    handleReasonChange=(e)=>{
        this.setState({
            reason:e.target.value
        });
    }
    handleDateChange=(e)=>{
        this.setState({
            date:e,
        });
        this.fetchDisabled(e);
        console.log(typeof(e));
    }
     isWeekday = date => {
        const day = date.getDay();
        return day !== 0 && day !== 6;
      };
    render(){
        let previousAppointmentList=[]
        let closedTimes=[]
        for( var i=0;i<9;i++){
            let d1=new Date()
            d1.setHours(i)
            d1.setMinutes(0)
            //closedTimes.push(d.setMinutes(0))
            closedTimes.push(d1)
            let d2= new Date()
            d2.setHours(i)
            d2.setMinutes(30)
            closedTimes.push(d2)
        }
        if(this.state.previous){
             previousAppointmentList=this.state.previous.map((appointment,index)=>{
                return(
                    <div key={index}>
                        Date:{new Date(appointment.Date).toLocaleString()}<br/>
                        Reason:{appointment.Reason}<br/>
                        Prescribed Medicines:{appointment.Prescription}
                    </div>
                )
            })
        }
        //console.log("closed",closedTimes)
        return (
            <div>
                <div className="booking">
                    <p>Hello, Patient</p>
                    Name:
                    <input type="text" onChange={this.handleNameChange}></input>
                    Reason:
                    <input type="text" onChange={this.handleReasonChange}></input>
                    Date:
                    <DatePicker
                    selected={this.state.date} 
                    onChange={this.handleDateChange} 
                    showTimeSelect
                    minDate={new Date()}
                    filterDate={this.isWeekday}
                    excludeTimes={this.state.disabled.concat(closedTimes)}
                    dateFormat="MMMM d, yyyy h:mm aa" />
                    <button onClick={this.bookAppoinment}>Book an appointment!</button>
                </div>
                <div className="current">
                </div>
                <div>
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
                </div>
            </div>
        );
    }
}

class MyForm extends Component{

    constructor(props){
        super(props)
        this.state = {
            formName: 'John Doe',
            formEmail: 'johndoe@example.com',
            formAge: '42',
            formHeight: '169',
            formWeight: '72',
            formBS: '110',
            formDia: '120',
            formSys: '80',
            formHemoglobin: '12'
        }
    }

    updateName = (event) =>{
        this.setState({
            formName: event.target.value
        })
    }

    updateEmail = (event) =>{
        this.setState({
            formEmail: event.target.value
        })
    }

    updateAge = (event) => {
        this.setState({
            formAge : event.target.value
        })
    }
    
    updateHeight = event => {
        this.setState({
            formHeight: event.target.value
        })
    }

    updateWeight = event => {
        this.setState({
            formWeight: event.target.value
        })
    }

    updateBS = event => {
        this.setState({
            formBS: event.target.value
        })
    }

    updateBP = event => {
        this.setState({
            formBP: event.target.value
        })
    }
     
    updateDia = event => {
        this.setState({
            formDia: event.target.value
        })
    }
    
    updateSys = event => {
        this.setState({
            formSys: event.target.value
        })
    }

    updateHemoglobin = event => {
        this.setState({
            formHemoglobin: event.target.value
        })
    }

    submitTheForm = event => {
        alert(`${this.state.formName}` + ', your form has been submitted successfully!');
        event.preventDefault();
        
    }



    render(){
        return(
            <form onSubmit={this.submitTheForm}>
                <h1>This is the main form</h1><br></br>

                <label>Name: </label>
                <input type="text" value = {this.state.formName} onChange={this.updateName}></input>
                <br></br>

                <label>Email ID: </label>
                <input type="email" value = {this.state.formEmail} onChange = {this.updateEmail}></input>
                <br></br>

                <label>Age: </label>
                <input type="text" value = {this.state.formAge} onChange = {this.updateAge}></input>
                <br></br>

                <label>Height: </label>
                <input type="text" value = {this.state.formHeight} onChange = {this.updateHeight}></input>
                <br></br>

                <label>Weight: </label>
                <input type="text" value = {this.state.formWeight} onChange = {this.updateWeight}></input>
                <br></br>

                <label>Blood Sugar: </label>
                <input type="text" value = {this.state.formBS} onChange = {this.updateBS}></input>
                <br></br>

                <label>Blood pressure Diastolic: </label>
                <input type="text" value = {this.state.formDia} onChange = {this.updateDia}></input>
                <br></br>

                <label>Blood pressure Systolic: </label>
                <input type="text" value = {this.state.formSys} onChange = {this.updateSys}></input>
                <br></br>

                <label>Hemoglobin: </label>
                <input type="text" value = {this.state.formHemoglobin} onChange = {this.updateHemoglobin}></input>
                <br></br>

                <button type="submit">Submit the info!</button>
            </form>
        )
    }
}

export default Patient;
export MyForm;
