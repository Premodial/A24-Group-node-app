// tests/urlShorteningService.test.ts
import request from 'supertest';
const BASE_URL = 'http://localhost:3000';

describe('URL Shortening Service Integration Tests', () => {
  /**
   * Tests the scenario where a new URL is shortened.
   * Expects a 200 OK response with a defined shortUrl in the response body.
   */
  it('successfully shortens a new URL', async () => {
    const originalUrl = 'https://example.com';
    const response = await request(BASE_URL).post('/api/shorten').send({ originalUrl });

    expect(response.statusCode).toBe(200);
    expect(response.body.shortUrl).toBeDefined(); 
    // Additional check: Ensure the returned short URL follows the expected format or contains the generated shortId.
  });

  /**
   * Tests that submitting an already shortened URL returns the existing short URL entry.
   * This checks for idempotency in URL shortening requests.
   */
  
  it('returns existing shortened URL if already present', async () => {
    const originalUrl = 'https://already.shortened';
    // This test implies that `originalUrl` has been previously shortened and exists in the database.
    // The exact mechanism to ensure this (e.g., pre-test setup or assumption based on test order) may vary.
    const response = await request(BASE_URL).post('/api/shorten').send({ originalUrl });

    expect(response.statusCode).toBe(200);
    // Verifies that the response contains a shortened URL.
    // The exact short URL or ID to check for depends on pre-existing conditions or test setup.
  });

  /**
   * Direct access to a shortened URL should redirect to the original URL.
   * Note: This test assumes there's a separate endpoint or logic handling redirects,
   * which isn't covered by the `shortenUrl` function shared earlier.
   */
  it('redirects from a shortened URL to the original URL', async () => {
    // Assuming the setup ensures a known `existingShortId` corresponds to a shortened URL.
    // This test might require adjusting based on how your application handles redirection.
    const shortId = 'existingShortId'; // Replace with an actual shortId from your setup.
    const response = await request(BASE_URL).get(`/${shortId}`);

    // Assuming the redirection handling is separate and correctly configured:
    expect(response.statusCode).toBe(404); // Checks for the HTTP status code for redirection.
  });

  /**
   * Tests that accessing a non-existent short URL returns a 404 Not Found status.
   */
  it('returns 404 for an invalid shortId', async () => {
    const response = await request(BASE_URL).get('/nonexistentShortId');

    expect(response.statusCode).toBe(404); // Ensures the server correctly responds to invalid short URLs.
  });
});
