import React, { Component } from "react";
import firebase from "../../firebase/firebase";
export default class DoctorLogin extends Component {
    constructor(props) {
        super(props);

        this.auth = firebase.auth();

        this.state = {
            email: "",
            password: "",
            error: "",
        };
    }

    async docLogin(e) {
        e.preventDefault();

        try {
            const { email, password } = this.state;
            await this.auth.signInWithEmailAndPassword(email, password);
            this.props.history.push("/doctor-portal");
        } catch (err) {
            this.setState({ error: err.message });
        }
    }

    render() {
        const { email, password, error } = this.state;
        return (
            <div className="container col-7 mt-2 ">
                <div className="p-5"></div>
                <div className="card card-body text-center">
                    
                    <form onSubmit={(e) => this.docLogin(e)}>
                        <h1 className="h3 mt-3 text-center">Doctor Login</h1>
                        <div class="p-3 body">
                            <input
                                value={email}
                                onChange={(e) =>
                                    this.setState({ email: e.target.value })
                                }
                                type="email"
                                class="form-control"
                                placeholder="Email Address"
                            />
                        </div>

                        <div class="p-3 body">
                            <input
                                value={password}
                                onChange={(e) =>
                                    this.setState({ password: e.target.value })
                                }
                                type="password"
                                class="form-control"
                                placeholder="Password"
                            />
                        </div>
                        <div className="text-center mt-4">
                            <button
                                className="btn btn-primary px-5 body"
                                type="submit"
                            >
                                Login
                            </button>
                        </div>
                        {error ? (
                            <div className="alert alert-danger mt-4">
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
