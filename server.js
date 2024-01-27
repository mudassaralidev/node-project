import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import connectDB from "./db/connection.js";
import apiRouter from "./routes/index.js";
import errorHandler from "./middlewares/errors.middleware.js";
import routeNotFound from "./middlewares/routeNotFound.middleware.js";

connectDB()

const app = express();
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
});

app.use(express.json());
app.use(cors())
app.use(helmet())
app.use(cookieParser());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(limiter);

app.use('/api/v1', apiRouter);
app.use(errorHandler);
app.use(routeNotFound)

const PORT = process.env.PORT || 8000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);