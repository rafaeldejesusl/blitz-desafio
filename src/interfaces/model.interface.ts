import ITask from './task.interface';

interface ITaskModel {
  create(task: ITask): Promise<ITask>;
  getAll(): Promise<ITask[]>;
  erase(id: number): Promise<{ id: number }>
}

export default ITaskModel;
