import express from 'express';
import {crearContacto} from '../controllers/contactoControllers.js';
const router = express.Router();

router.post('/crearContacto', crearContacto);

export default router;