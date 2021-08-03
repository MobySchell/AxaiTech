import React, { Component } from 'react'

export default class TestForm extends Component {
    render() {
        return (
         <div className="container col-7 mt-2">
        <div className="p-5"></div>
        <div className="card card-body text-center">
         <form>
        <h1 className="h3 mt-3 text-center">Patient Test Form</h1>

        <div className="p-3 body">
          <label  className="form-label"></label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput"
            placeholder="Name"
          />
        </div>

        <div className="p-3 body">
          <label  className="form-label"></label>
          <input
            type="email"
            className="form-control"
            id="formGroupExampleInput2"
            placeholder="Email"
          />
        </div>

        <div className="text-center mt-4 body">
          <button className="btn btn-primary px-5" type="submit">
            Submit
          </button>
        </div>
        </form> 
      </div>
      </div>
    );
  }
}

        
    

