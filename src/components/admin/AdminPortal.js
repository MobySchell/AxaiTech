import React, { Component } from 'react'

import firebase from "../../firebase/firebase";
import Practitioners from "./Practitioners";
import PractitionersTable from "./PractitionersTable";

export default class AdminPortal extends Component {
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
            .onSnapshot((querySnapshot) => {
              var practitioners = [];
              querySnapshot.forEach((doc) => {
                practitioners.push(Practitioners.fromFB(doc));
              });
              this.setState({ practitioners: practitioners });
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

        <div className="p-5"></div>
      </div>
    )
  }
}
