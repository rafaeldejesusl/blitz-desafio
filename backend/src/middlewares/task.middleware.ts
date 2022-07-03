import { Request, Response, NextFunction } from 'express';
import connection from '../models/connection';
import TaskModel from '../models/task.model';

const model = new TaskModel(connection);

async function validateName(req: Request, res: Response, next: NextFunction) {
  const { name } = req.body;
  const searchedTask = await model.findByName(name);
  if (searchedTask.length > 0) {
    return next({ status: 400, message: 'Esta tarefa já existe' });
  }
  return next();
}

async function validateId(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const searchedTask = await model.findById(Number(id));
  if (searchedTask.length === 0) {
    return next({ status: 400, message: 'Esta tarefa não existe' });
  }
  return next();
}

async function validateStatus(req: Request, res: Response, next: NextFunction) {
  const { status } = req.body;
  const statusList = ['Pendente', 'Em Andamento', 'Pronto'];
  if (!statusList.includes(status)) {
    return next({ status: 400, message: 'Status inválido' });
  }
  return next();
}

export { validateName, validateId, validateStatus };