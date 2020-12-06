import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Collapsible from 'react-collapsible';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import swal from 'sweetalert';
class Patient extends Component{
    constructor(props){
        super(props);
    this.state={
        name:'',
        date:new Date().setHours(new Date().getHours()+1,0,0),
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
              //console.log("JSON",json);
              //alert(json.message)
              if(json.success){
                  swal('Booked!',"Your appointment is booked successfully","success")
              }
              else{
              swal("Please Note!",json.message, "error");
              }
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


export default Patient;
