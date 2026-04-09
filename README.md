# 🌟 Public API Playground (Pro Version)

An improved, more reliable, and visually stunning single-page website that integrates 4 robust public APIs. Built with Vanilla JavaScript and Tailwind CSS.

## 🚀 What's New?

1.  **🐶 Dog Finder (Powered by random.dog)**: 
    - Handles mixed media (Images, GIFs, and Videos).
    - Smart filtering to prioritize visual content.
    - Improved breed parsing logic from filenames (e.g., `golden-retriever.jpg` → `Golden Retriever`).
2.  **😂 Joke Lab (Powered by JokeAPI v2)**:
    - Highly reliable backend.
    - Supports both single-part and two-part jokes.
    - Includes category badges (Programming, Pun, Spooky, etc.).
    - Comedic timing delay for the punchline.
3.  **👤 Persona Hub (RandomUser.me)**:
    - Entirely redesigned card layout.
    - Added gender icons and copy-email shortcut.
    - Smooth rotation hover effects.
4.  **🛰️ JSON Nexus (JSONPlaceholder)**:
    - Single-item exploration for a cleaner, focused view.
    - Random ID selection for better variety.
5.  **⚡ Performance & UI**:
    - **Parallel Fetching**: All cards update at once using `Promise.allSettled`.
    - **Outlast Layout**: Modern typography and vibrant gradients.
    - **Mobile Ready**: Fully responsive grid.

## 🛠️ Tech Stack

- **HTML5**: Semi-semantic structure.
- **Tailwind CSS**: Utility-first styling with custom glassmorphism.
- **JavaScript (ES6+)**: 
  - `fetch()` + `async/await`.
  - Advanced media handling (loop-check for Dog API).
  - CSS animations (fade-in, zoom-in, lift).

## 🚀 How to Run Locally

### Option 1: Live Server (Recommended)
1. Open this folder in **VS Code**.
2. Start the **Live Server** extension on `index.html`.

### Option 2: Direct
- Simply double-click `index.html` to view in any modern browser.

## 🌐 How to Deploy

### Netlify
- Drag and drop the project folder to [Netlify Drop](https://app.netlify.com/drop).

### Vercel
- Use the Vercel CLI (`vercel`) or connect your GitHub repo to the Vercel dashboard.

---
*Built with ❤️ and Vanilla JS*
