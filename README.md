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

4.  **Add Environment Variables (CRITICAL STEP):**
    *   This is the most important step. Your application **will not work** without the API key.
    *   In the Render dashboard, go to the **Environment** section for your new service.
    *   Click "**Add Environment Variable**".
    *   **Key:** `GOOGLE_API_KEY`
    *   **Value:** Paste your **actual Google API key** here. Do not paste the text "Your_actual_google_api_key". It must be your real key.

    Here is a visual guide to finding the Environment Variables section on Render:
    


5.  **Deploy:** Click "Create Web Service". Render will automatically build and deploy your application. The first build may take a few minutes.

6.  **Troubleshooting:** If the app deploys but videos do not load, go to the **Logs** tab for your service in Render. Look for an error message that says `FATAL ERROR: GOOGLE_API_KEY is not defined`. This confirms that the key was not set correctly. Double-check your key and the variable name in the Environment section and redeploy if necessary.

    