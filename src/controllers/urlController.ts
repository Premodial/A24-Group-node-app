import { Request, Response } from 'express';
import admin from '../firebaseAdmin'; // Ensure this module correctly initializes Firebase Admin SDK
import { validateUrl, generateUniqueId } from '../services/urlService'; // Your URL validation logic
const db = admin.firestore();
const urlsCollection = db.collection('urls');


/**
 * Schema for URL documents in Firestore:
 * {
 *   originalUrl: string,
 *   shortId: string,
 *   createdAt: Timestamp
 * }
 */

/**
 * Attempts to shorten a given URL. Validates the URL, checks if it's already been shortened,
 * and either returns the existing short URL or creates a new one.
 *
 * @param {Request} req - Express request object, containing the original URL in the body.
 * @param {Response} res - Express response object for sending back the shortened URL or errors.
 * @returns {Promise<Response>} A promise resolving with the operation result.
 */
export const shortenUrl = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { originalUrl } = req.body;
    if (!validateUrl(originalUrl)) {
      return res.status(400).json({ error: 'Invalid URL format.' });
    }

    const urlCode = generateUniqueId(10); // You can adjust the length as needed
    const existingUrls = await urlsCollection.where('originalUrl', '==', originalUrl).get();

    if (!existingUrls.empty) {
      const existingUrl = existingUrls.docs[0].data();
      return res.json({ shortUrl: `${req.protocol}://${req.get('host')}/${existingUrl.shortId}` });
    } else {
      const shortUrl = `${req.protocol}://${req.get('host')}/api/${urlCode}`;
      await urlsCollection.add({
        originalUrl,
        shortId: urlCode,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      return res.json({ shortUrl });
    }
  } catch (error) {
    console.error('Error in shortenUrl:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};


/**
 * Redirects to the original URL based on a provided short ID. If the short ID doesn't exist,
 * responds with a 404 error.
 *
 * @param {Request} req - Express request object, containing the shortId as a route parameter.
 * @param {Response} res - Express response object for redirecting or sending back errors.
 * @returns {Promise<void>} A promise resolving with no return value.
 */
export const redirectUrl = async (req: Request, res: Response): Promise<void> => {
  try {
    const { shortId } = req.params;
    const urlDoc = await urlsCollection.where('shortId', '==', shortId).get();

    if (!urlDoc.empty) {
      const urlData = urlDoc.docs[0].data();
      res.redirect(urlData.originalUrl);
    } else {
      res.status(404).json({ error: 'No URL found for this code.' });
    }
  } catch (error) {
    console.error('Error in redirectUrl:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
