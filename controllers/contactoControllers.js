import {Contacto} from '../models/contacto.js';

export const crearContacto = async(req, res)=>{
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const telefono = req.body.telefono;
    const email = req.body.email;
    const fecha = new Date();
    const id_estado_usuario = 1;

    if(nombre && apellido && telefono && email && fecha){
        try {
            const contacto = new Contacto(nombre, apellido, telefono, email, fecha, id_estado_usuario);
            await Contacto.crearContacto(contacto);
            res.status(201).render("index", {
                alert: true,
                alertTitle: "Informacion recibida",
                alertMessage: "PRONTO NOS PONDREMOS EN CONTACTO CONTIGO",
                alertIcon: "success",
                showConfirmButton: false,
                timer: 4000,
                ruta: "",
              });
        } catch (error) {
            res.status(500).send('Error al crear el Contacto');
        }   
    }else{
        res.status(400).send('Error');
    }
};

export const listarContacto = async(req, res) =>{
    try {
        const datosContacto = await Contacto.listarContactos();
        res.render("contacto/listar", {datosContacto:datosContacto});
    } catch (error) {
        console.log(error);
    }
}

export const listarContactoDeshabilitado = async(req, res) =>{
    try {
        const datosContacto = await Contacto.listarContactosDeshabilitados();
        res.render("contacto/listarDeshabilitado", {datosContacto:datosContacto});
    } catch (error) {
        console.log(error);
    }
}

export const deshabilitarContacto = async(req, res) =>{
    const contacto = req.params.id_contacto
    try {
        await Contacto.deshabilitarContacto(contacto);
        res.redirect("/contacto")
    } catch (error) {
        console.log(error);
    }
}

export const habilitarContacto = async(req, res) =>{
    const contacto = req.params.id_contacto
    try {
        await Contacto.habilitarContacto(contacto);
        res.redirect("/contactoDeshabilitado")
    } catch (error) {
        console.log(error);
    }
}