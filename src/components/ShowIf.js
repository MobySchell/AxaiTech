/*
PURPOSE OF THIS PAGE:
this code is to display an error message on the login and register pages in 
case there is a issue with logging in or registering
 */

import React, { Component } from 'react'

export default class ShowIf extends Component {
  render() {

    const { isTrue, children } = this.props;

    return (
      <div>
        {
          isTrue ?
            <div>
              {children}
            </div>
            :
            <div>
            </div>
        }
      </div>
    )
  }
}
