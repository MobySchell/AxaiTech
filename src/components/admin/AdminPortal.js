import React, { Component } from "react";

import firebase from "../../firebase/firebase";
import Practitioners from "./Practitioners";
import PractitionersTable from "./PractitionersTable";
import Patients from "./Patients";
import AllPatientsTable from "./AllPatientsTable";


export default class AdminPortal extends Component {
    constructor(props) {
        super(props);

        this.db = firebase.firestore();

        this.state = { 
            practitioners: [],
            patients: []
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    async fetchData() {
        try {
            await this.db
                .collection("doctors")
                .where("status", "==", "pending")
                .onSnapshot((querySnapshot) => {
                    var practitioners = [];
                    querySnapshot.forEach((doc) => {
                        practitioners.push(Practitioners.fromFB(doc));
                    });
                    this.setState({ practitioners: practitioners });
                });
            await this.db
                .collection("patients")
                .onSnapshot((querySnapshot) => {
                    var patients = [];
                    querySnapshot.forEach((doc) => {
                        patients.push(Patients.fromFB(doc));
                    });
                    this.setState({ patients: patients });
                });
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        return (
            <div className="container">
                <div className="p-5"></div>

                <PractitionersTable practitioners={this.state.practitioners} />
                {/* <AllPatientsTable patients={this.state.patients} /> */}

                <div className="p-5"></div>
            </div>
        );
    }
}
