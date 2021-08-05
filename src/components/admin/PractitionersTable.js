import React, { Component } from 'react'
import { Table } from 'react-bootstrap';
import ToggleSwitch from '../ToggleSwitch';
import ToggleButton from 'react-bootstrap/ToggleButton'
import Toggle from 'react-bootstrap-toggle';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import firebase from '../../firebase/firebase'


export default class PractitionersTable extends Component {

    constructor(props) {
        super(props);

        this.db = firebase.firestore();
        this.state = {
            pract: [],
            practitioner: {},
            denyMessage: "",
        };
    }

    componentWillReceiveProps(props) {
        this.setState({
            pract: props.practitioners,
        })
    }

    grabId(practitioner) {
        this.setState({
            practitioner,
        });

        console.log("clicked");
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
    return (
        <div className="p-5">
                <h1 className="text-center pb-5">PENDING DOCTORS</h1>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Practise Number</th>
                            <th>HPCSA Number </th>
                            <th>ID Number</th>
                            <th>Approve?</th>
                            <th>Deny</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.practitioners.map((practitioners) => {
                            const id = practitioners.id;
                            const status = practitioners.status;
                            const users = this.state.users
                            // users.push = status;
                            return (
                                <tr key={practitioners.id}>
                                    <td>{practitioners.firstName}</td>
                                    <td>{practitioners.surName}</td>
                                    <td>{practitioners.hpcsa}</td>
                                    <td>{practitioners.practiceNum}</td>
                                    <td>{practitioners.id}</td>
                                    <td>
                                        <button
                                            type="button"
                                            className="btn btn-outline-success"
                                            data-bs-toggle="modal"
                                            data-bs-target="#approveModal"
                                            // value={[practitioners.id]}
                                            onClick={() => {
                                                this.grabId(practitioners);
                                            }}
                                        >
                                            Yes
                                        </button>
                                    </td>
                                    <td style={{ color: 'red' }}>X</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
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
                                    Approve this doctor?
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
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
                                    onClick={() => this.approvePractitioner()}
                                >
                                    Yes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
  }
}
