# Image Search & Editor Web App

A web application that enables users to search for images via the Pixabay API, add custom captions and shapes using fabric.js, and download the modified images. Built with Next.js for a modern and fast frontend experience.

---

## 📚 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Bonus Features](#bonus-features)
- [Known Issues](#known-issues)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

- **Image Search**: Fetch images from Pixabay based on user queries and display them in a responsive grid.
- **Canvas Editing**: Load images onto a fabric.js canvas to:
  - Add editable, resizable text layers.
  - Add shapes (Triangle, Circle, Rectangle, Polygon) that can be dragged, resized, and repositioned.
  - Maintain layering: image (bottom), shapes (middle), text (top).
- **Download**: Save the modified image with captions and shapes as a downloadable file.
- **Error Handling**: Handle API errors, canvas issues, and validate inputs with clear user feedback.
- **Debugging**: Log canvas layers and attributes (image, shapes, text) in an array format for transparency.

---

## 🧰 Tech Stack

- **Frontend**: Next.js, tailwindcss
- **Canvas**: fabric.js
- **API**: Pixabay API
- **Deployment**: Vercel
- **Version Control**: GitHub

---

## ✅ Prerequisites

- Node.js (v16 or higher)
- npm
- Pixabay API key (get one for free at [Pixabay](https://pixabay.com/api/docs/))

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/kushc225/img-editor
cd img-editor
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up Environment Variables


Create a `.env` file in the root directory:

```env
NEXT_PUBLIC_API_KEY=your_pixabay_api_key
```

- `NEXT_PUBLIC_API_KEY`: Your Pixabay API key (free to obtain from [Pixabay](https://pixabay.com/api/docs/))

### 4. Start the Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

## 📖 Usage

### 🔍 Search for Images

- Enter a query in the search bar (e.g., "sunset", "mountains").
- View fetched images in a responsive grid.
- Click the **"Add Captions"** button on any image to edit it.

### 🖌️ Edit Images

- Add text layers and shapes (Triangle, Circle, Rectangle, Polygon).
- Resize, drag, and reposition all elements freely.
- Text layers are fully editable.

### 💾 Download

- Click the **"Download"** button to export the final canvas image.

### 🐛 Debugging

- Open your browser console to view a list of all canvas layers and their properties (image, shape, text).

---

## 🚢 Deployment

This app is deployed using [Vercel](https://vercel.com).

### ✅ Live Version

- **Live URL**: [https://demo-img-editor.vercel.app/]
- **GitHub Repository**: [https://github.com/kushc225/img-editor]

### 📤 Deploy Your Own

1. Push your code to a GitHub repository.
2. Connect the repo to Vercel via the [Vercel dashboard](https://vercel.com/dashboard).
3. Add your `NEXT_PUBLIC_API_KEY` in the Vercel environment settings.
4. Deploy instantly.

> 💡 **Note:** CodeSandbox was tested but had issues with the download button. **Vercel is the recommended platform** for deployment.

---

## 📁 Project Structure

```bash
├── src
│   ├── components          # Reusable UI components
│   ├── app                 # Next.js page components
│   ├── public              # Static assets
│   ├── styles              # Global and component-specific styles
│   ├── utils               # Helper functions and utilities
│   ├── .env          # Environment variables (not committed)
│   └── README.md           # Project documentation

```


## 🐞 Known Issues

- Download button may not work in some online IDEs like CodeSandbox.

---

