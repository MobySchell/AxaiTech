/*
PURPOSE OF THIS PAGE:
this code is intended to hide specific pages if a user isn't logged in
and when a user is logged in, this code indicates where to direct that user
 */

import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import TestForm from '../TestForm'

export default class GuardedRoute extends Component {
    render() {
        const {
            component: Component,
            user,
            role,
            status,
            ...rest
        } = this.props;

        return (
            <Route
                {...rest}
                render={(props) => {
                    if (user) {
                        if (role === "doctor") {
                            if (status === "approved") {
                                return (
                                    <TestForm
                                        {...{ ...props, ...rest, user }}
                                    />
                                );
                            } else {
                                return <Redirect to="/status-page" />;
                            }
                        } else if (role === "patient") {
                            return <Redirect to="/patient-portal" />;
                        }
                    } else {
                        return <Redirect to="/login" />;
                    }
                }}
            />
        );
    }
}

