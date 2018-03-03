import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import '../imports/models/documents/book';
import '../imports/models/documents/journal_article';
import App from '../imports/ui/components/App.js';
import '../imports/startup/accounts-config.js';



Meteor.startup(() => {
    render(<App />, document.getElementById('render-target'));
});;