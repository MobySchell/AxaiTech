import React, { Component } from 'react'
import { Table, ToggleButton } from 'react-bootstrap';
import ToggleSwitch from './ToggleSwitch';

export default class AdminPortal extends Component {
  render() {
    return (
      <div className = "p-5">
        <h1 className="text-center">PENDING DOCTORS</h1>
        <Table striped bordered hover variant="dark">
  <thead>
    <tr>
      <th>#</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Practise Number</th>
      <th>HPCSA Number </th>
      <th>Approve?</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Mark</td>
      <td>Otto</td>
      <td>123456789</td>
      <td>123456789</td>
      <td>
        <ToggleSwitch Name='1' />
      </td>
    </tr>
    <tr>
      <td>2</td>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>123456789</td>
      <td>123456789</td>
      <td>
        <ToggleSwitch Name='2' />
      </td>
    </tr>
    <tr>
      <td>3</td>
      <td colSpan="2">Larry the Bird</td>
      <td>123456789</td>
      <td>123456789</td>
      <td>
        <ToggleSwitch Name='3' />
      </td>
    </tr>
  </tbody>
</Table>
      </div>

      
    )
  }
}
