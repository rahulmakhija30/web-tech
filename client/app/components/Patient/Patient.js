import React, { Component } from 'react';

class Patient extends Component{
    constructor(props){
        super(props);
    this.state={
        name:'',
        date:'',
        reason:''
    };
    this.bookAppoinment=this.bookAppoinment.bind(this);
    this.handleNameChange=this.handleNameChange.bind(this);
}
    componentDidMount(){
        this.fetchAppointment();
    }
    bookAppoinment=()=>{
        console.log("booked")
        console.log('props',this.props.email)
        console.log("state",this.state)
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
            }),
          })
          .then(res => res.json())
          .then(json=>{
              console.log("JSON",json);
              //document.querySelector('.current').innerHTML+=json.message;
              alert(json.message)
              this.fetchAppointment();
          })
          
    }
    fetchAppointment=()=>{
        fetch('/api/account/fetch', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: this.props.email
            }),
          })
          .then(res => res.json())
          .then(json=>{
              console.log("JSON1",json);
              if(json.success){
                let div=document.querySelector('.current')
                div.innerHTML=json.currentAppointment.Date + "</br>" + json.currentAppointment.Reason
                //div.innerHTML+=json.currentAppointment.Reason
            }
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
            date:e.target.value
        });
    }
    render(){
        return (
            <div>
                <div className="booking">
                    <p>Hello, Patient</p>
                    Name:
                    <input type="text" onChange={this.handleNameChange}></input>
                    Reason:
                    <input type="text" onChange={this.handleReasonChange}></input>
                    Date:
                    <input type="date" onChange={this.handleDateChange}></input>
                    <button onClick={this.bookAppoinment}>Book an appointment!</button>
                </div>
                <div className="current">
                </div>
            </div>
        );
    }
}

export default Patient;