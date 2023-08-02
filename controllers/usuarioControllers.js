import {Usuario} from '../models/usuario.js';

export const login = async(req, res)=>{

    const usuario = req.body.usuario;
    const contrasena = req.body.contrasena;

    if(usuario && contrasena){
        try {
            const datosUsuario = await Usuario.login(usuario, contrasena);
            console.log("datos:" + !datosUsuario.length)
            if(!datosUsuario.length){
                res.status(401).render("index", {
                    alert: true,
                    alertTitle: "Error",
                    alertMessage: "Usuario y/o contraseña incorrecta",
                    alertIcon: "error",
                    showConfirmButton: false,
                    timer: 4000,
                    ruta: "",
                  });
            }else if(datosUsuario[0].id_rol == 1){
                res.redirect("/homeAdmin")

            }else{
                {
                    res.status(401).render("index", {
                        alert: true,
                        alertTitle: "Error",
                        alertMessage: "usuario rol usuario",
                        alertIcon: "error",
                        showConfirmButton: false,
                        timer: 4000,
                        ruta: "",
                      });
                }

            }
        } catch (error) {
            res.status(500).send('Error al acceder')
        }
        
    }else{
        res.status(400).render("index", {
            alert: true,
            alertTitle: "Precaución",
            alertMessage: "Debe llenar los campos para poder iniciar sesion",
            alertIcon: "warning",
            showConfirmButton: false,
            timer: 4000,
            ruta: "",
          });
    }
};