import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import express from 'express';
import bodyParser from 'body-parser';

import router from './routes/index.js';
import ApiError from './errors/ApiError.js';
import errorHandler from './errors/errorHandler.js';
import connectDatabase from './config/connectDatabase.js';
import terminate from './errors/terminate.js';

// Configurations
dotenv.config({ path: './config/.env' });
let server;
const app = express();
const PORT = process.env.PORT || 6000;

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(router);
app.use(errorHandler);

connectDatabase();

server = app.listen(PORT, () => console.log(`Server Port: ${PORT}.`));

const exitHandler = terminate(server, {
  coreDump: false,
  timeout: 500,
});

process.on('uncaughtException', exitHandler(1, 'Unexpected Error'));
process.on('unhandledRejection', exitHandler(1, 'Unhandled Promise'));
