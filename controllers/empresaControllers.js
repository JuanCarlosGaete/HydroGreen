import {Empresa} from '../models/empresa.js';

export const crearEmpresa = async(req, res)=>{
    const nombre = req.body.nombre;
    const direccion = req.body.direccion;
    const comuna = req.body.comuna;
    const telefono = req.body.telefono;
    const fecha = new Date();
    const email = req.body.email;
    const id_estado_usuario = 1;

    if(nombre && direccion && comuna && telefono && email){
        try {
            const empresa = new Empresa(nombre, direccion, comuna, telefono, fecha, email, id_estado_usuario);

            await Empresa.crearEmpresa(empresa);

            res.redirect("empresa");

        } catch (error) {
            res.status(500).send('Error al crear el empresa');
        }   
    }else{
        res.status(400).send('Error');
    }
};

export const listarEmpresa = async(req, res) =>{
    try {
        const datosEmpresa = await Empresa.listarEmpresa();
        res.render("empresa/listar", {datosEmpresa:datosEmpresa});
    } catch (error) {
        console.log(error);
    }
}

export const listarEmpresaDeshabilitada = async(req, res) =>{
    try {
        const datosEmpresa = await Empresa.listarEmpresaDeshabilitadas();
        res.render("empresa/listarDeshabilitado", {datosEmpresa:datosEmpresa});
    } catch (error) {
        console.log(error);
    }
}

export const deshabilitarEmpresa = async(req, res) =>{
    const empresa = req.params.id_empresa;
    try {
        await Empresa.deshabilitarEmpresa(empresa);
        res.redirect("/empresa");
    } catch (error) {
        console.log(error);
    }
}

export const habilitarEmpresa = async(req, res) =>{
    const empresa = req.params.id_empresa;
    try {
        await Empresa.habilitarEmpresa(empresa);
        res.redirect("/empresaDeshabilitada")
    } catch (error) {
        console.log(error);
    }
}

export const editarEmpresa = async(req, res)=>{
    const id_empresa = req.body.id_empresa;
    const id_estado_usuario = req.body.id_estado_usuario;
    const fecha = req.body.fecha;
    const nombre = req.body.nombre;
    const direccion = req.body.direccion;
    const comuna = req.body.comuna;
    const telefono = req.body.telefono;
    const email = req.body.email;
    if(nombre && direccion && comuna && telefono && email && id_estado_usuario && fecha){
        try {
            const empresa = new Empresa(nombre, direccion, comuna, telefono, fecha, email, id_estado_usuario, id_empresa);

            await Empresa.editarEmpresa(empresa, id_empresa);

            res.redirect("empresa");

        } catch (error) {
            res.status(500).send('Error al editar la empresa');
        }   
    }else{
        res.status(400).send('Error');
    }
}