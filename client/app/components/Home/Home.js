import React, { Component } from 'react';
import 'whatwg-fetch';
import './Home.css';
import '../Patient/Patient'
import Doctor from '../Doctor/Doctor'
import MyForm from '../Patient/FormPatient';
import VizGraphs from '../Chart/viz';


<link href ="final boot login.css" rel="stylesheet"  />

/*CHECKKK FOR LOADING SYMBOL*/



import {
  getFromStorage,
  setInStorage,
} from '../../utils/storage';
import Patient from '../Patient/Patient';

class Home extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: '',
      signUpError: '',
      signInError: '',
      signInEmail: '',
      signInPassword: '',
      signUpEmail: '',
      signUpPassword: '',
      mail:'',
      doctor:false
    };

    this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);
    this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
    this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);
    
    this.onSignIn = this.onSignIn.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
    this.logout = this.logout.bind(this);
    this.goToDoctor = this.goToDoctor.bind(this);
    this.backToHome = this.backToHome.bind(this);
  }

  componentDidMount() {
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      fetch('/api/account/verify?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token,
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false,
            });
          }
        });
    } else {
      this.setState({
        isLoading: false,
      });
    }
  }

  onTextboxChangeSignInEmail(event) {
    this.setState({
      signInEmail: event.target.value,
    });
  }

  onTextboxChangeSignInPassword(event) {
    this.setState({
      signInPassword: event.target.value,
    });
  }

  onTextboxChangeSignUpEmail(event) {
    this.setState({
      signUpEmail: event.target.value,
    });
  }

  onTextboxChangeSignUpPassword(event) {
    this.setState({
      signUpPassword: event.target.value,
    });
  }

  onSignUp() {
    // Grab state
    const {
      signUpEmail,
      signUpPassword,
    } = this.state;

    this.setState({
      isLoading: true,
    });

    // Post request to backend
    fetch('/api/account/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: signUpEmail,
        password: signUpPassword,
      }),
    }).then(res => res.json())
      .then(json => {
        console.log('json', json);
        if (json.success) {
          this.setState({
            signUpError: json.message,
            isLoading: false,
            signUpEmail: '',
            signUpPassword: '',
          });
        } else {
          this.setState({
            signUpError: json.message,
            isLoading: false,
          });
        }
      });
  }

  onSignIn() {
    // Grab state
    const {
      signInEmail,
      signInPassword,
    } = this.state;

    this.setState({
      isLoading: true,
    });

    // Post request to backend
    fetch('/api/account/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword,
      }),
    }).then(res => res.json())
      .then(json => {
        console.log('json', json);
        this.setState({
          mail:this.state.signInEmail
        })
        if (json.success) {
          setInStorage('the_main_app', { token: json.token });
          this.setState({
            signInError: json.message,
            isLoading: false,
            signInPassword: '',
            signInEmail: '',
            token: json.token,
          });
        } else {
          this.setState({
            signInError: json.message,
            isLoading: false,
          });
        }
      });
      console.log(this.state.signInEmail);
  }

  logout() {
    this.setState({
      isLoading: true,
    });
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      fetch('/api/account/logout?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token: '',
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false,
            });
          }
        });
    } else {
      this.setState({
        isLoading: false,
      });
    }
  }
  goToDoctor(){
    this.setState({
      doctor:true
    })
  }
  backToHome(){
    this.setState({
      doctor:false
    })
  }
  render() {
    const {
      isLoading,
      token,
      signInError,
      signInEmail,
      signInPassword,
      signUpEmail,
      signUpPassword,
      signUpError,
      doctor
    } = this.state;
    if(doctor){
      return(
        <div>
     {/* <Doctor/>
      <button onClick={this.backToHome}>Back to Home</button>*/}
      <br/><br/>
      <VizGraphs type={1}/>
      </div>
      )
    }
    if (isLoading) {
      return (<div class="center">
        
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
      <button class="buttonload">
        <i class="fa fa-circle-o-notch fa-spin"></i>Loading..
      </button>
    </div>);    {/*(<div><p>Loading...</p></div>);*/}
    }

    if (!token) {
      return (
        <div>
          
            






          <div className="form">

            {/*TO BE INCLUDED EVERYWHERE*/}
					    <div class="navi-bar">
			  				<ul class="menbar">
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
		
          

          <div>
            {
              (signInError) ? (
                <p>{signInError}</p>
              ) : (null)
            }
            <p>Sign In</p>
            <input
              type="email"
              placeholder="Email"
              value={signInEmail}
              onChange={this.onTextboxChangeSignInEmail}
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              value={signInPassword}
              onChange={this.onTextboxChangeSignInPassword}
            />
            <br />
            <button onClick={this.onSignIn}>Sign In</button>
          </div>
          <br />
          <br />
          <div>
            {
              (signUpError) ? (
                <p>{signUpError}</p>
              ) : (null)
            }
            <p>Sign Up</p>
            <input
              type="email"
              placeholder="Email"
              value={signUpEmail}
              onChange={this.onTextboxChangeSignUpEmail}
            /><br />
            <input
              type="password"
              placeholder="Password"
              value={signUpPassword}
              onChange={this.onTextboxChangeSignUpPassword}
            /><br />
            <button onClick={this.onSignUp}>Sign Up</button>
          </div>
          <div>
          {/*  <button onClick={this.goToDoctor}>Go to doctors page!</button>*/}
        </div>
        </div>
        </div>
      );
    }

    return (
      <div>
        <Patient email={this.state.mail}/>
        <br/>
        <button onClick={this.logout} style={{width:'300px',marginLeft:'35%',backgroundColor:'black',color:'white',height:'50px',fontSize:'30px'}}>Logout</button>
        <br/><br/><br/><br/>
        <MyForm/>
        <br/><br/>
        <VizGraphs type={2}/>
      </div>
    );
  }
}


export default Home;
