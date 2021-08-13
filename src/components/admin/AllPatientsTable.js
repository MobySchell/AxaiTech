import React, { Component } from "react";
import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import firebase from "../../firebase/firebase";
import { Link } from "react-router-dom";

export default class AllPatientsTable extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      patients: [],
      selectedId: null
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
      </div>
    );
  }
}
