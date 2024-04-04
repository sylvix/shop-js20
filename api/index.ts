import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import config from './config';
import productsRouter from './routers/products';
import categoriesRouter from './routers/categories';
import usersRouter from './routers/users';

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);
app.use('/users', usersRouter);

const run = async () => {
  await mongoose.connect(config.mongoose.db);

  app.listen(config.port, () => {
    console.log(`Server started on ${config.port} port!`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

void run();
