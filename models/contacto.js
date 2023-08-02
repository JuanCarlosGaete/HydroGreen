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
       console.log('error en el metodo crear contacto: ', error);
    }
};

Contacto.listarContactos = async () =>{
    try {
       const pool = await createPool();
       const connection = await pool.getConnection();
       const query = `SELECT *, DATE_FORMAT(fecha, '%d/%m/%Y') AS fecha_registro FROM contacto WHERE id_estado_usuario = 1 ORDER BY fecha DESC`;
       const [rows] = await connection.execute(query);
       return rows;
    } catch (error) {
      console.log('error en el metodo listar contacto: ', error);
    }
};

Contacto.listarContactosDeshabilitados = async () =>{
    try {
       const pool = await createPool();
       const connection = await pool.getConnection();
       const query = `SELECT *, DATE_FORMAT(fecha, '%d/%m/%Y') AS fecha_registro FROM contacto WHERE id_estado_usuario = 2 ORDER BY fecha DESC`;
       const [rows] = await connection.execute(query);

       return rows;
    } catch (error) {
      console.log('error en el metodo listar contacto: ', error);
    }

};

Contacto.deshabilitarContacto = async (contacto) =>{
    try {
       const estado = 2; 
       const pool = await createPool();
       const connection = await pool.getConnection();
       const query = `UPDATE contacto SET id_estado_usuario = ? WHERE id_contacto = ?`;
       const [rows] = await connection.execute(query,[estado, contacto]);
    } catch (error) {
       console.log(error);
    }
}

Contacto.habilitarContacto = async (contacto) =>{
    try {
       const estado = 1; 
       const pool = await createPool();
       const connection = await pool.getConnection();
       const query = `UPDATE contacto SET id_estado_usuario = ? WHERE id_contacto = ?`;
       const [rows] = await connection.execute(query,[estado, contacto]);
    } catch (error) {
        console.log(error);
    }
}

export {Contacto};