import { Router } from 'express';

const countriesRouter = Router();

countriesRouter.get('/', (req, res) => res.send('GET all countries'));
countriesRouter.post('/', (req, res) => res.send('POST country'));
countriesRouter.get('/:code', (req, res) => res.send('GET single country'));
countriesRouter.put('/:code', (req, res) => res.send('UPDATE single country'));
countriesRouter.delete('/:code', (req, res) => res.send('DELETE single country'));

export default countriesRouter;