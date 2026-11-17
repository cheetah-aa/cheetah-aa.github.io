# cheetahh1 ✦ portfolio

A sparkly pink, DevSecOps‑flavoured portfolio. Pure HTML, CSS and vanilla JS — no build step.

## Run locally

Just open `index.html` in a browser, or serve the folder:

```bash
npx serve .
# or
python -m http.server 8080
```

## Personalise

- **Name / email / LinkedIn** → edit the `CONFIG` block at the top of `js/main.js`.
- **Terminal lines** → same `CONFIG` block (`terminalLines`).
- **Projects** → each is one `<article class="card">` in `index.html`. Copy one to add a new project.
- **Roadmap percentages** → the `--w` values in the Roadmap section of `index.html`.
- **Colours** → the `html[data-theme="barbie"]` and `html[data-theme="hacker"]` blocks in `css/style.css`.

Press `t` anywhere on the page to flip between Barbie mode and Hacker mode. The choice is remembered.

## Deploy

**GitHub Pages**

1. Create a repo named `cheetahh1.github.io` and push this folder's contents to `main`.
2. Settings → Pages → Source: *Deploy from a branch* → `main` / root.
3. Visit `https://cheetahh1.github.io`.

**Vercel**

```bash
npx vercel
```

Accept the defaults — it is a static site, no framework preset needed.
