import './myConnection'; // Database Connection
import express from 'express';
import swaggerUIExpress from 'swagger-ui-express';
import swaggerDocs from './apiDocs/swagger.json';
import routes from './routes/index';

const app = express();

app.use('/api-docs', swaggerUIExpress.serve, swaggerUIExpress.setup(swaggerDocs));
app.use('/api', routes);

export default app;

 
