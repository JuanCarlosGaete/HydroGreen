import {createPool} from '../database/db.js';

//Se crea la clase empresa con sus propiedades 
class Empresa{
    constructor(nombre, direccion, comuna, telefono, fecha, email, id_estado_usuario){
        this.nombre = nombre;
        this.direccion = direccion;
        this.comuna = comuna;
        this.telefono = telefono;
        this.fecha = fecha;
        this.email = email;
        this.id_estado_usuario = id_estado_usuario;
    }
}

Empresa.crearEmpresa = async(empresa)=>{
    try {
       const pool = await createPool();
       const connection = await pool.getConnection();
       const query = 'INSERT INTO empresa(nombre, direccion, comuna, telefono, fecha, email, id_estado_usuario) VALUES (?,?,?,?,?,?,?)';
       const [rows] = await connection.execute(query, [empresa.nombre, empresa.direccion, empresa.comuna, empresa.telefono, empresa.fecha, empresa.email, empresa.id_estado_usuario]);
       
    } catch (error) {
        console.log('error en el metodo crear empresa: ', error); 
    }
}

Empresa.listarEmpresa = async () =>{
    try {
       const pool = await createPool();
       const connection = await pool.getConnection();
       const query = `SELECT * FROM empresa WHERE id_estado_usuario = 1 ORDER BY id_empresa DESC`;
       const [rows] = await connection.execute(query);
       return rows;
    } catch (error) {
      console.log('error en el metodo listar empresa: ', error);
    }
};

Empresa.listarEmpresaDeshabilitadas = async () =>{
    try {
       const pool = await createPool();
       const connection = await pool.getConnection();
       const query = `SELECT * FROM empresa WHERE id_estado_usuario = 2 ORDER BY fecha DESC`;
       const [rows] = await connection.execute(query);
       return rows;

    } catch (error) {
      console.log('error en el metodo listar empresas deshabilitasa: ', error);
    }

};

Empresa.deshabilitarEmpresa = async (empresa) =>{
    try {
       const estado = 2; 
       const pool = await createPool();
       const connection = await pool.getConnection();
       const query = `UPDATE empresa SET id_estado_usuario = ? WHERE id_empresa = ?`;
       const [rows] = await connection.execute(query,[estado, empresa]);

    } catch (error) {
       console.log(error);
    }
}

Empresa.habilitarEmpresa = async (empresa) =>{
    try {
       const estado = 1; 
       const pool = await createPool();
       const connection = await pool.getConnection();
       const query = `UPDATE empresa SET id_estado_usuario = ? WHERE id_empresa = ?`;
       const [rows] = await connection.execute(query,[estado, empresa]);
    } catch (error) {
        console.log(error);
    }
}

Empresa.editarEmpresa = async (empresa, id_empresa) =>{
    try {
        console.log(empresa.nombre, empresa.direccion, empresa.comuna, empresa.telefono ,empresa.fecha ,empresa.email, empresa.id_estado_usuario, id_empresa)
        const pool = await createPool();
        const connection = await pool.getConnection();
        const query = `UPDATE empresa SET nombre = ?, direccion=?, comuna = ?, telefono = ?, fecha = ?, email= ?, id_estado_usuario= ? WHERE id_empresa = ?`;
        const [rows] = await connection.execute(query,[empresa.nombre, empresa.direccion, empresa.comuna, empresa.telefono ,empresa.fecha ,empresa.email, empresa.id_estado_usuario, id_empresa]);
        
     } catch (error) {
         console.log(error);
     }
}
export {Empresa};