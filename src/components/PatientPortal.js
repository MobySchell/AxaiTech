// import pic from '../images/BelindaDoc.jpg';
import React, { Component } from "react";
import firebase from "../firebase/firebase";
import "firebase/firestore";
import doctorprofile from "../images/doctorprofile.jpg";
import { Table } from "react-bootstrap";
import PatientTestTable from "./PatientTestTable";

export default class PatientPortal extends Component {
    constructor(props) {
        super(props);
        this.db = firebase.firestore();
        this.auth = firebase.auth();
        this.state = {
            details: [],
            name: "",
            surname: "",
            email: "",
            password: "",
            age: "",
            gender: "",
            diagnosis: "",
            tests: ""
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
            console.log(doc.data().userId);
            this.setState({
                id: doc.data().userId,
            });
        });
    }

    async getUserDetails(id) {
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
                console.log(doc.data());
                console.log(doc.data().firstName);
                this.setState({
                    name: doc.data().firstName,
                    surname: doc.data().surname,
                    age: doc.data().age,
                    gender: doc.data().gender,
                    diagnosis: doc.data().diagnosis,
                    tests: patientTests
                });
            });

            console.log("User");
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        const imagestyle = {
            width: "300px",
            height: "300px",
        };

        const isNull = this.state.tests === null;
        const display = isNull ? "block" : "none";

        return (

            <div className="p-5">
                <h1 className="text-center">PATIENT PORTAL</h1>
                <div className="card mb-3">
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img
                                style={imagestyle}
                                className="img-fluid img-thumbnail rounded-circle"
                                src={doctorprofile}
                                alt="..."
                            />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">
                                    {this.state.name} {this.state.surname}{" "}
                                </h5>
                                <p className="card-text text-dark">
                                    Doctor/Oncologist: <em>Dr. Joshua Schell</em>
                                </p>
                                <p className="card-text text-dark">
                                    Age:{" "}
                                    <em> {this.state.age} </em>
                                </p>
                                <p className="card-text text-dark">
                                    Gender:{" "}
                                    <em>{this.state.gender}</em>
                                </p>
                                <p className="card-text text-dark">
                                    Diagnosis: <em> {this.state.diagnosis} </em>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <PatientTestTable tests={this.state.tests} />
            </div>
        );
    }
}


/*
export default class PatientPortal extends Component {

    //TODO: fill this page according to instructions from AxaiTech
    constructor(props){
        super(props);

        // this.db = firebase.firestore();
        // this.auth = firebase.auth();

        this.state = {
                firstName: '',
                surname: '',
                email: '',
                password: '',
                width: '12.5%'
                // width percentages should be 12.5, 25, 37.5, 50, 62.5, 75, 87.5, and 100 corresponding with all checkpoints
        }
    }

    render() {
        return (
            <div className="text-white">
                <div className="p-5">
                    <h1 className="title">Welcome User</h1>
                    <div className="row">
                        <div className="col-3"></div>
                        <div className="p-2 col-6">
                            <p>
                                Documentation
                            </p>

                            Progress: 
                            <div class="progress">

                                <div class="progress-bar progress-bar-striped bg-success progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{width: this.state.width}}></div>
                            </div>
                            <p>
                                Messages from your provider
                            </p>
                        </div>
                        <div className="p-5"></div>
                    </div>
                </div>
            </div>
        )
    }
}
*/
