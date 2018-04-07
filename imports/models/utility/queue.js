import { Class } from 'meteor/jagi:astronomy';

export const Queue = Class.create({
    name: 'Queue',
    fields: {
        outstanding_requests: {
            type: [String],
            default: [],
        },
        queue_of_students: {
            type: [String],
            default: [],
        },
        queue_of_instructors: {
            type: [String],
            default: [],
        },
        queue_of_TAs: {
            type: [String],
            default: [],
        },
        queue_of_professors: {
            type: [String],
            default: [],
        }
    },
    helpers: {
        get_all_queue: function () {
            return this.queue_of_students.concat(
                this.queue_of_instructors.concat(
                    this.queue_of_TAs.concat(
                        this.queue_of_professors
                    )
                )
            );
        },
        in_queue: function (id) {
            let a = this.get_all_queue().indexOf(id);
            return a >= 0;
        },
        get_queue: function (group) {         // TODO: add new groups (TA, instructors etc), queue cant be done w/o them
            if (group === "Student"){
                return this.queue_of_students;
            }
            else if (group === "Instructors"){
                return this.queue_of_students;
            }
            else if (group === "TAs"){
                return this.queue_of_students;
            }
            else if (group === "Professors"){
                return this.queue_of_students;
            }
        }
    }
});
