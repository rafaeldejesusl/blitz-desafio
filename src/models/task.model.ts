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

  public async getAll(): Promise<ITask[]> {
    const result = await this.connection.execute(
      'SELECT * FROM Ebytr.Tasks',
    );
    const [rows] = result;
    return rows as ITask[];
  }

  public async erase(id: number): Promise<{ id: number }> {
    await this.connection.execute(
      'DELETE FROM Ebytr.Tasks WHERE id=?',
      [id],
    );
    return { id };
  }

  public async edit(id: number, status: string): Promise<void> {
    await this.connection.execute(
      'UPDATE Ebytr.Tasks SET status=? WHERE id=?',
      [status, id],
    );
  }
}

export default TaskModel;
