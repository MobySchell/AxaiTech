/*
PURPOSE OF THIS PAGE:
this code is intended to hide specific pages if a user isn't logged in
and when a user is logged in, this code indicates where to direct that user
 */

import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import DoctorPortal from '../DoctorPortal';

import StatusPage from '../StatusPage'

export default class GuardedRoute extends Component {
  render() {
    const { component: Component, user, role, status, ...rest} = this.props;

    return (
      <Route {...rest} render={(props) => {

          if (user) {
            if (role === 'doctor') {
              if (status === 'pending' || status === 'denied') {
                return <StatusPage {...{ ...props, ...rest, user, status}} />
              } else if (status === 'approved') {
                return <DoctorPortal {...{ ...props, ...rest, user, status}} />
              } else {
                return <Redirect to="/login" />;
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
