import React, { Component } from 'react';
import axios from "axios";
import firebase from "../firebase/firebase"

export default class AddPatient extends Component {
  constructor(props){
    super(props);
    
    this.auth = firebase.auth();
    this.db = firebase.firestore();

    this.state ={
        recipient: '',
        subject: 'Register link for AxaiTech',
        text: 'random link'      
    }
  }

  handleSubmit(e) {
    e.preventDefault();

   const recipient = this.state.recipient;
   const subject = this.state.subject;
   const text = this.state.text;
 
 
 
    axios({
      method: "POST",
      url: "http://localhost:3000/doctor-portal",
      data: {
        recipient: recipient,
        subject: subject,
        text: text,
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
  
  addPatient(){
    const db = this.state.db
    //Add a new document with a generated id.
      db.collection("cities").add({
        name: "Tokyo",
        country: "Japan"
      })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }

  render() {
    
    return (
      <div className="d-flex">
        <label>Patient Email</label>
        <input 
        value = {this.state.recipient}
          type="text" 
          onChange= {e => {
            this.setState({ recipient: e.target.value})
          }}
        />
        <br />
        <hr />
        <button 
        type="submit"
        className="btn btn-danger justify-content-end"
        onClick={(e) => this.handleSubmit(e)}
        >
          submit
        </button>
      </div>
    )
  }
}
