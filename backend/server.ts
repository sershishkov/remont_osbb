import path from 'path';
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

import { errorHandler } from './middlewares/errorMiddleware';
import connectDB from './config/db';
import router from './routes/index';
dotenv.config();

connectDB();

const port = process.env.PORT || 5000;
const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', router);
//Serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req: Request, res: Response) => {
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    );
  });
} else {
  app.get('/', (req: Request, res: Response) => {
    res.send('Please set to production');
  });
}
app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
