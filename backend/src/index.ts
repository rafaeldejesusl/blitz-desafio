import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import TaskRoutes from './routes/task.routes';
import ErrorHandler from './interfaces/error.interface';
import cors from 'cors';
import 'express-async-errors';

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use(TaskRoutes);

const PORT = process.env.PORT || 3000;

app.use((err: ErrorHandler, req: Request, res: Response, _next: NextFunction) => {
  const { status, message } = err;
  if (status) {
    return res.status(status).json({ message });
  }
  return res.status(500).json({ message });
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});

export default app;