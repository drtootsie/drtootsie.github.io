# Project Status & Workflow

This document summarizes the current state of the `drtootsie.github.io` website project and outlines the development workflow.

## 1. Project Overview

The original Jekyll-based website has been successfully rebuilt as a modern single-page application using the following technologies:

- **Framework:** React
- **Build Tool:** Vite
- **Styling:** Bootstrap & React-Bootstrap
- **Deployment:** Automated via GitHub Actions

## 2. Current Status

- **Website is Live:** The new React site has been successfully built and deployed to GitHub Pages.
- **Automated Deployments:** A GitHub Actions workflow is in place. This workflow automatically builds and deploys the site whenever new changes are pushed to the `develop` branch.
- **Custom Domain:**
    - The primary domain **`www.pepperpancoast.com`** is configured and shows as **valid** in your GitHub Pages settings.
    - The root domain (`pepperpancoast.com`) is set up on GoDaddy to **forward** to the `www` version.
    - **Note:** The error message `NotServedByPagesError` for the root domain is expected and can be ignored. It appears because we are using GoDaddy's forwarding feature instead of pointing `A` records to GitHub, which is a more flexible approach.
- **DNS Propagation:** DNS changes and SSL certificate generation can take time to propagate fully across the internet. It may take anywhere from a few minutes to 24 hours.

## 3. Your Development Workflow

From now on, the process for updating your site is very simple:

1.  Make any desired code changes in your local repository (which should be on the `develop` branch).
2.  Commit your changes.
3.  Push your changes to the `develop` branch on GitHub:
    ```bash
    git push origin develop
    ```

That's it. The GitHub Action will automatically handle the rest: building your site and deploying it.

## 4. Branch Roles

- **`develop`**: This is your **main source code branch**. It's the only branch you need to work on.
- **`gh-pages`**: This is your **live website branch**. The GitHub Action automatically overwrites this branch with the built HTML, CSS, and JS files. **Do not edit this branch directly.**
- **`master`**: This branch holds the previous history of the project. It is **not used** in the new automated workflow.

## 5. Next Steps

- **Wait for Propagation:** Allow some time for the DNS and SSL certificate to become active. You should be able to access `https://www.pepperpancoast.com` soon.
- **Enforce HTTPS:** Once you've confirmed the site is working on your custom domain, go to your repository's **Settings > Pages** and ensure the **"Enforce HTTPS"** checkbox is enabled.
