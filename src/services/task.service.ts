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
}

export default TaskService;
