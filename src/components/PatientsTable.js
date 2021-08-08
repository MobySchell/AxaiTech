import React, { Component } from "react";
import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import firebase from "../firebase/firebase"

export default class PatientsTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
          patients: []
      }; 

        this.db = firebase.firestore();
    }

    componentDidMount() {
      this.loopPatients(this.props.patients);
      console.log("component did mount 2")
      /*
      this.auth.onAuthStateChanged((user) => {
          this.setState({ user: user });
          if (user !== null) {
              this.getRoleStatus(user.uid);
              this.getUserDetails(user.uid);
          }
      });
      */
    }

    async getUserDetails(id) {
      try {
          const detz = await this.db
              .collection("patients")
              .where("userId", "==", id)
              .get();
          detz.forEach((doc) => {
              // console.log(doc.data());
              // console.log(doc.data().firstName);
              var newStateArray = this.state.patients.slice();
              newStateArray.push(
                {
                    name: doc.data().firstName,
                    surname: doc.data().surname,
                    age: doc.data().age,
                    gender: doc.data().gender,
                    diagnosis: doc.data().diagnosis,
                }
              );
              this.setState(
                {patients: newStateArray}
              );


                  /*
                this.state.patients.push({
                  name: doc.data().firstName,
                  surname: doc.data().surname,
                  age: doc.data().age,
                  gender: doc.data().gender,
                  diagnosis: doc.data().diagnosis,
              })
              */
          });
          console.log(this.state.patients)

          //console.log("User");
      } catch (err) {
          console.log(err);
      }
    }

    loopPatients(patients) {
      for (var i = 0; i < patients.length; i++) {
        // console.log(patients[i]);
        this.getUserDetails(patients[i]);
        //Do something
      }
      // patients.map((patient) => {
      //   this.getUserDetails(patient)
      // })
    }


    render() {
        return (
            <div className="p-2">
                <h1 className="text-center pb-5">LIST OF PATIENTS</h1>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Diagnosis</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.patients.map((patients) => {
                            // await getUserDetails(patients);

                            return (
                                <tr key={patients}>
                                    <td>{patients.name}</td>
                                    <td>{patients.surname}</td>
                                    <td>{patients.age}</td>
                                    <td>{patients.gender}</td> 
                                    <td>{patients.diagnosis}</td>                       
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>
        );
    }
}
