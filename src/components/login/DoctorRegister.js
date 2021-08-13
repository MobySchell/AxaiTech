import React, { Component } from "react";
import firebase from "../../firebase/firebase";
import axios from "axios";

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
            error: "",
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
            this.setState({ email: email });
            console.log(e);

            if (this.state.role === "doctor") {
                await this.db.collection("doctors").doc().set({
                    userId: this.auth.currentUser.uid,
                    email: email,
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
        this.setState({ email: "" });
    }

    handleSubmit(e) {
        this.register(e);
        e.preventDefault();

        const firstName = this.state.firstName;
        const email = this.state.email;
        const hpcsa = this.state.hpcsa;

        axios({
            method: "POST",
            url: "http://localhost:3000/doctorregister",
            data: {
                name: firstName,
                email: email,
                hpcsa: hpcsa,
            },
        }).then((response) => {
            if (response.data.msg === "success") {
                alert("Message Sent.");
                this.resetForm();
            } else if (response.data.msg === "fail") {
                alert("Message failed to send.");
            }
        });
    }

    resetForm() {
        document.getElementById("registerForm").reset();
    }

    render() {
        const { error } = this.state;
        return (
            <div className="container col-7 mt-2">
                <div className="p-5"></div>
                <div className="card card-body text-center">
                    <form
                        id="registerForm"
                        onSubmit={(e) => this.handleSubmit(e)}
                    >
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
                                id="name"
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

                        {error ? (
                            <div class="alert alert-danger mt-5" role="alert">
                                {error}
                            </div>
                        ) : (
                            <div></div>
                        )}
                    </form>
                </div>
                <div className="p-5"></div>
            </div>
        );
    }
}
