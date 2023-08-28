const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { handleErrors } = require('./middlewares/handleErrors');
require('dotenv').config();
const Router = require('./routes');
const { requestRateLimiter } = require('./utils/requestRateLimiter');

const { PORT = 3000, URI = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

mongoose.connect(URI);

const app = express();
app.use(cors({ origin: ['http://ststas.nomoredomainsicu.ru', 'https://ststas.nomoredomainsicu.ru'], credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(requestLogger);
app.use(requestRateLimiter);
app.use('/', Router);
app.use(errorLogger);
app.use(errors());
app.use(handleErrors);
app.listen(PORT);
