import React, { Component } from "react";
import "./component styles/Resources.css";
import Contact from "./Contact";

export default class Resources extends Component {
    render() {
        return (
            <div>
                <div className="text-center">
                    <div className="p-5"></div>

                    <div className="p-3">
                        <h1 className="">Information & Sample Report</h1>
                    </div>

                    <div className="text-white">
                        <div className="">
                            <figure className="figure pt-4">
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href="https://firebasestorage.googleapis.com/v0/b/axai-tech.appspot.com/o/Axaitech_Med_v2.pdf?alt=media&token=f76c4363-2bbc-4345-816e-efbb724f5056"
                                >
                                    <i className="bi bi-file-earmark-pdf-fill pdf-change m-5"></i>
                                </a>
                                <figcaption className="figure-caption text-white">
                                    {" "}
                                    Information <br></br>Packet{" "}
                                </figcaption>
                            </figure>

                            <figure className="figure pt-4">
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href="https://firebasestorage.googleapis.com/v0/b/axai-tech.appspot.com/o/Sample-clinical-report_Creatori(1)(1).pdf?alt=media&token=477eddbb-6c58-44a4-9e00-5f9a2fbcdba4"
                                >
                                    <i className="bi bi-file-earmark-pdf-fill pdf-change m-5"></i>
                                </a>
                                <figcaption className="figure-caption text-white">
                                    {" "}
                                    Sample <br></br>Report{" "}
                                </figcaption>
                            </figure>
                        </div>
                        <div></div>
                    </div>

                    <div className="p-5"></div>
                </div>
                <Contact />
            </div>
        );
    }
}
