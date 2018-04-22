import { Meteor } from "meteor/meteor";
import { Log } from "../models/utility/log";

Meteor.methods({
    'addLog' (str){

        let d = new Date();

        Log.insert({
            event: d.toLocaleString('ru-RU') + ' | ' + str
        });

        // console.log(Log.find().map(log => log.event));
    },
});