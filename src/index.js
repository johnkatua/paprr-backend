import express, { json, urlencoded } from 'express';
import morgan from 'morgan';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send({ msg: "hello" })
});

const port = 3000;

const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server is running on http:localhost:${port}/api`)
    })
  } catch (error) {
    console.log(error);
  }
};

console.log('hello');

start();