const express = require('express');
const cors = require('cors');
const {dbConection} = require('../database/config');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            alumnos: '/api/alumnos',
            maestros: '/api/maestros',
            cursos: '/api/cursos'
        }
        // this.authPath = '/api/auth';
        // this.alumnosPath = '/api/alumnos';
        // this.maestrosPath = '/api/maestros';

        this.conectarDB();
        this.middlewares();
        this.routes();
    }

    async conectarDB(){
        await dbConection();
    }

    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));

    }

    routes(){
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.alumnos, require('../routes/alumno'));
        this.app.use(this.paths.maestros, require('../routes/maestro'));
        this.app.use(this.paths.cursos, require('../routes/curso'));
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log('Servidor corriendo en puerto', this.port);
        })
    }
}

module.exports = Server;







