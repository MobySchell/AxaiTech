import React, { Component } from 'react';
import axios from "axios"

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

  clicking(){
    const { email } = this.state;
    console.log(email.sender)
    console.log(email.recipient)
  }

  handleSubmit(e) {
    e.preventDefault();
   const { email } = this.state;
 
 
 
    axios({
      method: "POST",
      url: "http://localhost:3000/doctor-portal",
      data: {
        email: email,
      },
    }).then((response) => {
      if (response.data.msg === "success") {
        alert("Message Sent.");
        this.resetForm();
      } else if (response.data.msg === "fail") {
        alert("Message failed to send.");
      }
    });
  }

  // sendEmail= () => {
  //   const { email } = this.state;
  //   // fetch(`http://127.0.0.1:4000/send-email?recipient=${email.recipient}&sender=${email.sender}&topic=${email.subject}&text=${email.text}`)
  //   // .catch(err => console.log(err))

  //   axios({
  //     method: "POST",
  //     url: "http://localhost:3001/doctor-portal",
  //     data: {
  //       name : "",
  //       email: email,
  //       hpcsa: ""
  //     },
  //   }).then((response) => {
  //     if (response.data.msg === "success") {
  //       alert("Message Sent.");
  //       this.resetForm();
  //     } else if (response.data.msg === "fail") {
  //       alert("Message failed to send.");
  //     }
  //   });
  // }

    

  render() {
    const { email } = this.state; 
    return (
      <div className="d-flex">
        <label>Patient Email</label>
        <input 
          type="text" 
          onChange= {e => {
            this.setState({ email, recipient: e.target.value})
          }}
        />
        <br />
        <hr />
        <button 
        type="submit"
        className="btn btn-danger justify-content-end"
        onClick={(e) => this.clicking(e)}
        >
          submit
        </button>
      </div>
    )
  }
}
