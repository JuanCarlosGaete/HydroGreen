import express from 'express';
import {listarCliente, crearCliente, deshabilitarCliente, listarClienteDeshabilitado, habilitarCliente, editarCliente} from '../controllers/clienteControllers.js';
const router = express.Router();

router.post('/crearCliente', crearCliente);

router.get('/cliente', listarCliente);

router.get('/deshabilitarCliente/:id_cliente', deshabilitarCliente);

router.get('/clienteDeshabilitado', listarClienteDeshabilitado);

router.get('/habilitarCliente/:id_cliente', habilitarCliente);

router.post('/editarCliente', editarCliente);

export default router;