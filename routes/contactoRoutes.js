import express from 'express';
import {crearContacto, deshabilitarContacto, listarContacto, listarContactoDeshabilitado, habilitarContacto} from '../controllers/contactoControllers.js';
const router = express.Router();

router.post('/crearContacto', crearContacto);

router.get('/contacto', listarContacto);

router.get('/deshabilitarContacto/:id_contacto', deshabilitarContacto);

router.get('/contactoDeshabilitado', listarContactoDeshabilitado);

router.get('/habilitarContacto/:id_contacto', habilitarContacto);

export default router;