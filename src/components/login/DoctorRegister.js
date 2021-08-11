import React, { Component } from "react";
import firebase from "../../firebase/firebase";

export default class DoctorRegister extends Component {
    constructor(props) {
        super(props);

        this.auth = firebase.auth();
        this.db = firebase.firestore();

        this.state = {
            firstName: "",
            surname: "",
            email: "",
            password: "",
            age: "",
            gender: "",
            diagnosis: "",
            hpcsa: "",
            practiceNum: "",
            role: "doctor",
        };
    }

    async register(e) {
        e.preventDefault();

        try {
            const { email, password } = this.state;
            await this.auth.createUserWithEmailAndPassword(email, password);

            await this.db.collection("user-roles").doc().set({
                userId: this.auth.currentUser.uid,
                role: this.state.role,
            });

            console.log(e);

            if (this.state.role === "doctor") {
                await this.db.collection("doctors").doc().set({
                    userId: this.auth.currentUser.uid,
                    email: this.state.email,
                    firstName: this.state.firstName,
                    surname: this.state.surname,
                    hpcsa: this.state.hpcsa,
                    practiceNum: this.state.practiceNum,
                    status: "pending",
                });
            }

            this.props.history.push("/status-page");
        } catch (err) {
            this.setState({ error: err.message });
        }
    }

    render() {
        return (
            <div className="container col-7 mt-2">
                <div className="p-5"></div>
                <div className="card card-body text-center">
                    <form onSubmit={(e) => this.register(e)}>
                        <h1 className="h3 mt-3 text-center">Please Register</h1>
                        <div className="p-3 body">
                            <input
                                value={this.state.firstName}
                                onChange={(e) =>
                                    this.setState({
                                        firstName: e.target.value,
                                    })
                                }
                                type="text"
                                className="form-control"
                                placeholder="First Name"
                            />
                        </div>
                        <div className="p-3 body">
                            <input
                                value={this.state.surname}
                                onChange={(e) =>
                                    this.setState({
                                        surname: e.target.value,
                                    })
                                }
                                type="text"
                                className="form-control"
                                placeholder="Surname"
                            />
                        </div>
                        <div className="p-3 body">
                            <input
                                value={this.state.email}
                                onChange={(e) =>
                                    this.setState({
                                        email: e.target.value,
                                    })
                                }
                                type="email"
                                className="form-control"
                                placeholder="Email Address"
                            />
                        </div>
                        <div className="p-3 body">
                            <input
                                value={this.state.password}
                                onChange={(e) =>
                                    this.setState({
                                        password: e.target.value,
                                    })
                                }
                                type="password"
                                className="form-control"
                                placeholder="Password"
                            />
                        </div>
                        <div className="p-3 body">
                            <input
                                value={this.state.hpcsa}
                                onChange={(e) =>
                                    this.setState({
                                        hpcsa: e.target.value,
                                    })
                                }
                                type="text"
                                className="form-control"
                                placeholder="HPCSA Number"
                            />
                        </div>
                        <div className="p-3 body">
                            <input
                                value={this.state.practiceNum}
                                onChange={(e) =>
                                    this.setState({
                                        practiceNum: e.target.value,
                                    })
                                }
                                type="text"
                                className="form-control"
                                placeholder="Practice Number"
                            />
                        </div>
                        <div className="text-center mt-4 body">
                            <button
                                className="btn btn-primary px-5"
                                type="submit"
                            >
                                Register
                            </button>
                        </div>
                    </form>
                </div>
                <div className="p-5"></div>
            </div>
        );
    }
}
