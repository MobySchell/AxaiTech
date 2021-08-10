import React, { Component } from "react";
import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import firebase from "../firebase/firebase"

export default class PatientsTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
          patients: []
      }; 

        this.db = firebase.firestore();
        this.auth = firebase.auth();
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
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.patients.map((patients) => {

                            return (
                                <tr key={patients.id}>
                                    <td>{patients.name}</td>
                                    <td>{patients.surname}</td>
                                    <td>{patients.age}</td>
                                    <td>{patients.gender}</td> 
                                    <td>{patients.diagnosis}</td>                       
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>
        );
    }
}
