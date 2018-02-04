import { Accounts } from 'meteor/accounts-base';        // Importing standart login library

Accounts.ui.config({                                    // Sign in settings
    passwordSignupFields: 'USERNAME_ONLY',
});