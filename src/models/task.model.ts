import { Pool, ResultSetHeader } from 'mysql2/promise';
import Task from '../interfaces/task.interface';

class TaskModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async create(task: Task): Promise<Task> {
    const { name, createdAt, status } = task;
    const result = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Ebytr.Tasks (name, createdAt, status) VALUES (?, ?, ?, ?)',
      [name, createdAt, status],
    );
    const [dataInserted] = result;
    const { insertId } = dataInserted;
    return { id: insertId, ...task };
  }
}

export default TaskModel;
