import express, { NextFunction, Request, Response } from 'express';
import TaskRoutes from './routes/task.routes';
import ErrorHandler from './interfaces/error.interface';
import 'express-async-errors';

const app = express();

app.use(express.json());

app.use(TaskRoutes);

const PORT = 3000;

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