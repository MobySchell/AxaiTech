/*
PURPOSE OF THIS PAGE:
this code is for the login page on the website and handles the login of all users
 */

import React, { Component } from "react";
import "./styles.css";
import Firebase from "../../firebase/firebase";
import ShowIf from "../ShowIf";

// const auth = Firebase.instance().auth;

export default class Login extends Component {
    constructor(props) {
        super(props);

        /*
        if (this.props.user){
            this.props.history.push('/doctor-portal');
        }   
        */

        this.auth = Firebase.auth();
        this.db = Firebase.firestore();

        this.state = {
            user: "",
            email: "",
            password: "",
            error: "",
            role: "",
            status: "",
        };
    }

    onEmailChanged(e) {
        this.setState({
            email: e.target.value,
        });
    }

    onPasswordChanged(e) {
        this.setState({
            password: e.target.value,
        });
    }

    componentDidMount() {
        this.auth.onAuthStateChanged((user) => {
            this.setState({ user: user, loading: false });
            if (user !== null) {
                this.getRoleStatus(user.uid);
            }
        });
    }

    async getRoleStatus(userUid) {
        const snap = await this.db
            .collection("doctors")
            .where("userId", "==", userUid)
            .get();
        snap.forEach((doc) => {
            const role = doc.data().role;
            const status = doc.data().status;
            this.setState({
                role: role,
                status: status,
            });
        });
    }

    async login(e) {
        e.preventDefault();

        try {
            const { email, password } = this.state;
            await this.auth.signInWithEmailAndPassword(email, password);
            await this.getRoleStatus(this.props.user.uid);

            if (this.props.user) {
                if (this.props.user.role === "doctor") {
                    if (this.props.user.status === "approved") {
                        this.props.history.push("/doctor-portal");
                    } else {
                        this.props.history.push("/status-page");
                    }
                } else {
                    this.props.history.push("/patient-portal");
                }
            }
        } catch (err) {
            this.setState({ error: err.message });
        }
    }

    render() {
        const { error } = this.state;
        return (
            <div className="container col-7 mt-2">
                <div className="p-5"></div>
                <div className="card card-body text-center">
                    <form onSubmit={(e) => this.login(e)}>
                        <h1 className="h3 mt-3 text-center">Profile Login</h1>
                        <div className="p-3 body">
                            <input
                                value={this.state.email}
                                onChange={(e) => this.onEmailChanged(e)}
                                type="email"
                                className="form-control "
                                placeholder="Email Address"
                            />
                        </div>
                        <div className="p-3 body">
                            <input
                                value={this.state.password}
                                onChange={(e) => this.onPasswordChanged(e)}
                                type="password"
                                className="form-control"
                                placeholder="Password"
                            />
                        </div>
                        <ShowIf isTrue={error}>
                            <div className="alert alert-danger mt-4">
                                {error}
                            </div>
                        </ShowIf>
                        <div className="text-center mt-4">
                            <button
                                className="btn btn-primary px-5 body"
                                type="submit"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>

                <div className="p-5"></div>
            </div>
        );
    }
}
