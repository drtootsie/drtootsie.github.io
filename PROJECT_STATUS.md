# Project Status & Workflow

This document summarizes the current state of the `drtootsie.github.io` website project and outlines the development workflow.

## 1. Project Overview

The website is a modern single-page application built using:

- **Framework:** React
- **Build Tool:** Vite
- **Styling:** Bootstrap & React-Bootstrap
- **Data:** Dynamic JSON-based architecture for resume, projects, and track stats.
- **Deployment:** Automated via GitHub Actions.

## 2. Current Status (May 2026 Refresh)

- **Website is Live:** Successfully deployed at **`www.pepperpancoast.com`**.
- **Automated Deployments:** A GitHub Actions workflow (`deploy.yml`) builds and deploys the site whenever changes are pushed to the `develop` branch.
- **Dynamic Track Stats Scraper:** 
    - A Python-based scraping engine (`sync_track_stats.py`) is now functional.
    - It targets Moses Brown School (ID 14717) and extracts real-time results from MileSplit.
    - Automated daily sync runs at 3:00 AM UTC via `sync_stats.yml`.
- **Custom Domain:** Configured and secured with HTTPS via GitHub Pages.

## 3. Your Development Workflow

1.  **Code Changes:** Work locally on the `develop` branch.
2.  **Stat Sync:** Run `python3 sync_track_stats.py` locally to verify scraping logic if needed.
3.  **Deploy:** Push changes to GitHub:
    ```bash
    git add .
    git commit -m "Your descriptive message"
    git push origin develop
    ```

## 4. Branch Roles

- **`develop`**: Main source code branch. **Only push here.**
- **`gh-pages`**: Production build branch. Managed automatically by GitHub Actions. **Do not edit.**
- **`master`**: Legacy history. Not used in the current workflow.

## 5. Active Initiatives

- **Championship Season Tracking:** Real-time monitoring of 2026 Outdoor Track results (Central Divisions, Class C, and upcoming States).
- **Coach Collaboration:** Integrating analytics and highlights in collaboration with Coach Matty Bennett.
