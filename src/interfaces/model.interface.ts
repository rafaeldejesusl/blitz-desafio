import ITask from './task.interface';

interface ITaskModel {
  create(task: ITask): Promise<ITask>;
}

export default ITaskModel;
