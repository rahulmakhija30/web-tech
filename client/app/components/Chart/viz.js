import React, {Component} from "react";
import axios from 'axios';
import swal from 'sweetalert';
import { replaceOne } from "../../../../server/models/FormModel";
import {Line} from 'react-chartjs-2';
import './viz.css';
import  Doctor from '../Doctor/Doctor';



class VizGraphs extends Component{
    
    constructor(props){
        super(props)
        this.state = {
            name: '',
            email: '',
            age: 0,
            height: [],
            heightLen: [],
            weight: [],
            bloodSugar: [],
            bpDia: [],
            bpSys: [],
            hemoglobin: [],
            normalBs: [],
            normalBpDia: [],
            normalBpSys: [],
            normalHemoglobin: []
        }
    }
   
    getEmail = (event) =>{
        this.setState({
            email: event.target.value
        })
    }

    updateHeight = (arr) => {
        this.setState({
            height : arr
        })
        let heightLenWa = [], normalBs1 = [], normalBpDia1 = [], normalBpSys1 = [], normalHemoglobin1 = [];
        for(let i = 0; i < this.state.height.length; i++){
            heightLenWa[i] = i;
            normalBs1[i] = 120;
            normalBpDia1[i] = 80;
            normalBpSys1[i] = 120;
            normalHemoglobin1[i] = 12.5;
        }
        this.setState({
            heightLen: heightLenWa,
            normalBs: normalBs1,
            normalBpDia: normalBpDia1,
            normalBpSys: normalBpSys1,
            normalHemoglobin: normalHemoglobin1
        })
    }

    updateName = (name1) => {
        this.setState({
            name: name1
        })
    }

    updateWeight = (weight1) => {
        this.setState({
            weight: weight1
        })
    }

    updateBloodSugar = (bloodSugar1) => {
        this.setState({
            bloodSugar: bloodSugar1
        })
    }

    updateBpDia = (bpDia1) => {
        this.setState({
            bpDia: bpDia1
        })
    }

    updateBpSys = (bpSys1) => {
        this.setState({
            bpSys: bpSys1
        })
    }

    updateHemoglobin = (hemoglobin1) => {
        this.setState({
            hemoglobin: hemoglobin1
        })
    }

    sweetal = () =>{
        swal ( "Oops" ,  "The patient you're trynna search either doesn't exist on the planet Earth or is missing from our database!" ,  "error" );
    }

