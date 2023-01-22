import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import express from 'express';
import bodyParser from 'body-parser';

import router from './routes/index.js';
import errorHandler from './errors/errorHandler.js';
import connectDatabase from './config/connectDatabase.js';

// Configurations
dotenv.config({ path: './config/.env' });
const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(router);

app.use(errorHandler);

const PORT = process.env.PORT || 6000;
connectDatabase()
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}.`));
  })
  .catch((error) => console.log(`DID NOT CONNECT. ERROR: ${error}.`)); // todo

// todo: make tasks auto deleting, so the tasks will be deleted at 12am, when the new day starts
