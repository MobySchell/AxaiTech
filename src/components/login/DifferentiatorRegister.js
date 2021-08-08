import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";

export default class DifferentiatorRegister extends Component {
    render() {
        return (
            <div className="container col-7 mt-2">
                <div className="p-5"></div>
                <div className="card card-body text-center">
                    <h1 className="h3 mt-3 text-center">Register As:</h1>

                    <div className="d-flex justify-content-around my-5">
                        <Link to="/doctor-register" className="btn btn-primary px-5 py-2">Doctor</Link>
                        <Link to="/patient-register" className="btn btn-primary px-5 py-2">Patient</Link>
                    </div>
                </div>
                <div className="p-5"></div>
            </div>
        );
    }
}
