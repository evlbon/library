import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import '../imports/models/documents/book';
import '../imports/models/documents/journal_article';
import Navigation from '../imports/ui/NAVI.js';
import '../imports/startup/accounts-config.js';



Meteor.startup(() => {
    render(<Navigation />, document.getElementById('render-target'));
});