import React, { Component } from "react";
import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import firebase from "../firebase/firebase";
import { Link } from "react-router-dom";
import AddImg from "../components/AddImg";
import AddPatient from "./AddPatient";

export default class PatientsTable extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      patients: [],
      selectedId: null,
      report: "https://firebasestorage.googleapis.com/v0/b/axai-tech.appspot.com/o/reports%2FAxaitech_Med_v2.pdf?alt=media&token=0def6eaa-6a51-49c5-a28b-d3b04e2fd133"
    };

    this.db = firebase.firestore();
    this.auth = firebase.auth();
  }


  handleClick = selectedId => {
    this.setState({
      selectedId
    });
  };

  render() {
    return (
      <div className="p-2">
        <h1 className="text-center pb-5">List of Patients</h1>
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                              Add Patient
                            </button>
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

              const isActive = patients.id === this.state.selectedId;
              const display = isActive ? "block" : "none";

              return (
                <>
                <tr onClick={() => this.handleClick(patients.id)}>
                    <td>{patients.name}</td>
                    <td>{patients.surname}</td>
                    <td>{patients.age}</td>
                    <td>{patients.gender}</td>
                    <td>{patients.diagnosis}</td>
                    <td>
                        <Link
                                    className="btn btn-primary"
                                    to={{
                                        pathname: "/request-test",
                                        // className: "btn btn-primary"
                                        testProps: {
                                        patient: patients,
                                        doctor: this.props.doctor,
                                        },
                                    }}
                                    >
                                    Request Test
                                    </Link>
                    </td>
                </tr>
                <tr>
                    <td colspan={6}>
                        <Table style={{ display }}>
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
                                    var date = test.requestDate.toDate();
                                    date = date.toString();
                                    return (
                                        <tr>
                                            <td>{index + 1}</td>
                                                <td>{test.diagnosis}</td>
                                                <td>{date}</td>
                                                <td>{test.status}</td>
                                                <td>
                                                    <a target="_blank" href= {this.state.report} rel="noreferrer">
                                                        <button type="button" className="btn btn-success m-1">View</button>
                                                    </a>
                                                </td>
                                                <td>
                                                    <button type="button" className="btn btn-warning m-1" data-bs-toggle="modal" data-bs-target="#exampleModal2">Share
                                                    </button>
                                                </td>
                                        </tr>
                                     );
                                })}
                            </tbody>
                        </Table>
                    </td>
                </tr>
                </>
              );
            })}
          </tbody>
        </Table>
                          

                            <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                              <div className="modal-dialog">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Doctor</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                  </div>
                                  <div className="modal-body">
                                    <AddPatient />
                                  </div>
                                  <div className="modal-footer">
                                    {/* <button type="button" className="btn btn-primary">Send report</button> */}
                                  </div>
                                </div>
                              </div>
                            </div>
                        <div className="modal fade" id="exampleModal2" aria-hidden="true">
                          <div className="modal-dialog">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Doctor</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div className="modal-body">
                                <AddPatient />
                                
                              </div>
                              <div className="modal-footer">
                                {/* <button type="button" className="btn btn-primary">Send report</button> */}
                              </div>
                            </div>
                          </div>
                        </div>
                    </div>
                     );
  }
}
