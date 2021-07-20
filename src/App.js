import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import "../node_modules/bootstrap/dist/css/bootstrap.css";

import NavBar from "./components/NavBar";

import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";

export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <NavBar />

                <Route path="/" exact component={Home} />
                <Route path="/login" exact component={Login} />
                <Route path="/register" exact component={Register} />
            </BrowserRouter>
        );
    }
}
