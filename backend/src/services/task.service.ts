import ITaskModel from '../interfaces/model.interface';
import ITask from '../interfaces/task.interface';

class TaskService {
  public model: ITaskModel;

  constructor(model: ITaskModel) {
    this.model = model;
  }

  public async create(task: ITask): Promise<ITask> {
    const newTask = this.model.create(task);
    return newTask;
  }

  public async getAll(): Promise<ITask[]> {
    const tasks = await this.model.getAll();
    return tasks;
  }

  public async erase(id: number): Promise<{ id: number }> {
    const deletedTask = await this.model.erase(id);
    return deletedTask;
  }

  public async edit(id: number, status: string): Promise<void> {
    await this.model.edit(id, status);
  }
}

export default TaskService;
