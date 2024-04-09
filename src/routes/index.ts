import { Router } from 'express';
import { shortenUrl, redirectUrl } from '../controllers/urlController';

/**
 * Initializes and configures routes for the URL shortening service. This setup
 * divides the routing concerns into a clear, manageable structure, facilitating
 * easy expansion and maintenance. Each route is associated with a controller function
 * that handles the business logic for that route's functionality.
 * 
 * The Router instance from Express simplifies the definition of request handlers
 * and can be easily integrated into the main application setup.
 */
const router = Router();

/**
 * POST /api/shorten - Endpoint for shortening a URL.
 * Accepts a URL in the request body and returns a shortened URL version.
 * The `shortenUrl` controller handles the core logic for URL validation,
 * shortening, and response formatting.
 * 
 * @returns A response containing the shortened URL on success, or an error message on failure.
 */
router.post('/shorten', shortenUrl);

/**
 * GET /:shortId - Endpoint for URL redirection.
 * Uses a shortId parameter to lookup the original URL and redirect the user.
 * The `redirectUrl` controller is responsible for validating the shortId,
 * querying the database for the corresponding original URL, and handling redirection.
 * 
 * @returns A 302 redirect to the original URL on success, or a 404 error if the shortId is invalid or not found.
 */
router.get('/:shortId', redirectUrl);

export default router;
