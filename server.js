import dotenv from "dotenv";
dotenv.config();
import express from "express"
import helmet from 'helmet';
import morgan from 'morgan';
import connectDB from "./db/connection.js";
import apiRouter from "./routes/index.js";
import errorHandler from "./middlewares/errors.middleware.js";
import routeNotFound from "./middlewares/routeNotFound.middleware.js";

connectDB()

const app = express();

app.use(express.json());
app.use(helmet())
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1', apiRouter);
app.use(errorHandler);
app.use(routeNotFound)

const PORT = process.env.PORT || 8000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);