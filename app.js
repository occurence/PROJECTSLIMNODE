import express from 'express';
import logger from 'morgan';
import cors from 'cors';

import usersRouter from './routes/api/usersRouter.js';
import productsRouter from './routes/api/productsRouter.js';
import todaysRouter from './routes/api/todaysRouter.js';
// import { swaggerSpecs, swaggerUi } from './swaggerConfig.js';

const app = express();
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';
const { PORT } = process.env;//

app.use(logger(formatsLogger));
// app.use(cors());
app.use(cors({
  // origin: `http://localhost:${PORT}`,
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());





app.use(express.static("public"));
// app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));






app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
app.use('/api/todays', todaysRouter);

app.use((_req, res) => {
  res.status(404).json({ message: 'Not found' });
})

app.use((err, _req, res, _next) => {
  res.status(500).json({ message: err.message });
})

export { app };