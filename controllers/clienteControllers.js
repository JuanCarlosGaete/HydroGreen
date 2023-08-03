import {Cliente} from '../models/cliente.js'
import {Empresa} from '../models/empresa.js';

export const listarCliente = async(req, res) =>{
    const alerta = 'Alarma';
    try {
        const datosCliente = await Cliente.listarCliente();
        const datosEmpresa = await Empresa.listarEmpresa();
        res.render("cliente/listar", {
            datosCliente:datosCliente,
            datosEmpresa:datosEmpresa,
            alerta
        });
    } catch (error) {
        console.log(error);
    }
}

export const crearCliente = async(req, res)=>{
    const rut = req.body.rut;
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const telefono = req.body.telefono;
    const email = req.body.email;
    const id_estado_usuario = 1;
    const id_empresa = req.body.id_empresa;
    
    var Fn = {
        // Valida el rut con su cadena completa "XXXXXXXX-X"
        validaRut : function (rutCompleto) {
          rutCompleto = rutCompleto.replace("‐","-");
          if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test( rutCompleto ))
            return false;
          var tmp 	= rutCompleto.split('-');
          var digv	= tmp[1]; 
          var rut 	= tmp[0];
          if ( digv == 'K' ) digv = 'k' ;
          
          return (Fn.dv(rut) == digv );
        },
        dv : function(T){
          var M=0,S=1;
          for(;T;T=Math.floor(T/10))
            S=(S+T%10*(9-M++%6))%11;
          return S?S-1:'k';
        }
      }

        if(rut && nombre && apellido && telefono && email){
            try {
                const cliente = new Cliente(rut, nombre, apellido, telefono, email, id_empresa, id_estado_usuario);
    
                await Cliente.crearCliente(cliente);
    
                res.redirect("cliente");
    
            } catch (error) {
                res.status(500).send('Error al crear el cliente');
            }   
        }else{
            res.status(400).send('Error');
        }
    };

export const deshabilitarCliente = async(req, res) =>{
    const cliente = req.params.id_cliente;
    try {
        await Cliente.deshabilitarCliente(cliente);
        res.redirect("/cliente");
    } catch (error) {
        console.log(error);
    }
}

export const listarClienteDeshabilitado = async(req, res) =>{
    try {
        const datosCliente = await Cliente.listarClienteDeshabilitado();
        res.render("cliente/listarDeshabilitado", {
            datosCliente:datosCliente
        });
    } catch (error) {
        console.log(error);
    }
}

export const habilitarCliente = async(req, res) =>{
    const cliente = req.params.id_cliente;
    try {
        await Cliente.habilitarCliente(cliente);
        res.redirect("/clienteDeshabilitado");
    } catch (error) {
        console.log(error);
    }
}

export const editarCliente = async(req, res)=>{
    
    const id_cliente = req.body.id_cliente;
    const rut = req.body.rut;
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const telefono = req.body.telefono;
    const email = req.body.email;
    const id_empresa = req.body.id_empresa;
    const id_estado_usuario = 1 ;

    if(nombre && apellido && telefono && email){
        try {
            const cliente = new Cliente(rut, nombre, apellido, telefono, email, id_estado_usuario, id_empresa);

            await Cliente.editarCliente(cliente, id_cliente);

            res.redirect("cliente");

        } catch (error) {
            res.status(500).send('Error al editar el cliente');
        }   
    }else{
        res.status(400).send('Error');
    }
}

