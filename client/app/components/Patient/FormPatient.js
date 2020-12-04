
import React, {Component} from "react";
import ReactDOM from "react-dom";

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

export default PatientHome;
