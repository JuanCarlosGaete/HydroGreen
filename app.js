import express from 'express';
import dotenv from'dotenv';
import cookieParser from 'cookie-parser';
import routes from './routes/indexRoutes.js';

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

// // LLamar al router

app.use(routes);
// app.use('/', require('./routes/indexRoutes'))

// const usuario = require('./routes/usuario')
// app.use(usuario);

// const empresa = require('./routes/empresa')
// app.use(empresa)

// const cliente = require('./routes/cliente')
// app.use(cliente)


app.listen(3000, () =>{
    console.log('Servidor Corriendo en http://localhost:3000')
})