import ITask from './task.interface';

interface ITaskService {
  create(task: ITask): Promise<ITask>;
  getAll(): Promise<ITask[]>
}

export default ITaskService;