import {createPool} from '../database/db.js';
import jwt from "jsonwebtoken";


//Se crea la clase contacto con sus propiedades 
class Usuario{
    constructor(usuario, contrasena, id_estado_usuario, id_rol, id_cliente){
        this.usuario = usuario;
        this.contrasena = contrasena;
        this.id_estado_usuario = id_estado_usuario;
        this.id_rol = id_rol;
        this.id_cliente = id_cliente;
    }
}

Usuario.login = async (usuario, contrasena) =>{
    try {
        console.log("parametros: "+ usuario, contrasena)
        const pool = await createPool();
        const connection = await pool.getConnection();
        const query = `SELECT * FROM usuario WHERE usuario = ? AND contrasena = ?`;
        const [rows] = await connection.execute(query, [usuario, contrasena]);

        if(!rows.length){
            console.log("vacio");
            return rows;
        }else{
            const id_usuario = rows.id_usuario;
            const token = jwt.sign(
            { id_usuario: id_usuario },
            process.env.JWT_SECRETO,
            {
              expiresIn: process.env.JWT_TIEMPO_EXPIRA,
            } );
            console.log("token: "+ token + " para el usuario:" +[rows][0][0].usuario);
            console.log([rows])

            return rows;
        }
    } catch (error) {
      res.status(400)
       console.log('error en el metodo login: ', error);
    }
};
export {Usuario};