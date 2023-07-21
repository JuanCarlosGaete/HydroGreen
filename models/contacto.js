import {createPool} from '../database/db.js';


//Se crea la clase contacto con sus propiedades 
class Contacto{
    constructor(nombre, apellido, telefono, email, fecha, id_estado_usuario){
        this.nombre = nombre;
        this.apellido = apellido;
        this.telefono = telefono;
        this.email = email;
        this.fecha = fecha;
        this.id_estado_usuario = id_estado_usuario;
    }
}

Contacto.crearContacto = async (contacto) =>{
    try {
       const pool = await createPool();
       const connection = await pool.getConnection();
       const query = `INSERT INTO contacto(nombre, apellido, telefono, email, fecha, id_estado_usuario) VALUES (?,?,?,?,?,?)`;
       const [rows] = await connection.execute(query, [contacto.nombre, contacto.apellido, contacto.telefono, contacto.email, contacto.fecha, contacto.id_estado_usuario]);
    } catch (error) {
      res.status(400)
       console.log('error en el metodo crear contacto: ', error);
    }

};

export {Contacto};