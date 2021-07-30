/*
PURPOSE OF THIS PAGE:
this code is intended to hide specific pages if a user isn't logged in
and when a user is logged in, this code indicates where to direct that user
 */

import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
// import Firebase from '../../firebase/firebase'

import DoctorPortal from '../DoctorPortal';

export default class GuardedRoute extends Component {
  render() {
    // const { component: Component, user, role, status, ...rest } = this.props;
    const { component: Component, user, role, status, ...rest} = this.props;

    return (
      <Route {...rest} render={(props) => {
             

        /*
          if (user !== null && role === "patient") {
            console.log("this does get fired 1");
            console.log(user);
            console.log(role);
            console.log(status);
            return <PatientPortal {...{ ...props, ...rest, user }} />;
          } else if(user !== null && role === "doctor" && status === "approved")  {
            console.log("this does get fired 2");
            console.log(user);
            console.log(role);
            console.log(status);
            return <DoctorPortal {...{ ...props, ...rest, user }} />;
          } else if(role === "doctor" && status === "pending")  {
            console.log("this does get fired 3");
            console.log(user);
            console.log(role);
            console.log(status);
            return <StatusPage {...{ ...props, ...rest, user, status }} />;
          } else {
            console.log("this does get fired 4");
            console.log(user);
            console.log(role);
            console.log(status);
            return <Redirect to="/" />;
          }
          */

          /*
          if (user) {
            if (role === 'doctor') {
              if (status === 'approved') {
                return <DoctorPortal {...{ ...props, ...rest, user }} />
              } else {
                return <StatusPage {...{ ...props, ...rest, user, status }} />
              }
            } else if (role === 'patient') {
              return <PatientPortal {...{ ...props, ...rest, user }} />;
            }          
          } else {
            return <Redirect to="/" />;
          }
          */
          if (user) {
            if (role === 'doctor') {
              if (status === 'approved') {
                return <DoctorPortal {...{ ...props, ...rest, user }} />
              } else {
                return <Redirect to="/status-page" />;
              }
            } else if (role === 'patient') {      
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
