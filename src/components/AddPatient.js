import React, { Component } from 'react'

export default class AddPatient extends Component {
  constructor(props){
    super(props);
    this.state ={
      email: {
        recipient: '',
        sender: 'jo3ydeveloper@outlook.com',
        subject: 'Register link for AxaiTech',
        text: 'random link'      
      }
    }
  }

  sendEmail= () => {
    const { email } = this.state;
    fetch(`http://127.0.0.1:4000/send-email?recipient=${email.recipient}&sender=${email.sender}&topic=${email.subject}&text=${email.text}`)
    .catch(err => console.log(err))
  }

  render() {
    const { email } = this.state; 
    return (
      <div className="d-flex">
        <label>Patient Email</label>
        <input type="text" 
          onChange= {e => {
            this.setState({ email, recipient: e.target.value})
          }}
        />
        <br />
        <hr />
        <button className="btn btn-danger justify-content-end"
        onClick={this.sendEmail}
        >
          submit
        </button>
      </div>
    )
  }
}
