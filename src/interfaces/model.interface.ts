import ITask from './task.interface';

interface ITaskModel {
  create(task: ITask): Promise<ITask>;
  getAll(): Promise<ITask[]>
}

export default ITaskModel;
