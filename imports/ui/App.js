import React, { Component } from 'react';
import AccountsUIWrapper from './AccountsUIWrapper.js';
import Book from './Book.js';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import { Books } from '../models/documents/book';
import { Meteor } from 'meteor/meteor';
// App component - represents the whole app



class App extends Component {

    handleSubmit(event) {
        event.preventDefault();

        // Find the text field via the React ref
        const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

        Meteor.call('documents.addBook',{ title : text });

        // Clear form
        ReactDOM.findDOMNode(this.refs.textInput).value = '';
    }



    renderBooks() {
        return this.props.books.map((book) => (
            <Book key={book._id} book={book} />
        ));
    }

    render() {
        return (

            <div className="container">

                <header>
                    <aside>
                        asd

                    </aside>
                    <h1>InnoLibrary</h1>

                    <AccountsUIWrapper />


                    { this.props.currentUser ?
                        <form className="new-book" onSubmit={this.handleSubmit.bind(this)} >
                            <input
                                type="text"
                                ref="textInput"
                                placeholder="Type to add new books"
                            />
                        </form> : ''
                    }


                </header>


                <ul>
                    {this.renderBooks()}
                </ul>
            </div>
        );
    }
}


export default withTracker(() => {
    return {
        books: Books.find({}).fetch(),
        currentUser: Meteor.user(),
    };
})(App);