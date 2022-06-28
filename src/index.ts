import express from 'express';
import TaskRoutes from './routes/task.routes';

const app = express();

app.use(express.json());

app.use(TaskRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
