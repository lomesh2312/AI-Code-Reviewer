# AI Code Review & Refactoring Coach

An intelligent code review assistant that uses Google's Gemini AI to provide structured, opinionated, and explainable code feedback.

## Features

- **Automated Code Review**: Analyzes code for quality, performance, security, and best practices.
- **AI-Powered Feedback**: Uses Gemini 1.5 Flash for fast and accurate code analysis.
- **Refactoring Suggestions**: Provides actionable code improvements with examples.
- **Review History**: Tracks past reviews and improvements over time.
- **Modern UI**: Built with React, Tailwind CSS, and a clean, responsive design.

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Lucide React
- **Backend**: Node.js, Express, MongoDB (Mongoose)
- **AI Engine**: Google Gemini API (`gemini-flash-latest`)
- **Authentication**: Firebase Auth
- **Deployment**: Vercel (Frontend) & Railway (Backend)

## Local Development

### Prerequisites

- Node.js (v18+)
- MongoDB Atlas Account
- Firebase Project
- Google Gemini API Key

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/lomesh2312/AI-Code-Reviewer.git
    cd AI-Code-Reviewer
    ```

2.  **Install dependencies:**
    ```bash
    # Install root/frontend dependencies
    npm install

    # Install backend dependencies
    cd backend
    npm install
    cd ..
    ```

3.  **Environment Setup:**

    - Create `.env` in the root (Frontend):
      ```env
      VITE_FIREBASE_API_KEY=your_api_key
      VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
      VITE_FIREBASE_PROJECT_ID=your_project_id
      VITE_FIREBASE_STORAGE_BUCKET=your_bucket.appspot.com
      VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
      VITE_FIREBASE_APP_ID=your_app_id
      VITE_API_URL=/api
      ```

    - Create `backend/.env` (Backend):
      ```env
      PORT=5050
      MONGODB_URI=your_mongodb_connection_string
      GEMINI_API_KEY=your_gemini_api_key
      FIREBASE_CONFIG='{"type": "service_account", ...}'
      ```

4.  **Run Locally:**

    Start the backend and frontend in separate terminals:

    ```bash
    # Terminal 1: Backend
    cd backend
    npm run dev

    # Terminal 2: Frontend
    npm run dev
    ```

    Open [http://localhost:5173](http://localhost:5173) in your browser.

## Deployment

### Backend (Railway/Render/etc.)
1.  Deploy the `backend` folder.
2.  Set the environment variables similarly to `backend/.env`.
3.  Ensure the build command is `npm run build` and start command is `node dist/server.js`.

### Frontend (Vercel/Netlify)
1.  Deploy the root directory.
2.  Set the environment variables from `.env`.
3.  **Important**: Update `VITE_API_URL` to point to your deployed backend URL (e.g., `https://your-backend.railway.app/api`).

## License

MIT
