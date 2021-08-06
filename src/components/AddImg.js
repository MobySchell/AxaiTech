import React, { Component } from 'react'
import 'react-bootstrap-icons'
import firebase from '../firebase/firebase';
const storage = firebase.storage();

export default class AddImg extends Component {
  constructor(props){
    super(props);

    this.state = {
      file: null,
      fileDisplay: null
    }
    this.fileInputRef = React.createRef();
  }

  onImageSelect(e){

  }

  async onFileUpload(){
    const { file } = this.state;
    if (!file) {return alert("Please attach files")}
    const uploadPic = storage.ref('profilePics/')
  }

  async saveImg() {
  
  }

  render() {
    return (
      <div>
        <input ref = { this.fileInputRef }
        type="file"
        style={{ display: 'none' }} />
        <img
          //style={imagestyle}
          className="img-fluid img-thumbnail rounded-circle "
          //src={doctorprofile}
          alt="..."
         />
         <i 
         className="bi bi-camera"
         onClick = {() => this.fileInputRef.current.click()}
         ></i>
      </div>
    )
  }
}
