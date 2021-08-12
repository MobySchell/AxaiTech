import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Nav from "./components/Nav";
import Product from "./components/Product";
import Resources from "./components/Resources";
import About from "./components/About";
import Contact from "./components/Contact";
import Home from "./components/Home";
import DoctorPortal from "./components/DoctorPortal";
import PatientPortal from "./components/PatientPortal";
import firebase from "./firebase/firebase";
import PropsRoute from "./components/routing/PropsRoute";
import DoctorStatusRoute from "./components/routing/DoctorStatusRoute";
import DoctorPortalRoute from "./components/routing/DoctorPortalRoute";
import PatientPortalRoute from "./components/routing/PatientPortalRoute";
import AdminPortalRoute from "./components/routing/AdminPortalRoute";
import StatusPage from "./components/StatusPage";
import AdminPortal from "./components/admin/AdminPortal";
import TestForm from "./components/TestForm";

import DifferentiatorRegister from "./components/login/DifferentiatorRegister";
import DoctorRegister from "./components/login/DoctorRegister";
import PatientRegister from "./components/login/patientRegister";
import Login from "./components/login/Login";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            loading: true,
            // role: '',
            // status: ''
            role: localStorage.getItem("role"),
            status: localStorage.getItem("status"),
        };

        this.db = firebase.firestore();
        this.auth = firebase.auth();
    }

    componentDidMount() {
        this.auth.onAuthStateChanged((user) => {
            this.setState({ user: user, loading: false });
            if (user !== null) {
                this.getUserRole(user.uid);
            }
        });
    }

    async getUserRole(userUid) {
        const snap1 = await this.db
            .collection("user-roles")
            .where("userId", "==", userUid)
            .get();
        snap1.forEach((doc) => {
            const role = doc.data().role;
            this.setState({ role: role });
            localStorage.setItem("role", role);
        });
        const { role } = this.state;
        if (role === "doctor") {
            const snap2 = await this.db
                .collection("doctors")
                .where("userId", "==", userUid)
                .get();
            snap2.forEach((doc) => {
                const status = doc.data().status;
                this.setState({ status: status });
                localStorage.setItem("status", status);
            });
        }
    }

    render() {
        const { user, role, status, loading } = this.state;
        return (
            <div>
                {loading ? (
                    <div>Loading</div>
                ) : (
                    <BrowserRouter>
                        <div className="backgroundImage">
                            <Nav user={user} role={role} status={status} />
                            <Route path="/product" exact component={Product} />
                            <Route path="/" exact component={Home} />
                            <Route path="/about" exact component={About} />

                            <Route
                                path="/doctor-register"
                                exact
                                component={DoctorRegister}
                            />

                            <Route
                                path="/patient-register"
                                exact
                                component={PatientRegister}
                            />

                            <Route
                                path="/differentiatorRegister"
                                exact
                                component={DifferentiatorRegister}
                            />

                            <Route
                                path="/resources"
                                exact
                                component={Resources}
                            />

                            <Route
                                path="/request-test"
                                exact
                                component={TestForm}
                            />

                            <PropsRoute
                                path="/login"
                                exact
                                component={Login}
                                user={user}
                            />

                            <DoctorStatusRoute
                                path="/status-page"
                                exact
                                component={StatusPage}
                                user={user}
                                role={role}
                                status={status}
                            />
                            <DoctorPortalRoute
                                path="/doctor-portal"
                                exact
                                component={DoctorPortal}
                                user={user}
                                role={role}
                                status={status}
                            />

                            <PatientPortalRoute
                                path="/patient-portal"
                                exact
                                component={PatientPortal}
                                user={user}
                                role={role}
                            />
                            <AdminPortalRoute
                                path="/admin-portal"
                                exact
                                component={AdminPortal}
                                user={user}
                                role={role}
                            />

                            <Contact />
                        </div>
                    </BrowserRouter>
                )}
            </div>
        );
    }
}

export default App;
