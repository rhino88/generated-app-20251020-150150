# StellarFrame

> An AI-powered application to generate stunning, high-quality videos from simple text prompts, wrapped in a delightful, illustrative user interface.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/rhino88/generated-app-20251020-150150)

## 🌟 Overview

StellarFrame is a visually captivating web application that empowers users to generate high-quality videos from text prompts, leveraging a simulated SORA API. The application is designed with an 'Illustrative' and whimsical aesthetic, featuring custom graphics, playful animations, and an expressive, human-centered UI.

The core user journey involves a secure authentication flow, leading to a creation dashboard where users can input their creative prompts, select video parameters, and initiate the generation process. Completed videos are displayed for playback and download, and are automatically saved to a personal, elegantly designed gallery.

## ✨ Key Features

-   **AI Video Generation**: Create high-quality videos from simple text prompts.
-   **User Authentication**: Secure login and signup functionality.
-   **Creation Dashboard**: An intuitive interface to enter prompts and configure video settings like aspect ratio.
-   **Personal Gallery**: Browse, play, and manage all your previously generated videos in a beautiful grid layout.
-   **Engaging UI/UX**: A delightful, illustrative design with smooth animations and micro-interactions.
-   **Responsive Design**: A flawless experience across all devices, from mobile phones to desktops.

## 🛠️ Technology Stack

-   **Frontend**: [React](https://react.dev/), [Vite](https://vitejs.dev/), [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/), [Zustand](https://zustand-demo.pmnd.rs/), [Framer Motion](https://www.framer.com/motion/)
-   **Backend**: [Cloudflare Workers](https://workers.cloudflare.com/), [Hono](https://hono.dev/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Forms & Validation**: [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/)
-   **Package Manager**: [Bun](https://bun.sh/)

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   [Node.js](https://nodejs.org/en) (v20.x or later recommended)
-   [Bun](https://bun.sh/)
-   A [Cloudflare account](https://dash.cloudflare.com/sign-up)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/stellarframe.git
    cd stellarframe
    ```

2.  **Install dependencies:**
    ```sh
    bun install
    ```

3.  **Set up environment variables:**

    Create a `.dev.vars` file in the root of the project for local development. You can copy the example:
    ```sh
    cp .dev.vars.example .dev.vars
    ```

    Open `.dev.vars` and add your Cloudflare AI Gateway credentials. You can find these in your Cloudflare Dashboard.

    ```ini
    # .dev.vars
    CF_AI_BASE_URL="https://gateway.ai.cloudflare.com/v1/YOUR_ACCOUNT_ID/YOUR_GATEWAY_ID/openai"
    CF_AI_API_KEY="YOUR_CLOUDFLARE_API_KEY"
    ```

## 💻 Development

To start the local development server, which includes both the Vite frontend and the Cloudflare Worker backend, run:

```sh
bun run dev
```

The application will be available at `http://localhost:3000`. The frontend will automatically reload when you make changes to the source files.

## ☁️ Deployment

This project is designed for easy deployment to Cloudflare Pages.

1.  **Login to Wrangler:**
    If you haven't already, authenticate with your Cloudflare account:
    ```sh
    bunx wrangler login
    ```

2.  **Deploy the application:**
    Run the deploy script, which will build the application and deploy it to your Cloudflare account.
    ```sh
    bun run deploy
    ```
    Wrangler will guide you through the initial deployment process.

3.  **Configure Production Secrets:**
    For the deployed application to function correctly, you must set the production environment variables in your Cloudflare dashboard.

    -   Navigate to your project's settings in the Cloudflare dashboard.
    -   Go to **Settings** > **Environment variables**.
    -   Add the following secrets:
        -   `CF_AI_BASE_URL`: Your Cloudflare AI Gateway URL.
        -   `CF_AI_API_KEY`: Your Cloudflare API Key.

Alternatively, you can deploy directly from your GitHub repository with a single click.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/rhino88/generated-app-20251020-150150)

## 📂 Project Structure

The project is organized into two main parts: the frontend application and the backend worker.

-   `src/`: Contains the React frontend application code.
    -   `components/`: Shared UI components.
    -   `pages/`: Top-level page components for each route.
    -   `store/`: Zustand stores for global state management.
    -   `lib/`: Utility functions and libraries.
-   `worker/`: Contains the Cloudflare Worker backend code.
    -   `index.ts`: The entry point for the worker.
    -   `userRoutes.ts`: Hono route definitions for the application's API.
    -   `agent.ts`: The core logic for the Chat Agent Durable Object.

## 🤝 Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.