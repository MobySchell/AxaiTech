/*
PURPOSE OF THIS PAGE:
this code is for the register page on the website and handles the register of all users.
we have made a toggle switch to go between the different roles of users and certain functions
below reflect certain information needed from either a doctor or a patient
 */
import React, { Component } from 'react';
import './styles.css';
import Firebase from '../../firebase/firebase';
import ShowIf from '../ShowIf';

export default class register extends Component {
  constructor(props) {
    super(props);

    /*
    if (this.props.user) {
      this.props.history.push("/");
    }
    */

    this.auth = Firebase.auth();
    this.db = Firebase.firestore();

    // ADD: onclick of doctor button or patient button sets the role to doctor / patient respectively

    this.state = {
      firstName: '',
      surname: '',
      email: '',
      password: '',
      role: 'doctor',
      status: '',
      counter: 1,
      hpcsa: "",
      practiceNum: "",
      age: "",
      gender: "",
      diagnosis: "",
      error: "",
    };
  }
  
  /*render functions below are coded to specifically show certain fields of 
text for either a doctor or for the patient and depending on which way the switch 
is turned, certain fields of text are shown. */

  

  async register(e) {
    e.preventDefault();
    
    try {
      const { email, password } = this.state;
      await this.auth.createUserWithEmailAndPassword(email, password);

      await this.db.collection("user-roles").doc().set({
        userId: this.auth.currentUser.uid,
        role: this.state.role,
      });

      console.log(e);

      if (this.state.role === "doctor") {
        await this.db.collection("doctors").doc().set({
          userId: this.auth.currentUser.uid,
          firstName: this.state.firstName,
          surname: this.state.surname,
          hpcsa: this.state.hpcsa,
          practiceNum: this.state.practiceNum,
          status: 'pending'
        });
      }

      this.props.history.push("/status-page");
      // this.props.history.push('/');
    } catch (err) {
      this.setState({ error: err.message });
    }
  }

  render() {
    const { error } = this.state;
    return (
      <div className="container col-7 mt-2">
        <div className="p-5"></div>
        <div className="card card-body text-center">
          <form onSubmit={(e) => this.register(e)}>
            
            <h1 className="h3 mt-3 text-center">Please Register</h1>

            <div className="p-3 body">
              <input
                value={this.state.firstName}
                onChange={(e) => this.setState({
                  firstName: e.target.value,
                })}
                type="text"
                className="form-control"
                placeholder="First Name"
              />
            </div>
            <div className="p-3 body">
              <input
                value={this.state.surname}
                onChange={(e) => this.setState({
                  surname: e.target.value,
                })}
                type="text"
                className="form-control"
                placeholder="Surname"
              />
            </div>
            <div className="p-3 body">
              <input
                value={this.state.email}
                onChange={(e) => this.setState({
                  email: e.target.value,
                })}
                type="email"
                className="form-control"
                placeholder="Email Address"
              />
            </div>
            <div className="p-3 body">
              <input
                value={this.state.password}
                onChange={(e) => this.setState({
                  password: e.target.value,
                })}
                type="password"
                className="form-control"
                placeholder="Password"
              />
            </div>

            <ShowIf isTrue={error}>
              <div className="alert alert-danger mt-4">{error}</div>
            </ShowIf>

            <div className="text-center mt-4 body">
              <button className="btn btn-primary px-5" type="submit">
                Register
              </button>
            </div>
          </form>
        </div>

        <div className="p-5"></div>
      </div>
    );
  }
}
