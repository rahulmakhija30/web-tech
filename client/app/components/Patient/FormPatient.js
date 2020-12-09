
import React, {Component} from "react";
import axios from 'axios';
import swal from 'sweetalert';
import './patient.css';

class MyForm extends Component{

    constructor(props){
        super(props)
        this.state = {
            formName: '',
            formEmail: '',
            formAge: 0,
            formHeight: 0,
            formWeight: 0,
            formBS: 0,
            formDia: 0,
            formSys: 0,
            formHemoglobin: 0
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
        swal("Sweet!", "You have submitted your report", "success");
        event.preventDefault();
        var myFormObj = {
                            name        : this.state.formName,
                            email       : this.state.formEmail,
                            age         : parseInt(this.state.formAge),
                            height      : parseInt(this.state.formHeight),
                            weight      : parseInt(this.state.formWeight),
                            bloodSugar  : parseInt(this.state.formBS),
                            bpDia       : parseInt(this.state.formDia),
                            bpSys       : parseInt(this.state.formSys),
                            hemoglobin  : parseInt(this.state.formHemoglobin)
        }
        axios.post('http://localhost:8080/formPatient', myFormObj)
          .then(function (response) {
            console.log(response);
        })
          .catch(function (error) {
            console.log(error);
        });
    }

    


    render(){
        return(
            <div class="container">
            
            <form onSubmit={this.submitTheForm}>
                <h3>Kindly fill in your latest medical reports here!</h3>
                
                <label>Name: </label>
                <input type="text" value = {this.state.formName} onChange={this.updateName} style={{marginLeft:'130px'}}></input>
                <br></br>
                

                
                <label>Email ID: </label>
                <input type="email" value = {this.state.formEmail} onChange = {this.updateEmail} style={{marginLeft:'110px'}}></input>
                <br></br>
                

                <label>Age: </label>
                <input type="number" value = {this.state.formAge} onChange = {this.updateAge} style={{marginLeft:'145px'}}></input>
                <br></br>

                <label>Height: </label>
                <input type="number" value = {this.state.formHeight} onChange = {this.updateHeight} style={{marginLeft:'127px'}}></input>
                <br></br>

                <label>Weight: </label>
                <input type="number" value = {this.state.formWeight} onChange = {this.updateWeight} style={{marginLeft:'125px'}}></input>
                <br></br>

                <label>Blood Sugar: </label>
                <input type="number" value = {this.state.formBS} onChange = {this.updateBS} style={{marginLeft:'85px'}}></input>
                <br></br>

                <label>Blood pressure Diastolic: </label>
                <input type="number" value = {this.state.formDia} onChange = {this.updateDia} style={{marginLeft:'0px'}}></input>
                <br></br>

                <label>Blood pressure Systolic: </label>
                <input type="number" value = {this.state.formSys} onChange = {this.updateSys} style={{marginLeft:'2px'}}></input>
                <br></br>

                <label>Haemoglobin: </label>
                <input type="number" value = {this.state.formHemoglobin} onChange = {this.updateHemoglobin} style={{marginLeft:'75px'}}></input>
                <br></br>

                <button type="submit" style={{backgroundColor:'black',color:'white',width:'150px'}}>Submit info!</button>
            </form>
            </div>
        
        )
    }
}

export default MyForm;
