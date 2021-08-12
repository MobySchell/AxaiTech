import React, { Component } from "react";
import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import firebase from "../firebase/firebase"
import { Link } from "react-router-dom";
import "./component styles/ExpandableTable.css";


export default class PatientsTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
          patients: []
      }; 

        this.db = firebase.firestore();
        this.auth = firebase.auth();
    }

    async getUserRole(userUid) {
        const snap1 = await this.db
            .collection("user-roles")
            .where("userId", "==", userUid)
            .get();
        snap1.forEach((doc) => {
            const role = doc.data().role;
            this.setState({ role: role });
            localStorage.setItem("role", role);
        });
    }

    render() {

        return (
            <div className="p-2">
                <h1 className="text-center pb-5">List of Patients</h1>
                <Table striped bordered hover variant="light">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Diagnosis</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.patients.map((patients) => {

                            return (
                                <tr>
                                    <div class="tab">
                                        <input type="checkbox" id={patients.id}/>
                                            <label class="tab-label" for={patients.id}>
                                                <td>{patients.name}</td>
                                                <td>{patients.surname}</td>
                                                <td>{patients.age}</td>
                                                <td>{patients.gender}</td> 
                                                <td>{patients.diagnosis}</td> 
                                                <td>
                                                    <Link className = "btn btn-primary" to= {{
                                                        pathname: "/request-test", 
                                                        // className: "btn btn-primary"
                                                        testProps: {
                                                            patient: patients,
                                                            doctor: this.props.doctor 
                                                        }
                                                    }}>Request Test</Link>
                                                </td>         
                                            </label>
                                        <div class="tab-content">
                                            <Table>
                                            <thead>
                                            <tr>
                                                <th></th>
                                                <th>Test Type</th>
                                                <th>Date Requested</th>
                                                <th>Status</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {patients.tests.map((test, index) => {
                                                var date = test.requestDate.toDate()
                                                date = date.toString();
                                                return (
                                                    <tr>
                                                        <th></th>
                                                        <td>{test.diagnosis}</td>
                                                        <td>{date}</td>
                                                        <td>{test.status}</td>
                                                    </tr>
                                                );
                                            })}
                                            </tbody>
                                            </Table>
                                        </div>
                                    </div>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>
        );
    }
}