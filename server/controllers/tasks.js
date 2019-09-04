// This module handles the 'tasks' controller functions
// <--- Modules --->
const Task = require('mongoose').model('Task'); // Imporst task model

// <--- Controller Functions --->
module.exports = {
    index(req, res) {
        // find all tasks
        Task.find()
            .then(tasks => res.json({tasks: tasks})) // passed with a key to be accessed by Angular
            .catch(err => res.json(err));
    },
    show(req, res) {
        // display one task by ._id
        Task.findById(req.params.id)
            .then(task => {
                res.json({task: task} ? task : 'No such task exists...'); // return JSON task object, unless task doesn't exist, then return note; passed with a key to be accessed by Angular
            })
            .catch(err => res.json(err));
    },
    create(req, res) {
        // create new task
        Task.create(req.body)
            .then(task => res.json({task: task})) // passed with a key to be accessed by Angular
            .catch(err => res.json(err));
    },
    update(req, res) {
        // update task by ._id
        Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then(task => res.json({task: task})) // passed with a key to be accessed by Angular
            .catch(err => res.json(err));
    },
    destroy(req, res) {
        // delete task by id
        Task.findByIdAndRemove(req.params.id)
            .then(result => res.json(result))
            .catch(err => res.json(err))
    }
}