/*
PURPOSE OF THIS PAGE:
this code is for the register page on the website and handles the register of all users.
we have made a toggle switch to go between the different roles of users and certain functions
below reflect certain information needed from either a doctor or a patient
 */
import React, { Component } from "react";
import "./styles.css";
import Firebase from "../../firebase/firebase";
import ShowIf from "../ShowIf";

export default class register extends Component {
  constructor(props) {
    super(props);

    if (this.props.user) {
      this.props.history.push("/");
    }

    this.auth = Firebase.auth();
    this.db = Firebase.firestore();

    this.state = {
      firstName: "",
      surname: "",
      email: "",
      password: "",
      // role: 'patient',
      role: "doctor",
      status: "",
      counter: 1,
      hpcsa: "",
      practiceNum: "",
      age: "",
      gender: "",
      diagnosis: "",
      error: "",
    };
  }
  onNameChanged(e) {
    this.setState({
      firstName: e.target.value,
    });
  }
  onSurnameChanged(e) {
    this.setState({
      surname: e.target.value,
    });
  }
  onEmailChanged(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onPasswordChanged(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onHPCSAChanged(e) {
    this.setState({
      hpcsa: e.target.value,
    });
  }

  onPracticeNumChanged(e) {
    this.setState({
      practiceNum: e.target.value,
    });
  }

  onAgeChanged(e) {
    this.setState({
      age: e.target.value,
    });
  }

  onGenderChanged(e) {
    this.setState({
      gender: e.target.value,
    });
  }

  onDiagnosisChanged(e) {
    this.setState({
      diagnosis: e.target.value,
    });
  }

  /*
  toggleSwitch() {

    let count = this.state.counter;

    this.setState({counter: count + 1})

    if (this.state.counter % 2 === 1) {
        this.setState({
          role: 'doctor'
      });
    } else {
      this.setState({
          role: 'patient'
      });
    }
  }
*/

  /*render functions below are coded to specifically show certain fields of 
text for either a doctor or for the patient and depending on which way the switch 
is turned, certain fields of text are shown. */

  renderHPCSA() {
    if (this.state.role === "patient") {
      return;
    }
    return (
      <div className="p-3 body">
        <input
          value={this.state.hpcsa}
          onChange={(e) => this.onHPCSAChanged(e)}
          type="text"
          className="form-control"
          placeholder="HPCSA Number"
        />
      </div>
    );
  }

  renderPracticeNum() {
    if (this.state.role === "patient") {
      return;
    }
    return (
      <div className="p-3 body">
        <input
          value={this.state.practiceNum}
          onChange={(e) => this.onPracticeNumChanged(e)}
          type="text"
          className="form-control"
          placeholder="Practice Number"
        />
      </div>
    );
  }

  renderAge() {
    if (this.state.role === "doctor") {
      return;
    }
    return (
      <div className="p-3 body">
        <input
          value={this.state.age}
          onChange={(e) => this.onAgeChanged(e)}
          type="number"
          className="form-control"
          placeholder="Age"
        />
      </div>
    );
  }

  renderGender() {
    if (this.state.role === "doctor") {
      return;
    }
    return (
      <div className="p-3 body">
        <input
          value={this.state.gender}
          onChange={(e) => this.onGenderChanged(e)}
          type="text"
          className="form-control"
          placeholder="Gender"
        />
      </div>
    );
  }

  renderDiagnosis() {
    if (this.state.role === "doctor") {
      return;
    }
    return (
      <div className="p-3 body">
        <input
          value={this.state.diagnosis}
          onChange={(e) => this.onDiagnosisChanged(e)}
          type="text"
          className="form-control"
          placeholder="Primary Diagnosis"
        />
      </div>
    );
  }

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

      if (this.state.role === "patient") {
        await this.db.collection("patients").doc().set({
          userId: this.auth.currentUser.uid,
          age: this.state.age,
          diagnosis: this.state.diagnosis,
          firstName: this.state.firstName,
          surname: this.state.surname,
        });
      }

      if (this.state.role === "doctor") {
        await this.db.collection("doctors").doc().set({
          userId: this.auth.currentUser.uid,
          firstName: this.state.firstName,
          surname: this.state.surname,
          hpcsa: this.state.hpcsa,
          practiceNum: this.state.practiceNum,
          status: "pending",
        });
      }

      this.props.history.push("/doctor-portal");
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

            <div className="row">
              <p className="black col-7">Click Here if a Physician</p>
              <div className="form-check form-switch text-center col-5">
                <input // onClick={()=> this.toggleSwitch()}
                  className="form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckDefault"
                />
              </div>
            </div>

            <div className="p-3 body">
              <input
                value={this.state.firstName}
                onChange={(e) => this.onNameChanged(e)}
                type="text"
                className="form-control"
                placeholder="First Name"
              />
            </div>
            <div className="p-3 body">
              <input
                value={this.state.surname}
                onChange={(e) => this.onSurnameChanged(e)}
                type="text"
                className="form-control"
                placeholder="Surname"
              />
            </div>
            <div className="p-3 body">
              <input
                value={this.state.email}
                onChange={(e) => this.onEmailChanged(e)}
                type="email"
                className="form-control"
                placeholder="Email Address"
              />
            </div>
            <div className="p-3 body">
              <input
                value={this.state.password}
                onChange={(e) => this.onPasswordChanged(e)}
                type="password"
                className="form-control"
                placeholder="Password"
              />
            </div>
            {this.renderAge()}
            {this.renderGender()}
            {this.renderDiagnosis()}
            {this.renderHPCSA()}
            {this.renderPracticeNum()}

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
