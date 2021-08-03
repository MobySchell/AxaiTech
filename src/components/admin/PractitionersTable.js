import React, { Component } from "react";
import { Table } from "react-bootstrap";
import ToggleSwitch from "../ToggleSwitch";

export default class PractitionersTable extends Component {
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
                            <th>Approve?</th>
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
                                        <ToggleSwitch Name="1" />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>
        );
    }
}
