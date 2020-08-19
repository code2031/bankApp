import 'idempotent-babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/index';

const app = express();
const port = process.env.port || 5000;
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
 
require('../server/models');
app.use('/api', routes);
 
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;

//  "start": "concurrently \" npm run production\"  \" npm run client\" ",
