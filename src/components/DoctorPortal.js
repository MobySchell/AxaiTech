// import pic from '../images/BelindaDoc.jpg';
import React, { Component } from "react";
import firebase from "../firebase/firebase";
import "firebase/firestore";
//import doctorprofile from "../images/doctorprofile.jpg";
import AddImg from "./AddImg";

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
                .collection("doctors")
                .where("userId", "==", id)
                .get();
            detz.forEach((doc) => {
                console.log(doc.data());
                console.log(doc.data().firstName);
                this.setState({
                    name: doc.data().firstName,
                    surname: doc.data().surname,
                    practiceNum: doc.data().practiceNum,
                    status: doc.data().status,
                    hpcsa: doc.data().hpcsa,
                });
            });

            console.log("User");
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        // const imagestyle = {
        //     width: "300px",
        //     height: "300px",
        // };
        const {name, surname, status, practiceNum, hpcsa} = this.state;
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
                <table className="table mt-2 bg-light">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Patient name</th>
                            <th>Date exmained</th>
                            <th>Test results</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>1</th>
                            <td>Mark Shoeman</td>
                            <td>25/06/2021</td>
                            <td>Ready</td>
                            <td>Download</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
