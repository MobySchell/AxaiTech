import React, { Component } from "react";

export default class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        }
    }

    onRegister(e) {
        e.preventDefault();
    }

    render() {
        const { email,password } = this.state
        return (
            <div className="container my-4">

                <h2>Register</h2>

                <form onSubmit={(e) => this.onRegister(e)}>
                    <div className="mb-3">
                        <label
                            className="form-label"
                        >
                            Email address
                        </label>
                        <input
                            value={email}
                            onChange={(e) => this.setState({ email: e.target.value })}
                            type="email"
                            className="form-control"
                        />
                    </div>

                    <div className="mb-3">
                        <label
                            className="form-label"
                        >
                            Password
                        </label>
                        <input
                            value={password}
                            onChange={(e) => this.setState({ password: e.target.value })}
                            type="password"
                            className="form-control"
                        />
                    </div>
                    <div className="d-flex justify-content-end">

                        <button type="submit" className="btn btn-primary px-5">Register</button>

                    </div>
                </form>
            </div>
        );
    }
}
