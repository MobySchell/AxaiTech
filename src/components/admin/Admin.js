import "bootstrap/dist/css/bootstrap.css";
import React, { Component } from "react";

import firebase from "../../firebase/firebase";
import Practitioners from "./modal/Practitioners";
import PractitionersTable from "./PractitionersTable";

export default class Admin extends Component {
    constructor(props) {
        super(props);

        this.db = firebase.firestore();

        this.state = { practitioners: [] };
    }

    componentDidMount() {
        this.fetchData();
    }

    async fetchData() {
        try {
            const snapshot = await this.db
                .collection("doctors")
                .where("status", "==", "pending")
                .get();
            const practitioners = snapshot.docs.map((doc) =>
                Practitioners.fromFB(doc)
            );

            this.setState({ practitioners: practitioners });
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        return (
            <div className="container">
                <div className="p-5"></div>

                <PractitionersTable practitioners={this.state.practitioners} />

                <div className="p-5"></div>
            </div>
        );
    }
}
