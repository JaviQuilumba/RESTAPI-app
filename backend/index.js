const express = require('express');
const restAPI = require('./src/restAPI');
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const port = 3001;

// Swagger definition
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Movies API',
            description: 'API de películas con operaciones CRUD',
            contact: {
                name: 'Desarrollador'
            },
            servers: ['http://localhost:3001']
        }
    },
    apis: ['./src/restAPI.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(express.json());
app.use('/api', restAPI);

const startServer = async () => {
    app.listen(port, () => {
        console.log(`http://localhost:${port}`);
        console.log(`Swagger docs: http://localhost:${port}/api-docs`);
    });
};

startServer();
