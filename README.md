# Nexus AI - Chat & Create
url web: https://activity-3-df3t5hpxv-ravi-yadavs-projects-053d40f7.vercel.app/
Nexus AI is a modern, professional-level AI web application built with Next.js 15, TypeScript, and Tailwind CSS. It provides a unified workspace for both interactive conversations and high-quality image generation.

## 🚀 Features

- **Chatbot Tab**: Intelligent conversations powered by OpenRouter (Meta Llama 3.3).
- **Image Generator Tab**: High-speed image creation using Hugging Face (Black Forest Labs FLUX.1).
- **Settings Modal**: Securely manage your API keys, stored locally in your browser.
- **Premium UI**: Dark mode by default, glassmorphism accents, and smooth animations using Framer Motion.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop screens.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

## 🏁 Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository or download the files.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Configuring API Keys

To use the AI features, you need to add your API keys in the app's settings (gear icon in the header):

- **OpenRouter API Key**: Get it from [openrouter.ai](https://openrouter.ai/keys).
- **Hugging Face Token**: Get it from [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens).

*Note: Your keys are stored locally in your browser (`localStorage`) and are never sent to our servers.*

## 🚢 Deployment

### Vercel / Netlify

This project is ready for one-click deployment:

1. Push your code to a GitHub repository.
2. Connect your repository to [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/).
3. The platform will automatically detect Next.js and deploy the application.

## 📜 License

Built with ❤️ using Next.js + Antigravity.
