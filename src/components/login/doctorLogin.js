import React, { Component } from "react";
import firebase from "firebase";
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
            <div className="container">
                <h1>Doctor Login</h1>
                <form onSubmit={(e) => this.docLogin(e)}>
                    <div class="mb-3">
                        <label class="form-label">Email address</label>
                        <input
                            value={email}
                            onChange={(e) =>
                                this.setState({ email: e.target.value })
                            }
                            type="email"
                            class="form-control"
                        />
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Email address</label>
                        <input
                            value={password}
                            onChange={(e) =>
                                this.setState({ password: e.target.value })
                            }
                            type="password"
                            class="form-control"
                        />
                    </div>
                    <button className="btn btn-primary px-5 body" type="submit">
                        Login
                    </button>
                    {error ? (
                        <div className="alert alert-danger mt-4">{error}</div>
                    ) : (
                        <div></div>
                    )}
                </form>
            </div>
        );
    }
}
