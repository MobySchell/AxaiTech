/*
PURPOSE OF THIS PAGE:
this code is intended to hide specific pages if a user isn't logged in
and when a user is logged in, this code indicates where to direct that user
 */

import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

import DoctorPortal from '../DoctorPortal';
import PatientPortal from '../PatientPortal';
import StatusPage from '../StatusPage'

export default class GuardedRoute extends Component {
  render() {
    const { component: Component, user, role, status, ...rest } = this.props;

    return (
      <Route
        {...rest}
        render={(props) => {

          if (user !== null && role === "patient") {
            console.log("this does get fired 1");
            return <PatientPortal {...{ ...props, ...rest, user }} />;
          } else if(user !== null && role === "doctor" && status === "approved")  {
            console.log("this does get fired 2");
            return <DoctorPortal {...{ ...props, ...rest, user }} />;
          } else if(role === "doctor" && status === "pending")  {
            console.log("this does get fired 3");
            return <StatusPage {...{ ...props, ...rest, user }} />;
          } else {
            console.log("this does get fired 4");
            console.log(role);
            console.log(status);
            return <Redirect to="/" />;
          }

          /*
          if (user) {
            if (role === 'doctor') {
              if (status === 'approved') {
                return <DoctorPortal {...{ ...props, ...rest, user }} />
              } else {
                return <StatusPage {...{ ...props, ...rest, user }} />
              }
            } else if (role === 'patient') {
              return <PatientPortal {...{ ...props, ...rest, user }} />;
            }          
          } else {
            return <Redirect to="/" />;
          }
          */
        }}
      />
    );
  }
}
