import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import '../imports/models/documents/book';
import '../imports/models/documents/journal_article';
import App from '../imports/ui/App.js';
import {AddBookButton} from '../imports/api/AddBookButton'
import {AddArticleButton} from '../imports/api/AddArticleButton'
import '../imports/startup/accounts-config.js';



Meteor.startup(() => {
    render(<App />, document.getElementById('render-target'));
    render(<AddBookButton />, document.getElementById('AddBookButton'))
    render(<AddArticleButton />, document.getElementById('AddArticleButton'))
});