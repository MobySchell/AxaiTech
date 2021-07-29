/*
PURPOSE OF THIS PAGE:
this code is intended to hide specific pages if a user isn't logged in
and when a user is logged in, this code indicates where to direct that user
 */

import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
// import Firebase from '../../firebase/firebase'

import PatientPortal from '../PatientPortal';
import DoctorPortal from '../DoctorPortal';
import StatusPage from '../StatusPage'

export default class GuardedRoute extends Component {
  render() {
    // const { component: Component, user, role, status, ...rest } = this.props;
    const { component: Component, user, role, status, ...rest} = this.props;
    
    /*
    component={StatusPage}
    component={StatusPage}
    user={user}
    role={role}
    status={status}
    */

    // this.auth = Firebase.auth();
    // this.auth.currentUser

    // console.log("top of Guarded route role:" + role)
    // console.log("top of Guarded route status:" + status)

    return (
      <Route {...rest} render={(props) => {


        // setTimeout(() => 
        // {                 
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
        // }, 5000);

          

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
