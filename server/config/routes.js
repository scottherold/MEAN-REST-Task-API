// This module handles routing
// <--- Modules --->
const tasksController = require('../controllers/tasks'); // imports the controller

// <--- Routing --->
module.exports = app => {
    app.get('/tasks', tasksController.index); // root
    app.get('/tasks/:id', tasksController.show); // show
    app.post('/tasks', tasksController.create); // create
    app.put('/tasks/:id', tasksController.update); // update
    app.delete('/tasks/:id', tasksController.destroy); // delete
}