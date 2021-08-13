// import pic from '../images/BelindaDoc.jpg';
import React, { Component } from "react";
import firebase from "../firebase/firebase";
import "firebase/firestore";
//import doctorprofile from "../
import PatientsTable from "./PatientsTable";
import AddImg from "../components/AddImg";
import AddPatient from "./AddPatient";

export default class DoctorPortal extends Component {
    constructor(props) {
        super(props);
        this.db = firebase.firestore();
        this.auth = firebase.auth();
        this.state = {
            details: [],
            name: "",
            surname: "",
            practiceNum: "",
            email: "",
            user: "",
            id: "",
            hpcsa: "",
            status: "",
            patientlist: [],
            patients: [],
            report: "https://firebasestorage.googleapis.com/v0/b/axai-tech.appspot.com/o/reports%2FAxaitech_Med_v2.pdf?alt=media&token=0def6eaa-6a51-49c5-a28b-d3b04e2fd133"
        };
    }
  
  componentDidMount() {
    this.auth.onAuthStateChanged((user) => {
      this.setState({ user: user });
      if (user !== null) {
        this.getRoleStatus(user.uid);
        this.getUserDetails(user.uid);
      }
    });
  }

 

  

    async getRoleStatus(userUid) {
        const snap1 = await this.db
            .collection("user-roles")
            .where("userId", "==", userUid)
            .get();
        snap1.forEach((doc) => {
            this.setState({
                id: doc.data().userId,
            });
        });
    }

    async getUserDetails(id) {
        try {
            const detz = await this.db
                .collection("doctors")
                .where("userId", "==", id)
                .get();
            detz.forEach((doc) => {
                this.setState({
                    name: doc.data().firstName,
                    surname: doc.data().surname,
                    practiceNum: doc.data().practiceNum,
                    status: doc.data().status,
                    hpcsa: doc.data().hpcsa,
                    patientlist: doc.data().patientlist,
                    userId: doc.data().userId
                });
            });
            this.loopPatients(this.state.patientlist)
        } catch (err) {
            console.log(err);
        }
    }

    async getPatientDetails(id) {
        console.log("get patient details got fired");
        try {
            const detz = await this.db
                .collection("patients")
                .where("userId", "==", id)
                .get();
            const tests = await this.db
                .collection("tests")
                .where("patientId", "==", id)
                .get();
            var patientTests = []
            tests.forEach((doc) => {
                patientTests.push(doc.data())
            });
            detz.forEach((doc) => {
                var newStateArray = this.state.patients.slice();
                newStateArray.push(
                  {
                      id: doc.data().userId,
                      name: doc.data().firstName,
                      surname: doc.data().surname,
                      age: doc.data().age,
                      gender: doc.data().gender,
                      diagnosis: doc.data().diagnosis,
                      tests: patientTests
                  }
                );
                this.setState(
                  {patients: newStateArray}
                );
            });
            console.log(this.state.patients)
        } catch (err) {
            console.log(err);
        }
      }
  
    loopPatients() {
        console.log("loop patients got fired");
        const patients = this.state.patientlist;
        console.log(patients);
        for (var i = 0; i < patients.length; i++) {
            this.getPatientDetails(patients[i]);
            console.log(patients[i]);
        }
    }

    render() {
        const {name, surname, status, practiceNum, hpcsa, report} = this.state;
        return (
            <div className="p-5">
                <h1 className="text-center">DOCTORS PORTAL</h1>
                <div className="card mb-3">
                    <div className="row g-0">
                        <div className="col-md-4">
                            <AddImg />

                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">
                                    {name} {surname}{" "}
                                </h5>
                                <p className="card-text text-dark">
                                    Occupation: <em>Oncologist</em>
                                </p>
                                <p className="card-text text-dark">
                                    Status:{" "}
                                    <em style={{ color: "limegreen" }}>
                                        {status}
                                    </em>
                                </p>
                                <p className="card-text text-dark">
                                    Practise Number:{" "}
                                    <em>{practiceNum}</em>
                                </p>
                                <p className="card-text text-dark">
                                    HPCSA number: <em> {hpcsa} </em>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <PatientsTable patients={this.state.patients} doctor={this.state.id}
                />
            </div>
        );
    }
}
