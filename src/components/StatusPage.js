import React, { Component } from 'react'
// import Card from 'react-boostrap'

export default class StatusPage extends Component {
  render() {

    const {status} = this.props

    return (
      <div className="text-white text-center p-5">
      <h1>Status Page</h1>
      <div className="p-5">Status: {status}</div>
      <div className="p-5"></div>
      <div className="p-5"></div>
      <div className="p-5"></div>

      </div>
      /*
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          <strong>Email:</strong> {}
        </Card.Body>
      </Card>
      */
    )
  }
}
