import React, { Component } from "react";
import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

export default class PatientTestTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
          details: [],
        };
    }

    render() {
        const tests = this.props.tests;
        return (
            <div className="p-2">
                <h1 className="text-center pb-5">LIST OF TESTS</h1>
                <Table striped bordered hover variant="dark">
                    <thead>
                      <tr>
                        <th></th>
                        <th>Test Type</th>
                        <th>Date Requested</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tests.map((test) => {
                        return (
                          <div>Hello</div>
                        );
                        })
                      }
                      
                      {/*
                        {this.props.tests.map((tests) => {
                            // var date = tests.requestDate.toDate();
                            // date = date.toString();
                            return (
                              <tr>
                              <td></td>
                                  <td>{tests.diagnosis}</td>
                                  <td>{date}</td>
                                  <td>{tests.status}</td>
                              </tr>
                            );
                        })}
                        */}
                    </tbody>
                </Table>
            </div>
        );
    }
}
