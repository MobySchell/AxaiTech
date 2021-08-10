import React, { Component } from "react";
import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import firebase from "../../firebase/firebase";

export default class PractitionersTable extends Component {
    constructor(props) {
        super(props);

        this.db = firebase.firestore();
        this.state = {
            practitioner: {},
            denyMessage: "",
        };
    }

    grabId(practitioner) {
        this.setState({
            practitioner,
        });

        console.log("clicked");
    }

    async denyPractitioner() {
        try {
            await this.db
                .collection("doctors")
                .doc(this.state.practitioner.id)
                .update({
                    denyMessage: this.state.denyMessage,
                    status: "denied",
                });

            this.setState({ denyMessage: "", practitioner: {} });
        } catch (err) {
            console.log(err);
        }
    }
    async approvePractitioner() {
        try {
            await this.db
                .collection("doctors")
                .doc(this.state.practitioner.id)
                .update({
                    status: "approved",
                });

            this.setState({ practitioner: {} });
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        const { practitioner, denyMessage } = this.state;
        return (
            <div className="p-2">
                <h1 className="text-center pb-5">PENDING DOCTORS</h1>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Practise Number</th>
                            <th>HPCSA Number </th>
                            <th>Approve?</th>
                            <th>Deny</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.practitioners.map((practitioners) => {
                            return (
                                <tr key={practitioners.id}>
                                    <td>{practitioners.firstName}</td>
                                    <td>{practitioners.surName}</td>
                                    <td>{practitioners.hpcsa}</td>
                                    <td>{practitioners.practiceNum}</td>
                                    <td>
                                        <button
                                            type="button"
                                            className="btn btn-outline-success"
                                            data-bs-toggle="modal"
                                            data-bs-target="#approveModal"
                                            onClick={() => {
                                                this.grabId(practitioners);
                                            }}
                                        >
                                            Yes
                                        </button>
                                    </td>

                                    <td>
                                        <button
                                            type="button"
                                            className="btn btn-outline-danger"
                                            data-bs-toggle="modal"
                                            data-bs-target="#denyModal"
                                            onClick={() => {
                                                this.grabId(practitioners);
                                            }}
                                        >
                                            deny
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
                <div
                    className="modal fade"
                    id="denyModal"
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5
                                    className="modal-title"
                                    id="exampleModalLabel"
                                >
                                    {practitioner.firstName}
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>

                            <div className="modal-body">
                                <textarea
                                    value={denyMessage}
                                    onChange={(e) =>
                                        this.setState({
                                            denyMessage: e.target.value,
                                        })
                                    }
                                ></textarea>
                            </div>

                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                >
                                    Close
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    data-bs-dismiss="modal"
                                    onClick={() => this.denyPractitioner()}
                                >
                                    Save changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="modal fade"
                    id="approveModal"
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5
                                    className="modal-title"
                                    id="exampleModalLabel"
                                >
                                    {practitioner.firstName}
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>

                            <div className="modal-body"></div>

                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                >
                                    Close
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    data-bs-dismiss="modal"
                                    onClick={() => this.approvePractitioner()}
                                >
                                    Save changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
