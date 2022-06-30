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

  public getAll = async (req: Request, res: Response) => {
    const tasks = await this.service.getAll();
    return res.status(200).json(tasks);
  };

  public erase = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.service.erase(Number(id));
    return res.status(204).end();
  };
}

export default TaskController;