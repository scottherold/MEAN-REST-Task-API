// This module constructs the Task model for us in the application
// <--- Modules --->
const mongoose = require('mongoose'); // import mongoose for model construction
const { Schema } = mongoose; // constructs empty schema object from mongoose

// <--- Schema --->
// uses blank schema object to be added to the mongoose object with module.export
const TaskSchema = new Schema({
    title: String,
    description: {
        type: String,
        default: ''
    },
    completed: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

// <--- Document Model --->
module.exports = mongoose.model('Task', TaskSchema); // Attach schema to mongoose object to create documents / chain mongoose methods (added in DB connection file)