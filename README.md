# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Deploying to Render

To deploy this project to Render, follow these steps:

1.  **Push to GitHub:** Create a new repository on GitHub and push your project code to it.
2.  **Create a New Web Service on Render:**
    *   Connect your GitHub account to Render.
    *   Select your repository.
    *   Render will automatically detect that it's a Node.js project.
3.  **Configure Settings:**
    *   **Build Command:** `npm install && npm run build`
    *   **Start Command:** `npm start`
4.  **Add Environment Variables:**
    *   In the Render dashboard, go to the "Environment" section for your service.
    *   You **must** add your `GOOGLE_API_KEY` here for the YouTube integration to work.
    *   Key: `GOOGLE_API_KEY`
    *   Value: `Your_actual_google_api_key`
5.  **Deploy:** Click "Create Web Service". Render will automatically build and deploy your application.
