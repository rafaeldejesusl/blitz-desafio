import { Pool, ResultSetHeader } from 'mysql2/promise';
import ITaskModel from '../interfaces/model.interface';
import ITask from '../interfaces/task.interface';

class TaskModel implements ITaskModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async create(task: ITask): Promise<ITask> {
    const { name, createdAt, status } = task;
    const result = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Ebytr.Tasks (name, createdAt, status) VALUES (?, ?, ?)',
      [name, createdAt, status],
    );
    const [dataInserted] = result;
    const { insertId } = dataInserted;
    return { id: insertId, ...task };
  }
}

export default TaskModel;
