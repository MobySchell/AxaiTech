// import pic from '../images/BelindaDoc.jpg';
import React, { Component } from "react";
import firebase from "../firebase/firebase";
import "firebase/firestore";
//import doctorprofile from "../
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
                    userId: doc.data().userId
                });
            });

            console.log("User");
        } catch (err) {
            console.log(err);
        }
      
    }

    showReport() {

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
                <table className="table mt-2 bg-light">
                  <thead>
                      <tr>
                          <th>#</th>
                          <th>Patient name</th>
                          <th>Date exmained</th>
                          <th>Test results</th>
                          <th>                              
                            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                              Add Patient
                            </button>

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
                          </th>
                      </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>1</th>
                      <td>Beverly Hangman</td>
                      <td>25/06/2021</td>
                      <td>Ready</td>
                      <td className="d-flex justify-content-end">
                        <a target="_blank" href= { report} rel="noreferrer">
                          <button type="button" className="btn btn-success m-1">View</button>
                        </a>
                        <button type="button" className="btn btn-warning m-1" data-bs-toggle="modal" data-bs-target="#exampleModal2">Share
                        </button>
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
                      </td>
                    </tr>
                  </tbody>
                </table>
            </div>
        );
    }
}
