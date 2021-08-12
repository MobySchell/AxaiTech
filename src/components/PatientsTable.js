import React, { Component } from "react";
import { Table, Accordion, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import firebase from "../firebase/firebase";
import { Link } from "react-router-dom";

export default class PatientsTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            patients: [],
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
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.patients.map((patients) => {
                            return (
                                <div>
                                    <Accordion>
                                        <Card>
                                            <Card.Header>
                                                <Accordion.Toggle
                                                    as={Card.Header}
                                                    eventKey="0"
                                                >
                                                    <tr key={patients.id}>
                                                        <td>{patients.name}</td>
                                                        <td>
                                                            {patients.surname}
                                                        </td>
                                                        <td>{patients.age}</td>
                                                        <td>
                                                            {patients.gender}
                                                        </td>
                                                        <td>
                                                            {patients.diagnosis}
                                                        </td>
                                                    </tr>
                                                </Accordion.Toggle>
                                            </Card.Header>
                                            <Accordion.Collapse eventKey="0">
                                                <Card.Body>
                                                    This is first tab body
                                                </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                    </Accordion>
                                </div>

                                /*
<div class="accordion" id="accordionExample">
    <div class="accordion-item">
        <h2 class="accordion-header" id={patients.id}>
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseTwo">
            Accordion Item #2
        </button>
        </h2>
        <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
        <div class="accordion-body">
            <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
        </div>
        </div>
    </div>
</div>

                                <tr key={patients.id}>
                                    <td>{patients.name}</td>
                                    <td>{patients.surname}</td>
                                    <td>{patients.age}</td>
                                    <td>{patients.gender}</td> 
                                    <td>{patients.diagnosis}</td> 
                                    {<td><Link to="/request-test" className="btn btn-primary">Request Test</Link></td>}
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
                                </tr>
                            */
                            );
                        })}
                    </tbody>
                </Table>
            </div>
        );
    }
}
