import * as nodemailer from "nodemailer";
import React, { Component } from "react";
import "./component styles/Contact.css";

export default class Contact extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            message: "",
        };
    }

    emailchanged(e) {
        this.setState({
            email: e.target.value,
        });
    }

    messagechanged(e) {
        this.setState({
            message: e.target.value,
        });
    }

    //FIXME:::this function is intended to actually send an email to info@axaitech.co.za from a potential user
    async sendEmail() {
        const transporter = nodemailer.createTransport({
            host: "smtp.ipage.com",
            port: 587,
            secure: false,
            ignoreTLS: true,
            debug: true,
            auth: {
                user: "info@axaitech.co.za",
                pass: "Axailtech123",
            },
            tls: {
                rejectUnauthorized: false,
            },
        });
        const options = {
            from: this.state.email,
            to: "info@axaitech.co.za",
            subject: "Consultation Request",
            html: this.state.message,
        };

        await transporter.sendMail(options);
    }

    render() {
        return (
            <div className="black-bg text-white">
                <footer>
                    <div className="container">
                        <div className="card-body">
                            <h5 className="card-title">Request a Consult</h5>
                            <div className="p-2">
                                To schedule a meeting with one of our product
                                consultants, please fill in your contact
                                details.*
                            </div>
                            <form>
                                <div className="input-group mb-3">
                                    <input
                                        value={this.state.email}
                                        onChange={(e) => this.emailchanged(e)}
                                        type="text"
                                        className="form-control"
                                        placeholder="Email"
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
                                    />
                                </div>
                                <div className="input-group">
                                    <textarea
                                        value={this.state.message}
                                        onChange={(e) => this.messagechanged(e)}
                                        className="form-control"
                                        placeholder="Type your message here..."
                                        aria-label="With textarea"
                                    ></textarea>
                                </div>
                            </form>
                            <button
                                className="btn btn-light mt-3"
                                onClick={() => this.sendEmail()}
                            >
                                Send Request{" "}
                            </button>
                            <div className="p-2">
                                <p>
                                    * Please note that due to HPCSA regulations
                                    all genetic screening tests must be
                                    performed under the guidance of a certified
                                    medical practitioner or genetic counselor.
                                </p>
                            </div>

                            <hr></hr>
                            <h5>Get in Touch</h5>
                            <div className="row p-4">
                                <span className="col-4 border-end">
                                    <p> General Inquiries:</p>
                                    <p>info@axaitech.co.za</p>
                                </span>
                                <div className="col-4 border-end">
                                    <p>Cell: +27 84 697 1122</p>
                                    <p>Alt: +27 79 596 6030</p>
                                </div>
                            </div>

                            <p className="text-center">
                                © 2021 by Axaitech (Pty) Ltd.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
}
