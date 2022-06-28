import ITask from './task.interface';

interface ITaskService {
  create(task: ITask): Promise<ITask>;
}

export default ITaskService;