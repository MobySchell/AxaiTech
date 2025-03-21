import React, { Component } from 'react'
import 'react-bootstrap-icons'
import firebase from '../firebase/firebase';

const storage = firebase.storage();

export default class AddImg extends Component {
  constructor(props){
    super(props);

    this.state = {
      file: null,
      fileDisplay: 'https://firebasestorage.googleapis.com/v0/b/axai-tech.appspot.com/o/profilePics%2FoFubsK.jpg?alt=media&token=b2ef235e-c12a-4a6a-8e60-a52d408f91f2%22',
      userId: '',
    }
    this.fileInputRef = React.createRef();
  }

  onImageSelect(e){
    let file = null;
    if (e.target.files.length){
      file = e.target.files[0];

      const reader  = new FileReader();
      reader.onload = ((res) => {
        const display = res.target.result;
        this.setState({fileDisplay : display})
      });
      reader.readAsDataURL(file);
    }
    this.setState({
      file : file
    })
  }

  saveImg() {
    let uploadFile = this.state.file;
     const downUrl = storage.ref("profilePics/" + uploadFile.name).put( uploadFile );
     downUrl.on('state changed', (snapshot) => {
       const dobby = downUrl.snapshot.ref.getDownloadURL();
       console.log(dobby)
     })
    const user = this.state.userId;
    console.log(user)
      
  }

  render() {
    const { fileDisplay } = this.state;
    const imagestyle = {
      width: "200px",
      height: "200px",
    };
    return (
      <div>
        <input ref = { this.fileInputRef }
        onChange = {(e) => {this.onImageSelect(e)}}
        type="file"
        
        style={{ display: 'none' }} />

        {
          fileDisplay ?
          <div>
            <img
              style={imagestyle}
              className="img-fluid img-thumbnail rounded-circle "
              src={ fileDisplay }
              alt="..."
            />
          </div>          
         :
         <div>
           <img
              style={imagestyle}
              className="img-fluid img-thumbnail rounded-circle "
              
              alt="..."
            />
         </div>
        } 

        <button className="btn btn-success m-2">
          <i 
         className="bi bi-camera"
         onClick = {() => {
           this.fileInputRef.current.click()
          }
          }
         ></i>
        </button>
         
        <button className="btn btn-primary"
        onClick={() => this.saveImg() }>
          Save
        </button>
      </div>
    )
  }
}
