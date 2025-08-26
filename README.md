# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Deploying to Render

To deploy this project to Render, follow these steps:

1.  **Push to GitHub:** Create a new repository on GitHub and push your project code to it.

2.  **Create a New Web Service on Render:**
    *   Go to your Render Dashboard and click "New" > "Web Service".
    *   Connect your GitHub account to Render.
    *   Select the repository you just created.
    *   Render will automatically detect that it's a Node.js project.

3.  **Configure Settings:**
    *   **Name:** Give your service a name (e.g., `halaltube`).
    *   **Build Command:** `npm install && npm run build` (this should be the default).
    *   **Start Command:** `npm start` (this should be the default).

4.  **Add Environment Variables (VERY IMPORTANT):**
    *   This is the most critical step. Your application will not work without the API key.
    *   In the Render dashboard, go to the "Environment" section for your new service.
    *   Click "Add Environment Variable".
    *   **Key:** `GOOGLE_API_KEY`
    *   **Value:** `Your_actual_google_api_key` (Paste your real YouTube Data API v3 key here).

5.  **Deploy:** Click "Create Web Service". Render will automatically build and deploy your application. The first build may take a few minutes.
