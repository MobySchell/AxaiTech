import React, { Component } from "react";
import Firebase from "../../firebase/firebase";

export default class PatientRegister extends Component {
    constructor(props) {
        super(props);

        this.auth = Firebase.auth();
        this.db = Firebase.firestore();

        this.state = {
            Name: "",
            Email: "",
            role: "",
            error: "",
        };
    }

    onNameChanged(e) {
        this.setState({
            Name: e.target.value,
        });
    }

    onEmailChanged(e) {
        this.setState({
            Email: e.target.value,
        });
    }

    async onPatientRegisterCreated(PatientRegister) {
        console.log(PatientRegister);

        try {
            const docRef = this.db.collection(PatientRegister).doc();
            await docRef.set({
                Name: PatientRegister.Name,
                Email: PatientRegister.Email,
            });
            console.log(docRef.id);
        } catch (err) {}
    }

    render() {
        const { error } = this.state;
        return (
            <div className="container col-7 mt-2">
                <div className="p-5"></div>
                <div className="card card-body text-center">
                    <form onSubmit={(e) => this.PatientRegister(e)}>
                        <h1 className="h3 mt-3 text-center">
                            Patient Registration
                        </h1>

                        <div className="p-3 body">
                            <label className="form-label"></label>
                            <input
                                value={this.state.Name}
                                onChange={(e) => this.onNameChanged(e)}
                                type="text"
                                className="form-control"
                                id="formGroupExampleInput"
                                placeholder="Name"
                            />
                        </div>

                        <div className="p-3 body">
                            <label className="form-label"></label>
                            <input
                                value={this.state.Email}
                                onChange={(e) => this.onEmailChanged(e)}
                                type="text"
                                className="form-control"
                                id="formGroupExampleInput2"
                                placeholder="Email"
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
