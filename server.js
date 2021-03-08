// import app
import app from './src/app';

// import the app url and port configuration
import { url, port, enviroment } from './src/config/serverConfig';

// Start the server
app.listen(port, () => console.log(`BankAPP API server started on ${enviroment}: ${url}:${port}`));
