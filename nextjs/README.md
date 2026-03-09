# nquiz — Next.js conversion

This folder contains a minimal Next.js conversion of the provided `index.html` UI.

What I added
- `pages/index.js` — subject-based home screen (Maths + Gen AI)
- `pages/api/agent.js` — API endpoint that reads `.agent/mcp_config.json` and returns its JSON
- `data/maths.js` and `data/genai.js` — compact DPP data used to populate the UI
- `components/*` — small presentational components
- `public/s/` — place UI images here (the original `s/` folder can be copied here)

Run locally
1. cd nextjs
2. npm install
3. npm run dev

Notes
- This is a minimal scaffold. Math rendering is powered by MathJax CDN as in the original page.
- The API route expects `.agent/mcp_config.json` to exist in the repo root and will return it.
- I converted a subset of the DPP content into `data/maths.js`. We can import the full `allDPPs` structure later and split by subject.
