import React, { Component } from "react";
import report from "../images/report.jpg";
import "../components/component styles/Home.css";

export default class Home extends Component {
  render() {
    return (
      <div className="text-white d-flex text-center">
        <div className="p-5">
          <h1 className="title">Better Data.</h1>
          <h1 className="title">Better Treatment.</h1>
          <div className="row">
            <div className="col-3"></div>
            <div className="p-2 col-6">
              <p>
                Liquid Biopsy Chemotherapy Drug Resistance screening offers the
                primary care physician actionable insight into each individual
                undergoing treatment.
              </p>
              <p>
                With up to 90% of cancer mortality linked to drug resistance,
                better data means better treatment from the start.
              </p>
            </div>
            <figure className="figure pt-4">
              <img className="img-responsive line" src={report} alt=""></img>
              <figcaption className="figure-caption text-white">
                *The report above is a simplified version of the
                <br></br>Axaitech clinical report for illustrative purposes
                only.
              </figcaption>
            </figure>

            <div className="p-5"></div>
          </div>
        </div>
      </div>
    );
  }
}
