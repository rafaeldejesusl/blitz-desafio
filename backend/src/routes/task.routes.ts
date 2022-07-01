import { Router } from 'express';
import connection from '../models/connection';
import TaskModel from '../models/task.model';
import TaskService from '../services/task.service';
import TaskController from '../controllers/task.controller';
import { validateId, validateName, validateStatus } from '../middlewares/task.middleware';

const router = Router();

const taskController = new TaskController(new TaskService(new TaskModel(connection)));

router.get('/tasks', taskController.getAll);

router.post('/tasks', validateName, validateStatus, taskController.create);

router.delete('/tasks/:id', validateId, taskController.erase);

router.put('/tasks/:id', validateId, validateStatus, taskController.edit);

export default router;