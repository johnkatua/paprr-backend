import express, { json, urlencoded } from 'express';
import morgan from 'morgan';
import cors from 'cors';

export const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('dev'));

const port = 3000;

export const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}/api`);
    })
  } catch (error) {
    console.error(error);
  } 
}