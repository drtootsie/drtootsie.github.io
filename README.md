# Dr. Tootsie's Personal Website

This is the source code for my personal website, built with React and Vite. It is hosted on GitHub Pages at [pepperpancoast.com](https://www.pepperpancoast.com).

## 🚀 Tech Stack

- **Framework:** [React](https://reactjs.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Bootstrap](https://getbootstrap.com/) & [React-Bootstrap](https://react-bootstrap.github.io/)
- **Routing:** [React Router](https://reactrouter.com/)

## 🛠️ Local Development

To run the site locally for development:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/drtootsie/drtootsie.github.io.git
   cd drtootsie.github.io
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The site will be available at `http://localhost:5173`.

## 📦 Deployment Workflow

This project uses an automated deployment workflow via GitHub Actions.

1. **Branching Strategy:**
   - `develop`: The main development branch. **Always make your changes here.**
   - `gh-pages`: The live website branch. This is automatically managed by GitHub Actions; **do not edit it directly.**

2. **How to Deploy:**
   Simply push your changes to the `develop` branch:
   ```bash
   git add .
   git commit -m "Your descriptive commit message"
   git push origin develop
   ```
   GitHub Actions will automatically build the React app and deploy the static files to the `gh-pages` branch.

## 📁 Project Structure

- `src/`: Contains the React source code.
  - `components/`: Reusable UI components.
  - `pages/`: Individual page components (Home, About, Blog, etc.).
  - `data/`: JSON files containing site content (posts, resume).
- `public/`: Static assets like images and the CNAME file.
- `assets/`: Global assets and images.