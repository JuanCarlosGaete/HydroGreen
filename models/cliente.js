import {createPool} from '../database/db.js';

//Se crea la clase empresa con sus propiedades 
class Cliente{
    constructor(rut, nombre, apellido, telefono, email, id_estado_usuario, id_empresa){
        this.rut = rut;
        this.nombre = nombre;
        this.apellido = apellido;
        this.telefono = telefono;
        this.email = email;
        this.id_estado_usuario = id_estado_usuario;
        this.id_empresa = id_empresa;
    }
}

Cliente.listarCliente = async () =>{
    try {
       const pool = await createPool();
       const connection = await pool.getConnection();
       const query = `SELECT cli.*, emp.nombre AS nombre_empresa FROM cliente cli JOIN empresa emp ON cli.id_empresa = emp.id_empresa WHERE cli.id_estado_usuario = 1 ORDER BY id_cliente DESC`;
       const [rows] = await connection.execute(query);
       return rows;
    } catch (error) {
      console.log('error en el metodo listar cliente: ', error);
    }
};

Cliente.crearCliente = async(cliente)=>{
    try {
       const pool = await createPool();
       const connection = await pool.getConnection();
       const query = 'INSERT INTO cliente(rut, nombre, apellido, telefono, email,  id_estado_usuario, id_empresa) VALUES (?,?,?,?,?,?,?)';
       const [rows] = await connection.execute(query, [
        cliente.rut, 
        cliente.nombre, 
        cliente.apellido, 
        cliente.telefono,
        cliente.email,
        cliente.id_estado_usuario,
        cliente.id_empresa]);
       
    } catch (error) {
        console.log('error en el metodo crear CLIENTE: ', error); 
    }
}

Cliente.deshabilitarCliente = async (cliente) =>{
    try {
       const estado = 2; 
       const pool = await createPool();
       const connection = await pool.getConnection();
       const query = `UPDATE cliente SET id_estado_usuario = ? WHERE id_cliente = ?`;
       const [rows] = await connection.execute(query,[estado, cliente]);

    } catch (error) {
       console.log(error);
    }
}

Cliente.listarClienteDeshabilitado = async () =>{
    try {
       const pool = await createPool();
       const connection = await pool.getConnection();
       const query = `SELECT cli.*, emp.nombre AS nombre_empresa FROM cliente cli JOIN empresa emp ON cli.id_empresa = emp.id_empresa WHERE cli.id_estado_usuario = 2 ORDER BY id_cliente DESC`;
       const [rows] = await connection.execute(query);
       return rows;
    } catch (error) {
      console.log('error en el metodo listar cliente deshabilitado: ', error);
    }
};

Cliente.habilitarCliente = async (cliente) =>{
    try {
       const estado = 1; 
       const pool = await createPool();
       const connection = await pool.getConnection();
       const query = `UPDATE cliente SET id_estado_usuario = ? WHERE id_cliente = ?`;
       const [rows] = await connection.execute(query,[estado, cliente]);

    } catch (error) {
       console.log(error);
    }
}

Cliente.editarCliente = async (cliente, id_cliente) =>{
    try {
        
        const pool = await createPool();
        const connection = await pool.getConnection();
        const query = `UPDATE cliente SET nombre = ?, apellido=?, telefono = ?, email = ? ,  id_estado_usuario = ?,  id_empresa = ? WHERE id_cliente = ?`;
        const [rows] = await connection.execute(query,[cliente.nombre, cliente.apellido, cliente.telefono, cliente.email, cliente.id_estado_usuario, cliente.id_empresa, id_cliente]);
        
     } catch (error) {
         console.log(error);
     }
}

export {Cliente};