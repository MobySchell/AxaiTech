import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Table } from "react-bootstrap";
import firebase from "../../firebase/firebase";

export default class DeniedPractitionersTable extends Component {
    constructor(props) {
        super(props);

        this.db = firebase.firestore();
        this.auth = firebase.auth();
        this.state = {
            practitioner: {},
        };
    }

    grabId(practitioner) {
        this.setState({
            practitioner,
        });
    }

    async removeUser() {
        try {
            await this.db
                .collection("doctors")
                .doc(this.state.practitioner.id)
                .delete();

            await this.db
                .collection("user-roles")
                .doc()
                .where("userId", "==", this.state.practitioner.userId)
                .delete();

            this.setState({ practitioner: {} });
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        const { practitioner } = this.state;
        // const user = this.auth.currentUser;
        return (
            <div>
                <div className="p-2 mt-5">
                    <h1 className="text-center pb-5">Denied Doctors</h1>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>HPCSA Number</th>
                                <th>Reason For Deny</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.deniedPractitioners.map(
                                (deniedPractitioners) => {
                                    return (
                                        <tr key={deniedPractitioners.id}>
                                            <td>
                                                {deniedPractitioners.firstName}
                                            </td>
                                            <td>
                                                {deniedPractitioners.surName}
                                            </td>
                                            <td>
                                                {deniedPractitioners.userEmail}
                                            </td>
                                            <td>{deniedPractitioners.hpcsa}</td>
                                            <td>
                                                {
                                                    deniedPractitioners.denyMessage
                                                }
                                            </td>
                                            <td>
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-danger"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#deniedModal"
                                                    onClick={() => {
                                                        this.grabId(
                                                            deniedPractitioners
                                                        );
                                                    }}
                                                >
                                                    Remove User
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                }
                            )}
                        </tbody>
                    </Table>
                    <div
                        className="modal fade"
                        id="deniedModal"
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
                                        {practitioner.firstName}{" "}
                                        {practitioner.surName}
                                    </h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                    ></button>
                                </div>

                                {/* <div className="modal-body container">Test</div> */}

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
                                        onClick={() => this.removeUser()}
                                    >
                                        Save changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
