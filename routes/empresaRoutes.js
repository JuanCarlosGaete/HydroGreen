import express from 'express';
import {listarEmpresa, crearEmpresa, deshabilitarEmpresa, listarEmpresaDeshabilitada, habilitarEmpresa, editarEmpresa} from '../controllers/empresaControllers.js';
const router = express.Router();

router.post('/agregarEmpresa', crearEmpresa);

router.get('/empresa', listarEmpresa);

router.get('/deshabilitarEmpresa/:id_empresa', deshabilitarEmpresa);

router.get('/empresaDeshabilitada', listarEmpresaDeshabilitada);

router.get('/habilitarEmpresa/:id_empresa', habilitarEmpresa);

router.post('/editarEmpresa', editarEmpresa);

export default router;