    getViz = (event) =>{
        var name1 = '', height1 = [], weight1 = [], bloodSugar1 = [], bpDia1 = [], bpSys1 = [], hemoglobin1 = [];

        event.preventDefault();
        var that = this;
        fetch('/api/patientChart/' + this.state.email, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
            })
            .then((res) => res.json())
            .then(json=>{
                height1 = json.patient[0].height;
                weight1 = json.patient[0].weight;
                bloodSugar1 = json.patient[0].bloodSugar;
                bpSys1 = json.patient[0].bpSys;
                bpDia1 = json.patient[0].bpDia;
                hemoglobin1 = json.patient[0].hemoglobin;
                name1 = json.patient[0].name;
                that.setState({
                    height: json.patient[0].height,
                    name: json.patient[0].name
                }, ()=>{
                    this.updateHeight(height1);
                    this.updateName(name1);
                    this.updateWeight(weight1);
                    this.updateBloodSugar(bloodSugar1);
                    this.updateBpDia(bpDia1);
                    this.updateBpSys(bpSys1);
                    this.updateHemoglobin(hemoglobin1);
                })
            }).catch((error)=>{
                throw error;
            })
    }


    render(){
        const dataHeight = {
            labels: this.state.heightLen,
            datasets : [
                {
                    label: 'height of '+ this.state.name + ' throughout the course of the treatment',
                    data: this.state.height,
                    borderColor: ['rgb(243,136,58,0.8)'],
                    backgroundColor: ['rgb(243,136,58,0.2)'],
                    pointBorderColor: ['rgb(243,136,58,0.8)'],
                    pointBacgroundColor: ['rgb(243,136,58,0.2)']
                },
                {
                    label: 'weight of '+ this.state.name + ' throughout the course of the treatment',
                    data: this.state.weight,
                    borderColor: ['rgba(52, 152, 219, 0.8)'],
                    backgroundColor: ['rgba(52, 152, 219, 0.2)'],
                    pointBorderColor: ['rgba(52, 152, 219, 0.8)'],
                    pointBacgroundColor: ['rgba(52, 152, 219, 0.2)'] 
                }
            ]
        }
        
        const databshemo = {
            labels: this.state.heightLen,
            datasets:[
                {
                    label: 'blood sugar of '+ this.state.name + ' throughout the course of the treatment',
                    data: this.state.bloodSugar,
                    borderColor: ['rgba(231,28,35,0.8)'],
                    backgroundColor: ['rgba(231,28,35,0.2)'],
                    pointBorderColor: ['rgba(231,28,35,0.8)'],
                    pointBacgroundColor: ['rgba(231,28,35,0.2)'] 
                },
                {
                    label: 'Hemoglobin of '+ this.state.name + ' throughout the course of the treatment',
                    data: this.state.hemoglobin,
                    borderColor: ['rgba(92,10,13,0.8)'],
                    backgroundColor: ['rgba(92,10,13,0.2)'],
                    pointBorderColor: ['rgba(92,10,13,0.8)'],
                    pointBacgroundColor: ['rgba(92,10,13,0.2)'] 
                },
                {
                    label: 'Normal Blood sugar levels',
                    data: this.state.normalBs,
                    borderColor: ['rgb(1,144,49,0.8)'],
                    backgroundColor: ['rgb(1,144,49,0.2)'],
                    pointBorderColor: ['rgb(1,144,49,0.8)'],
                    pointBacgroundColor: ['rgb(1,144,49,0.2)'] 
                },
                {
                    label: 'Normal Hemoglobin levels',
                    data: this.state.hemoglobin,
                    borderColor: ['rgb(1,144,49,0.8)'],
                    backgroundColor: ['rgb(1,144,49,0.2)'],
                    pointBorderColor: ['rgb(1,144,49,0.8)'],
                    pointBacgroundColor: ['rgb(1,144,49,0.2)'] 
                }
            ]
        }

        const databp = {
            labels: this.state.heightLen,
            datasets:[
                {
                    label: 'Diastolic blood pressure of '+ this.state.name + ' throughout the course of the treatment',
                    data: this.state.bpDia,
                    borderColor: ['rgb(0,204,205,0.8)'],
                    backgroundColor: ['rgb(0,204,205,0.2)'],
                    pointBorderColor: ['rgb(0,204,205,0.8)'],
                    pointBacgroundColor: ['rgb(0,204,205,0.2)']
                },
                {
                    label: 'Systolic blood pressure of '+ this.state.name + ' throughout the course of the treatment',
                    data: this.state.bpSys,
                    borderColor: ['rgb(18,135,165,0.8)'],
                    backgroundColor: ['rgb(18,135,165,0.2)'],
                    pointBorderColor: ['rgb(18,135,165,0.8)'],
                    pointBacgroundColor: ['rgb(18,135,165,0.2)'],
                },
                {
                    label: 'Normal Diastolic Blood pressure levels',
                    data: this.state.normalBpDia,
                    borderColor: ['rgb(1,144,49,0.8)'],
                    backgroundColor: ['rgb(1,144,49,0.2)'],
                    pointBorderColor: ['rgb(1,144,49,0.8)'],
                    pointBacgroundColor: ['rgb(1,144,49,0.2)'] 
                },
                {
                    label: 'Normal Systolic Blood pressure levels',
                    data: this.state.normalBpSys,
                    borderColor: ['rgb(1,144,49,0.8)'],
                    backgroundColor: ['rgb(1,144,49,0.2)'],
                    pointBorderColor: ['rgb(1,144,49,0.8)'],
                    pointBacgroundColor: ['rgb(1,144,49,0.2)'] 
                }
            ]
        }

        if(this.props.type==1){
       
        return(
            <div>
            
                {/*TO BE INCLUDED EVERYWHERE*/}
		
		
			
			<div class="navibar">
				
				<ul class="menu">
				<img  src="https://www.pngarts.com/files/2/Letter-W-PNG-Image-Background.png" alt="logo" style={{maxWidth: 65 ,marginRight:'-50px' }} />
				
					<li>ebDoc</li>

					
					<li>
					<a  href="/frontpg" style={{color:"black"}}>Home</a>
					</li>
					<li>
					<a  href="/doctorspg" style={{color:"black"}}>Doctors Page</a>
					</li>
					<li>
					<a  href="/login" style={{color:"black"}}>Login</a>
					</li>

					</ul>
					
			</div>	

		
		
            <Doctor/>
                
           




            <div class="back">
            <div>

                <form onSubmit={this.getViz}> 
                   <br/><br/>
                    <h3>Please enter the patient's email ID to get a neat visualizaton of the reports:</h3>
                    <label>Email: </label>
                    <input type="email" value = {this.state.email} onChange={this.getEmail}></input>
                    <br/><button type="submit" style={{backgroundColor:'black',color:'white'}}> Get me the report! </button>
                </form><br/><br/>
                
                <div>
                    <h3>{this.state.name}'s Latest Medical Report:</h3>
                    Name: {this.state.name}<br/>
                    Age: {this.state.age}yrs<br/>
                    Height: {this.state.height[this.state.heightLen.length-1]}cm<br/>
                    Weight: {this.state.weight[this.state.heightLen.length-1]}kg<br/>
                    Blood sugar: {this.state.bloodSugar[this.state.heightLen.length-1]}mg/dL<br/>
                    Blood pressure: {this.state.bpDia[this.state.heightLen.length-1]}/{this.state.bpSys[this.state.heightLen.length-1]} mm/Hg<br/>
                    Hemoglobin: {this.state.hemoglobin[this.state.heightLen.length-1]}g/dL<br/>
                </div>

                <br/><br/>
                <h3>Visualisation of {this.state.name}'s reports</h3>
                <br/>

                <div style={{height:600, width:1000}}>
                    <Line data = {dataHeight}></Line>
                    <h6 style={{display: 'flex', justifyContent: 'center'}}>Your Height and Weight</h6>
                </div>
                <hr/>
                <br/><br/>
                <div style={{height:600, width:1000}}>
                    <Line data = {databshemo}></Line>
                    <h6 style={{display: 'flex', justifyContent: 'center'}}>Your Blood sugar and Hemoglobin levels</h6>
                </div>
                <hr/>
                <br/><br/>
                <div style={{height:500, width:1000}}>
                    <Line data = {databp}></Line>
                    <h6 style={{display: 'flex', justifyContent: 'center'}}>Your Blood pressure levels</h6>
                </div>
             </div>   
            </div>
            </div>
        )}else {
            return(
                <div>
                
                    {/*TO BE INCLUDED EVERYWHERE*/}
            
            
                
                <div class="navibar">
                    
                    <ul class="menu">
                    <img  src="https://www.pngarts.com/files/2/Letter-W-PNG-Image-Background.png" alt="logo" style={{maxWidth: 65 ,marginRight:'-50px' }} />
                    
                        <li>ebDoc</li>
    
                        
                        <li>
                        <a  href="/frontpg" style={{color:"black"}}>Home</a>
                        </li>
                        <li>
                        <a  href="/doctorspg" style={{color:"black"}}>Doctors Page</a>
                        </li>
                        <li>
                        <a  href="/login" style={{color:"black"}}>Login</a>
                        </li>
    
                        </ul>
                        
                </div>	
    
            
            
    
    
    
                <div class="back">
                <div>
    
                    <form onSubmit={this.getViz}> 
                       <br/><br/>
                        <h4>Please enter the patient's email ID to get a neat visualizaton of the reports:</h4>
                        <label>Email: </label>
                        <input type="email" value = {this.state.email} onChange={this.getEmail}></input>
                        <br/><button type="submit" style={{backgroundColor:'black',color:'white'}}> Get me the report! </button>
                    </form><br/><br/>
                    
                    <div>
                        <h4>{this.state.name}'s latest medical report:</h4>
                        Name: {this.state.name}<br/>
                        Age: {this.state.age}yrs<br/>
                        Height: {this.state.height[this.state.heightLen.length-1]}cm<br/>
                        Weight: {this.state.weight[this.state.heightLen.length-1]}kg<br/>
                        Blood sugar: {this.state.bloodSugar[this.state.heightLen.length-1]}mg/dL<br/>
                        Blood pressure: {this.state.bpDia[this.state.heightLen.length-1]}/{this.state.bpSys[this.state.heightLen.length-1]} mm/Hg<br/>
                        Hemoglobin: {this.state.hemoglobin[this.state.heightLen.length-1]}g/dL<br/>
                    </div>
    
                    <br/><br/>
                    <h4>Visualisation of {this.state.name}'s reports</h4>
                    <br/>
    
                    <div style={{height:600, width:1000}}>
                        <Line data = {dataHeight}></Line>
                        <h6 style={{display: 'flex', justifyContent: 'center'}}>Your Height and Weight</h6>
                    </div>
                    <hr/>
                    <br/><br/>
                    <div style={{height:600, width:1000}}>
                        <Line data = {databshemo}></Line>
                        <h6 style={{display: 'flex', justifyContent: 'center'}}>Your Blood sugar and Hemoglobin levels</h6>
                    </div>
                    <hr/>
                    <br/><br/>
                    <div style={{height:500, width:1000}}>
                        <Line data = {databp}></Line>
                        <h6 style={{display: 'flex', justifyContent: 'center'}}>Your Blood pressure levels</h6>
                    </div>
                 </div>   
                </div>
                </div>
                )
        }
    }
}

export default VizGraphs;