import express from 'express';
import dotenv from'dotenv';
import cookieParser from 'cookie-parser';
import routes from './routes/indexRoutes.js';
import contactoRoutes from './routes/contactoRoutes.js';
import usuarioRoutes from './routes/usuarioRoutes.js';
import empresaRoutes from './routes/empresaRoutes.js';

const app = express()

//seteo para el motor de plantillas ejs
app.set('view engine', 'ejs')

//seteo la carpeta publica
app.use(express.static('public'))

//para procesar datos enviados desde forms
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//seteo de las variales de entorno
dotenv.config({path: './env/.env'})

// para poder trabajar con las cookies
app.use(cookieParser())


// LLamar al router
app.use(routes);
app.use(contactoRoutes);
app.use(usuarioRoutes);
app.use(empresaRoutes);

app.listen(3000, () =>{
    console.log('Servidor Corriendo en http://localhost:3000')
})