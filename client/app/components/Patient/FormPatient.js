
import React, {Component} from "react";
import axios from 'axios';
import swal from 'sweetalert';


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
        axios.post('http://localhost:3004/formPatient', myFormObj)
          .then(function (response) {
            console.log(response);
        })
          .catch(function (error) {
            console.log(error);
        });
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
                <input type="number" value = {this.state.formAge} onChange = {this.updateAge}></input>
                <br></br>

                <label>Height: </label>
                <input type="number" value = {this.state.formHeight} onChange = {this.updateHeight}></input>
                <br></br>

                <label>Weight: </label>
                <input type="number" value = {this.state.formWeight} onChange = {this.updateWeight}></input>
                <br></br>

                <label>Blood Sugar: </label>
                <input type="number" value = {this.state.formBS} onChange = {this.updateBS}></input>
                <br></br>

                <label>Blood pressure Diastolic: </label>
                <input type="number" value = {this.state.formDia} onChange = {this.updateDia}></input>
                <br></br>

                <label>Blood pressure Systolic: </label>
                <input type="number" value = {this.state.formSys} onChange = {this.updateSys}></input>
                <br></br>

                <label>Hemoglobin: </label>
                <input type="number" value = {this.state.formHemoglobin} onChange = {this.updateHemoglobin}></input>
                <br></br>

                <button type="submit">Submit the info!</button>
            </form>
        )
    }
}

export default FormPatient;
