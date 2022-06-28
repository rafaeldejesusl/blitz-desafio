import { Request, Response } from 'express';
import ITaskService from '../interfaces/service.interface';

class TaskController {
  public service: ITaskService;

  constructor(service: ITaskService) {
    this.service = service;
  }

  public create = async (req: Request, res: Response) => {
    const { name, status } = req.body;
    const createdAt = new Date();
    const newTask = await this.service.create({ name, createdAt, status });
    return res.status(201).json(newTask);
  };
}

export default TaskController;