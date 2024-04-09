import express, { Request, Response } from 'express';
const admin = require('firebase-admin');
import bodyParser from 'body-parser';
import urlRoutes from './routes/index'; // Make sure you have an index.ts in your routes folder that exports the routes.

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

/**
 * Middleware registration.
 * - bodyParser.json() is used to parse incoming request bodies in a middleware before your handlers, available under the req.body property.
 * - bodyParser.urlencoded({ extended: true }) is used to parse URL-encoded bodies and allows rich objects and arrays to be encoded into the URL-encoded format, allowing for a JSON-like experience with URL-encoded.
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Route setup. This imports URL routing definitions from the routes directory, 
 * applying them under the '/api' namespace. This structure facilitates clean API versioning and organization.
 */
app.use('/api', urlRoutes);

/**
 * Root route definition. Serves as a simple health check or API information endpoint.
 * When a GET request is made to the root ('/') of the server, a brief message is returned.
 * This can be useful for monitoring tools or providing API version information.
 */
app.get('/', (req: Request, res: Response) => {
  res.send('URL Shortening Service API');
});

/**
 * Server activation. Listens for connections on the specified port, with the port number determined
 * by the environment variable PORT, or 3000 as a default. This flexible setup allows for easy deployment
 * to various environments where the port might be assigned by the hosting environment.
 */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
