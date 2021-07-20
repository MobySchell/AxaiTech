import "bootstrap/dist/css/bootstrap.css";
import React, { Component } from "react";

import firebase from "../Firebase/firebase";
import Book from "../models/Book";

import BookInput from "./BookInput";
import BookTable from "./BookTable";

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.db = firebase.firestore();

        this.state = { books: [] };
    }

    componentDidMount() {
        this.fetchData();
    }

    async fetchData() {
        try {
            const snapshot = await this.db.collection("books").get();
            const books = snapshot.docs.map((doc) => Book.fromFB(doc));

            this.setState({ books: books });
        } catch (err) {
            console.log(err);
        }
    }

    async onBookSubmitted(book) {
        try {
            const dbAdd = this.db.collection("books").doc();
            await dbAdd.set({
                title: book.title,
                author: book.author,
                isbn: book.isbn,
            });

            book.id = dbAdd.id;
            this.state.books.push(book);
            this.setState({ books: this.state.books });
        } catch (err) {
            console.log(err);
        }
    }

    async onBookRemoved(bookId) {
        try {
            await this.db.collection("books").doc(bookId).delete();
            const updatedBookArr = this.state.books.filter(
                (book) => book.id !== bookId
            );
            this.setState({ books: updatedBookArr });
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        return (
            <>
                <div className="container">
                    <div className="container">
                        <h1 className="m-3 fs-1">Add Book:</h1>
                        <BookInput
                            createBook={(book) => this.onBookSubmitted(book)}
                        />
                        <BookTable
                            books={this.state.books}
                            bookRemoved={(bookId) => this.onBookRemoved(bookId)}
                        />
                    </div>
                </div>
            </>
        );
    }
}
