import pic from '../images/BelindaDoc.jpg';
import React, { Component } from 'react'

export default class DoctorPortal extends Component {
  render() {
    return (

      //TODO: fill this page according to instructions from AxaiTech

      <div className="p-5">
        <h1 className="text-center">DOCTOR PORTAL</h1>
        <div className="card mb-3">
          <div className="row g-0">
            <div className="col-md-4">
              <img src={pic} className="img-fluid img-thumbnail rounded-circle" alt="..." />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">DR Susan Scholtz</h5>
                <p className="card-text text-dark">Occupation: <em>Oncologist</em></p>
                <p className="card-text text-dark">Practise: <em>University of CT</em></p>
                <p className="card-text text-dark">HBSCS number: <em>20938-345</em></p>
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
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>1</th>
                <td>Mark Shoeman</td>
                <td>25/06/2021</td>
                <td>Ready</td>
                <td>
                  Download
                </td>
              </tr>
            </tbody>
          </table>
      </div>
    )
  }
}
