import React, { Component } from "react";

export default class BookTable extends Component {
    render() {
        return (
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Author</th>
                            <th scope="col">ISBN</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.books.map((book) => {
                            return (
                                <tr key={book.id}>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                    <td>{book.isbn}</td>
                                    <td>
                                        <button className="border-0 bg-white text-info text-decoration-underline" onClick={() => this.props.bookRemoved(book.id)}>
                                            X
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}
