import { Class } from 'meteor/jagi:astronomy'; // Import our extension astronomy

const Copy = Class.create({                    // Indicate for a copy of the book hence a library can have multiple copies for the same book
    name: 'Copy',
    fields: {
        reference: {                            // if this copy is the main copy "Reference"
            type: Boolean
        },
        checked_out_date: {                     // The time it was lent from the library to a student
            type: Date
        },
        usersID: {                              // the Id of the user who has the ID currently
            type: [String]
        }
    }
});

export const Document = Class.create({               /// Our class Document
    name: 'Document',

    fields: {
        title: {                                     /// each copy should have a title
            type: String,                            /// a title is a string
            validators: [{                          //  Astronomy validator for our attributes and methods
                type: 'minLength',
                param: 1,
            }]
        },
        authorsID: {                                    /// The ID of the authors
            type: [String]
        },
        tags: {                                         /// The tags of the particular document
            type: [String]
        },
        copies: {                                       /// The copies of the document that are presented in our library
            type: [Copy]
        },
        price: {
            type: Number
        }
    },

    helpers: {                                  /// OUR interface of methods that will run our app
        addAuthor(author) {                     // addition in terms of authors

        },
        addNewCopy(documentID) {                // Increase our array of copies by one copy

        },
        switchReference(documentID, boolean) {  // Modify the state of the reference if it is taken or not

        },
        getOverdueDocuments() {                 // A list of documents that their current holder exceeded the time of the expected return

        },
        checkOutDocument(documentID, userID) {  // Lending a document to a student

        },
        returnDocument(documentID) {            // Return the Object of a certain document by their HASH id

        }
    },
});
