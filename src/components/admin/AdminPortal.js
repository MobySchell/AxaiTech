import React, { Component } from "react";

import firebase from "../../firebase/firebase";
import Practitioners from "./Practitioners";
import DeniedPractitioners from "./DeniedPractitioners";
import PractitionersTable from "./PractitionersTable";
import DeniedPractitionersTable from "./DeniedPractitionersTable";

export default class AdminPortal extends Component {
    constructor(props) {
        super(props);

        this.db = firebase.firestore();

        this.state = { practitioners: [], deniedPractitioners: [] };
    }

    componentDidMount() {
        this.fetchData();
        this.denyData();
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

    async denyData() {
        try {
            await this.db
                .collection("doctors")
                .where("status", "==", "denied")
                .onSnapshot((querySnapshot) => {
                    var deniedPractitioners = [];
                    querySnapshot.forEach((doc) => {
                        deniedPractitioners.push(
                            DeniedPractitioners.fromFB(doc)
                        );
                    });
                    this.setState({ deniedPractitioners: deniedPractitioners });
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
                <DeniedPractitionersTable
                    deniedPractitioners={this.state.deniedPractitioners}
                />

                <div className="p-5"></div>
            </div>
        );
    }
}
