# Shopping Hub
An online shopping website designed with usability, simplicity, and accessibility in mind. Shopping Hub aims to make online shopping more intuitive, transparent, and trustworthy for users of all ages and technical abilities, including older adults who might otherwise feel excluded from using such technology.

The application focuses on reducing unnecessary complexity, simplifying product browsing and comparison, and helping users make informed purchasing decisions with confidence.

## Requirements
### Before getting started, install:
- Node.js: Version 24 LTS recommended (download from nodejs.org)
- npm: Included with Node.js
- Git: For cloning the repository and managing branches

### Verify your installation in terminal:
```bash
node --version
```
```bash
npm --version
```

### Important:
Older Node.js versions may cause dependency installation or Vite startup errors. 

If you have multiple Node.js installations, make sure your terminal is using a supported version.

## Getting Started
### 1. Clone the repository
```bash
git clone https://github.com/anccaz/DP4.git
```
```bash
cd DP4
```
### 2. Install dependencies
```bash
npm install
```
### 3. Start the development server
```bash
npm run dev
```
If the two previous commands are successful, you should be given a local URL displayed in the terminal which you can open to view the site.

## Project Structure
### Folder Guidelines
- components/
  - Reusable interface elements, such as the header and product cards
- pages/
  - Individual screens, such as Product Browsing, Comparison, Orders, etc.
- data/
  - Shared data that multiple features use, such as the product catalog
- styles/
  - Shared styles to maintain a consistent appearance
- App.jsx
  - Coordinates navigation and shared application state

## Git Workflow
Each team member has their own development branch.
1. Switch to your branch before making changes.
2. Bring in the latest changes from main when needed.
3. Make and test your changes locally.
4. Commit your completed work.
5. Push your branch to GitHub.
6. Open a pull request when your changes are ready to merge into main.

*Avoid commiting directly to main without coordinating with the team.*

## Notes
- The current application uses sample product and order data for demonstration purposes.