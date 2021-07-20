import "bootstrap/dist/css/bootstrap.css";
import Book from "../models/Book";
import React, { Component } from "react";

export default class BookInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            author: "",
            isbn: "",
        };
    }
    onAddBook() {
        const book = new Book(
            this.state.title,
            this.state.author,
            this.state.isbn
        );
        this.props.createBook(book);
        this.setState({ title: "" });
        this.setState({ author: "" });
        this.setState({ isbn: "" });
    }

    render() {
        return (
            <div className="container">
                <div className="mb-3">
                    <label for="Title" className="form-label fw-bolder">
                        Title
                    </label>
                    <input
                        value={this.state.title}
                        onChange={(e) =>
                            this.setState({ title: e.target.value })
                        }
                        type="text"
                        className="form-control"
                        id="Title"
                    />
                </div>

                <div className="mb-3">
                    <label for="Author" className="form-label fw-bolder">
                        Author
                    </label>
                    <input
                        value={this.state.author}
                        onChange={(e) =>
                            this.setState({ author: e.target.value })
                        }
                        type="text"
                        className="form-control"
                        id="Author"
                    />
                </div>

                <div className="mb-3">
                    <label for="ISBN#" className="form-label fw-bolder">
                        ISBN#
                    </label>
                    <input
                        value={this.state.isbn}
                        onChange={(e) =>
                            this.setState({ isbn: e.target.value })
                        }
                        type="text"
                        className="form-control"
                        id="ISBN#"
                    />
                </div>
                <button
                    onClick={() => this.onAddBook()}
                    type="button"
                    className="btn btn-outline-secondary w-100 fw-bolder text-dark border-4 border-light"
                >
                    Submit
                </button>
            </div>
        );
    }
}
