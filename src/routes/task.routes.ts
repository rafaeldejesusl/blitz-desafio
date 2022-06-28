import { Router } from 'express';
import connection from '../models/connection';
import TaskModel from '../models/task.model';
import TaskService from '../services/task.service';
import TaskController from '../controllers/task.controller';

const router = Router();

const taskController = new TaskController(new TaskService(new TaskModel(connection)));

router.post('/tasks', taskController.create);

export default router;