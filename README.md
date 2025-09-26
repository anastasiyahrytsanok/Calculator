 # Custom Calculator
A vanilla-JS calculator app bundled to 2 files (HTML + JS) with Webpack 5.
Implements Command pattern, theming, memory operations, and full unit tests with Jest.

 ## 1) Task
   https://drive.google.com/file/d/15jVnBPXaZrjs99KOUxp4TGq6Inau6xq_/view

 ## 2) Requirements
   - Node.js ≥ 18, npm ≥ 9
   - Modern browser (for running the built app)
   - Optional: Git (for Husky hooks)

 ## 3) How to run the app
   ### install deps
   npm install

   ### start dev server (Webpack Dev Server, opens in browser)
   npm start

   ### production build -> dist/
   npm run build

   ### run unit tests (Jest)
   npm test

   ### lint & format
   npm run lint
   npm run format

 ## 4) Folder structure (short)
 <pre>
   .
   ├─ src/
   │  ├─ controller/
   │  │  ├─ commands/            # One file per command/action (Digit, Dot, Equals, Percent, Square, Cube, Radical, etc.)
   │  │  └─ main.js              # Controller entry: binds UI events, dispatches commands
   │  ├─ model/
   │  │  ├─ calculator.js        # Core calculator state & business logic
   │  │  ├─ commandExecutor.js   # Command dispatcher for model operations
   │  │  └─ renderer.js          # Rendering helpers for the display
   │  ├─ styles/
   │  │  └─ main.css             # App styles
   │  ├─ __tests__/              # Jest tests (unit & DOM tests)
   │  │  ├─ calculator.test.js
   │  │  └─ utils.test.js
   │  ├─ constants.js            # Constants (operators, symbols, limits, error strings, etc.)
   │  ├─ utils.js                # Small pure helpers (compute, toSymbol, normalizeResult, isEven, etc.)
   │  ├─ index.js                # App bootstrap (imports CSS, mounts controller)
   │  └─ index.html              # App HTML (Webpack HtmlPlugin template)
   ├─ .husky/                    # Git hooks (pre-commit, pre-push) running lint-staged
   ├─ package.json               # Scripts & devDependencies (webpack, jest, eslint, prettier, husky)
   └─ webpack config files       # Webpack/DevServer setup (if present)
   
