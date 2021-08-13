import React, { Component } from 'react'
import firebase from "../firebase/firebase"

export default class TestForm extends Component {

    constructor(props) {
      super(props);

      this.state = {
        doctorId: "",
        patientId: "",
        name: "",
        surname: "",
        age: "",
        gender: "",
        phone: "",
        diagnosis: "",
      };

      this.db = firebase.firestore();
      this.auth = firebase.auth();
    }

    componentDidMount() {
        this.getPatientDetails(this.props.location.testProps.patient.id);
        this.setState({
          doctorId: this.props.location.testProps.doctor
        })
    }

    async getPatientDetails(id) {
      console.log("LINK get patient details got fired");
      try {
          const detz = await this.db
              .collection("patients")
              .where("userId", "==", id)
              .get();
            detz.forEach((doc) => {
                this.setState({
                  patientId: doc.data().userId,
                  email: doc.data().email,
                  name: doc.data().firstName,
                  surname: doc.data().surname,
                  age: doc.data().age,
                  gender: doc.data().gender,
                  diagnosis: doc.data().diagnosis,
                });
            });
          console.log(this.state.patients)
      } catch (err) {
          console.log(err);
      }
    }

    async addTest(e) {
      e.preventDefault();

      try {

          await this.db.collection("tests").doc().set({
              doctorId: this.state.doctorId,
              patientId: this.state.patientId,
              requestDate: new Date(),
              diagnosis: this.state.diagnosis,
              status: "In Progress"
          });

          /*
          console.log(this.state.patientId);

          await this.db.collection("patients").doc(this.state.patientId).update({
            test: {
              doctorId: this.state.doctorId,
              patientId: this.state.patientId,
              requestDate: new Date(),
              diagnosis: this.state.diagnosis,
              status: "In Progress"
            }
          })
          */

          this.props.history.push("/doctor-portal");
      } catch (err) {
          this.setState({ error: err.message });
      }
  }

    render() {

        return (
          <div className="container col-7 mt-2">
          <div className="p-5"></div>
          <div className="card card-body text-center">
         <form onSubmit={(e) => this.addTest(e)}>
        <h1 className="h3 mt-3 text-center">Patient Test Requisition</h1>

        <div className="p-2 body">
          <div class="form-group row">
            <label  class="col-sm-2 col-form-label">Name:</label>
            <div class="col-sm-10">
              <input
                type="text" 
                className="form-control-plaintext"
                id="formGroupExampleInput"
                placeholder={this.state.name + " " + this.state.surname}
              />
            </div>
          </div>
        </div>

        <div className="p-2 body">
          <div class="form-group row">
            <label  class="col-sm-2 col-form-label">Email:</label>
            <div class="col-sm-10">
              <input
                type="text" 
                className="form-control-plaintext"
                id="formGroupExampleInput"
                // placeholder= "lol" //
                placeholder={this.state.email}

              />
            </div>
          </div>
        </div>

        <div className="p-2 body">
          <div class="form-group row">
            <label  class="col-sm-2 col-form-label">Gender:</label>
            <div class="col-sm-10">
              <input
                type="text" 
                className="form-control-plaintext"
                id="formGroupExampleInput"
                // placeholder= "lol" //
                placeholder={this.state.gender}
              />
            </div>
          </div>
        </div>

        <div className="p-2 body">
          <div className="form-group row">
            <label  className="col-sm-2 col-form-label">Age:</label>
            <div className="col-sm-10">
              <input
                type="text" 
                className="form-control-plaintext"
                id="formGroupExampleInput"
                placeholder={this.state.age}
              />
            </div>
          </div>
        </div>
          
        <div className="p-2 body">
          <div className="form-group row">
            <label  className="col-sm-2 col-form-label">Phone:</label>
            <div className="col-sm-10">
              <input
                value={this.state.phone}
                onChange={(e) =>
                   this.setState({
                      phone: e.target.value,
                   })
                }
                type="text" 
                className="form-control"
                id="formGroupExampleInput"
              />
            </div>
          </div>
        </div>

        <div>
          <h1 className="h4 mt-3 text-center">Current diagnosis (check all that apply)</h1>
        </div>

        <div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1"/>
            <label className="form-check-label" for="inlineCheckbox1">NSCLC</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="checkbox" id="inlineCheckbox2" value="option1"/>
            <label className="form-check-label" for="inlineCheckbox2">Colorectal carcinoma</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="checkbox" id="inlineCheckbox3" value="option1"/>
            <label className="form-check-label" for="inlineCheckbox3">Breast</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="checkbox" id="inlineCheckbox4" value="option1"/>
            <label className="form-check-label" for="inlineCheckbox4">Melanoma</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="checkbox" id="inlineCheckbox5" value="option1"/>
            <label className="form-check-label" for="inlineCheckbox5">Ovarian</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="checkbox" id="inlineCheckbox6" value="option1"/>
            <label className="form-check-label" for="inlineCheckbox6">Other (Please complete expanded diagnosis)</label>
          </div>
        </div>

        <div className="p-2 body">
          <div className="form-group row">
            <label  className="col-sm-2 col-form-label">Expanded Diagnosis:</label>
            <div className="col-sm-10">
              <input
                value={this.state.diagnosis}
                onChange={(e) =>
                   this.setState({
                       diagnosis: e.target.value,
                   })
                }
                type="text" 
                className="form-control"
                id="formGroupExampleInput"
              />
            </div>
          </div>
        </div>
        
        <div className="text-center mt-4 body">
          <button className="btn btn-primary px-5" type="submit">
            Submit
          </button>
        </div>
        </form> 
      </div>
      </div>
    );
  }
}