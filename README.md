# Portfolio

Personal portfolio site for **Brikend Gjyliqi** — full-stack developer (Vue, Spring Boot, Java, SQL). A static HTML/CSS/JS site with dedicated case study pages for selected projects.

**Live structure:**
- [`index.html`](index.html) — home page: stack, selected work, background, contact
- [`kendi-pos.html`](kendi-pos.html) — Kendi POS, a point-of-sale system for Kosovo cafes and restaurants
- [`lumiere.html`](lumiere.html) — LUMIÈRE, a full-stack optical store platform (customer shop, admin panel, POS, AI reporting assistant)
- [`coinpulse.html`](coinpulse.html) — CoinPulse, a crypto price and portfolio tracker
- [`forex-pulse.html`](forex-pulse.html) — ForexPulse, a journaling dashboard for retail forex traders

**Stack:** plain HTML, [`style.css`](style.css) + [`case-study.css`](case-study.css), [`script.js`](script.js) (no build step, no dependencies).

## Running locally

No build tooling required — open [`index.html`](index.html) directly in a browser, or serve the folder statically:

```
npx serve .
```

## Structure

```
index.html            home page
*.html                case study pages
style.css              global styles
case-study.css         shared case study page styles
script.js               shared interactivity (nav, sliders, etc.)
img/                    screenshots and assets, one subfolder per project
```
