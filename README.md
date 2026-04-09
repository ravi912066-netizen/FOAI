# Public API Playground 🚀

A modern, responsive, and interactive single-page website that integrates 4 fun public APIs. Built using Vanilla JavaScript and Tailwind CSS.

## 🌟 Features

1.  **🐶 Dog Finder**: 
    - Fetches random dog images from the Dog CEO API.
    - Automatically parses breed names from the API URL (e.g., `hound-afghan` → `Afghan Hound`).
    - One-click copy for the image URL.
2.  **😂 Joke Generator**:
    - Fetches random setup-and-punchline jokes.
    - Smooth entry animations for the punchline.
3.  **👤 Random User Profile**:
    - Fetches realistic user profiles from the RandomUser.me API.
    - Displays avatar, name, email, country, age, and phone number in a clean card layout.
4.  **🚀 JSON Explorer**:
    - Interactive exploration of JSONPlaceholder data.
    - Switches between Posts, Comments, Albums, and Photos.
    - Dynamic list rendering with loading states.
5.  **🔄 Sync Everything**:
    - A "Refresh All" button to update all sections simultaneously.
    - Individual refresh buttons for each section.

## 🛠️ Built With

- **HTML5**: Semantic structure.
- **Tailwind CSS**: Modern styling via CDN.
- **JavaScript (ES6+)**: 
  - `fetch()` with `async/await` for API calls.
  - Dynamic DOM manipulation.
  - Custom loading states and error handling.

## 🚀 How to Run Locally

### Option 1: Live Server (Recommended)
1. Open this project folder in **VS Code**.
2. Install the **Live Server** extension.
3. Right-click on `index.html` and select **Open with Live Server**.

### Option 2: Direct Open
1. Locate `index.html` in your file explorer.
2. Double-click to open it in any modern web browser.

## 🌐 How to Deploy

### Netlify (Drag & Drop)
1. Go to [Netlify Drop](https://app.netlify.com/drop).
2. Drag and drop the folder containing `index.html` into the box.
3. Your site is live!

### Vercel (CLI)
1. Install Vercel CLI: `npm i -g vercel`.
2. Run `vercel` in the project directory.
3. Follow the prompts to deploy.

---
*Created for learning and exploration of Web APIs.*
