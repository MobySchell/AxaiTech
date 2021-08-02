import React, { Component } from 'react';
import firebase from '../firebase/firebase';
import 'firebase/firestore'
import { Card, Button } from 'react-bootstrap';
import doctorprofile from '../images/doctorprofile.jpg'

export default class DoctorPortal extends Component {
  constructor(props){
    super(props); 
    this.db = firebase.firestore();
    this.auth = firebase.auth();
    this.state = {
      details: [],
      name: '',
      surname: '',
      practiceNum: '',
      email: '',
      user: '',
      id:'',
      hpcsa: '',
      status: '',
    }
  }

  componentDidMount() {
    this.auth.onAuthStateChanged((user) => {
        this.setState({ user: user });
        if (user !== null) {
            this.getRoleStatus(user.uid);
            this.getUserDetails(user.uid);
        }
    });
  }

  async getRoleStatus(userUid) {
    const snap1 = await this.db
        .collection("user-roles")
        .where("userId", "==", userUid)
        .get();
    snap1.forEach((doc) => {
        console.log(doc.data().userId);
        this.setState({
          id: doc.data().userId
        });
        
    });
  }

   async getUserDetails(id){
    try{
      const detz = await this.db
      .collection("doctors")
    .where("userId", "==", id)
    .get();
    detz.forEach((doc) => {
      console.log(doc.data())
      console.log(doc.data().firstName)
      this.setState({
        name: doc.data().firstName,
        surname: doc.data().surname,
        practiceNum: doc.data().practiceNum,
        status: doc.data().status,
        hpcsa: doc.data().hpcsa

      })
    })

      console.log("User")
    }catch(err){
      console.log(err);
    }
  }

  render() {

    return (

      //TODO: fill this page according to instructions from AxaiTech
      <div className = "p-5">
        <h1 className="text-center">STATUS PAGE</h1>
      <Card className="text-center">
        <Card.Header>{this.state.name} {this.state.surname}</Card.Header>
        <Card.Body>
        <p className="card-text text-dark">Occupation: <em>Oncologist</em></p>
                <p className="card-text text-dark">Practise Number (to be confirmed): <em>{this.state.practiceNum}</em></p>
                <p className="card-text text-dark">HPCSA Number (to be confirmed): <em> {this.state.hpcsa} </em></p>
                <p className="card-text text-dark">Status: <em style={{ color: 'red' }} > {this.state.status}</em></p>
        <Button variant="primary">Go to Home</Button>
        </Card.Body>
        <Card.Footer className="text-muted">Last Updated: 2 days ago</Card.Footer>
      </Card>
      </div>
      

      /*
      <div className="p-5">
        <h1 className="text-center">STATUS PAGE</h1>
        <div className="card mb-3">
          <div className="row g-0">

              <div className="col-md-4">
            </div>

            <div className="col-md-12">
              <div className="card-body">
                <h5 className="card-title">{this.state.name} {this.state.surname} </h5>
                <p className="card-text text-dark">Occupation: <em>Oncologist</em></p>
                <p className="card-text text-dark">Status: <em>{this.state.status}</em></p>
                <p className="card-text text-dark">Practise Number (to be confirmed): <em>{this.state.practiceNum}</em></p>
                <p className="card-text text-dark">HPCSA Number (to be confirmed): <em> {this.state.hpcsa} </em></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      */
    )
  }
}

/*

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

      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          <strong>Email:</strong> {}
        </Card.Body>
      </Card>
    )
  }
}
*/