import {Document} from "./document";
import {User} from "../users/user";

export const History = Class.create({
    name: 'History',

    fields: {
        user: {
            type: User
        },
        document: {
            type: Document
        },
        event: {
            type: String
        },
        date: {
            type: Date
        }
    }
});