import './db/index.js';
import express from 'express';
import errorHandler from './middlewares/errorHandler.js';
import countriesRouter from './routes/countriesRouter.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/countries', countriesRouter);
app.use('*', (req, res) => res.sendStatus(404));
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running at http://localhost:${port}`));