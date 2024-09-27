# FikIT-frontend
## The frontend for FikIT, the swedish fika society at Chalmers, official website

![Github version](https://img.shields.io/badge/version-0.1.0-darkblue?style=flat-square)
![GitHub repo size](https://img.shields.io/github/repo-size/erikpersson0884/fikit-frontend?color=blue&style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/erikpersson0884/fikit-frontend?color=darkgreen&style=flat-square) 
<a style="text-decoration: none !important; display:inline;" href="https://github.com/erikpersson0884">![Github author](https://img.shields.io/badge/Author-erikpersson0884-darkred?style=flat-square)</a>



## Development setup

1. Copy `.env.example` to `.env` and fill in with relevant information
2. Copy `.env.development.example` to `.env.development` and fill in with relevant information (default should be fine for dev)
3. Run `npm install`
4. Run `npm run dev` and open the URL printed in the terminal (typically `http://localhost:3000`)

## Deploying

### gh-pages

The project uses gh-pages for deployment. gh-pages is a utility that helps you easily deploy a project to GitHub Pages from the command line. It simplifies the process of deploying static websites (like React, Vue, Angular apps, or other static assets) by automating the process of pushing your build files to the correct branch (gh-pages or a specified branch) on GitHub.

### Steps for setting up the project

1. Make sure the `.env` exists in root directory and has all relevant information
2. run `npm run gh` to both build and deploy the project
