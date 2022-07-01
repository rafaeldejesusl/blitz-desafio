import ITask from './task.interface';

interface ITaskModel {
  create(task: ITask): Promise<ITask>;
  getAll(): Promise<ITask[]>;
  erase(id: number): Promise<{ id: number }>;
  edit(id: number, status: string): Promise<void>;
  findByName(name: string): Promise<ITask[]>;
  findById(id: number): Promise<ITask[]>
}

export default ITaskModel;
