import React, { Component } from "react";
import firebase from "../firebase/firebase";
import "firebase/firestore";
import { Card, Button } from "react-bootstrap";

export default class DoctorPortal extends Component {
    constructor(props) {
        super(props);
        this.db = firebase.firestore();
        this.auth = firebase.auth();
        this.state = {
            details: [],
            name: "",
            surname: "",
            practiceNum: "",
            email: "",
            user: "",
            id: "",
            hpcsa: "",
            status: "",
        };
    }

    componentDidMount() {
        this.auth.onAuthStateChanged((user) => {
            this.setState({ user: user });
            if (user !== null) {
                this.getRoleStatus(user.uid);
                this.getUserDetails(user.uid);
            }
        });
    }

    async getRoleStatus(userUid) {
        const snap1 = await this.db
            .collection("user-roles")
            .where("userId", "==", userUid)
            .get();
        snap1.forEach((doc) => {
            console.log(doc.data().userId);
            this.setState({
                id: doc.data().userId,
            });
        });
    }

    async getUserDetails(id) {
        try {
            const detz = await this.db
                .collection("doctors")
                .where("userId", "==", id)
                .get();
            detz.forEach((doc) => {
                console.log(doc.data());
                console.log(doc.data().firstName);
                this.setState({
                    name: doc.data().firstName,
                    surname: doc.data().surname,
                    practiceNum: doc.data().practiceNum,
                    status: doc.data().status,
                    hpcsa: doc.data().hpcsa,
                });
            });

            console.log("User");
        } catch (err) {
            console.log(err);
        }
    }

    routeHome() {
        this.props.history.push("/");
    }

    render() {
        return (
            //TODO: fill this page according to instructions from AxaiTech
            <div className="p-5">
                <h1 className="text-center">STATUS PAGE</h1>
                <Card className="text-center">
                    <Card.Header>
                        {this.state.name} {this.state.surname}
                    </Card.Header>
                    <Card.Body>
                        <p className="card-text text-dark">
                            Occupation: <em>Oncologist</em>
                        </p>
                        <p className="card-text text-dark">
                            Practise Number (to be confirmed):{" "}
                            <em>{this.state.practiceNum}</em>
                        </p>
                        <p className="card-text text-dark">
                            HPCSA Number (to be confirmed):{" "}
                            <em> {this.state.hpcsa} </em>
                        </p>
                        <p className="card-text text-dark">
                            Status:{" "}
                            <em style={{ color: "red" }}>
                                {" "}
                                {this.state.status}
                            </em>
                        </p>
                        <Button
                            variant="primary"
                            onClick={() => this.routeHome()}
                        >
                            Go to Home
                        </Button>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}
