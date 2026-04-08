import { mkdir, writeFile, copyFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { site } from '../src/site-data.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const pageOrder = ['home', 'about', 'projects', 'blog', 'media'];

const iconPaths = {
  arrow: '<path d="M5 12h14"/><path d="m13 5 7 7-7 7"/>',
  linkedin:
    '<path d="M6.75 8.25a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3ZM5.5 10h2.5v8H5.5zm5 0H13v1.25h.04c.35-.67 1.21-1.38 2.5-1.38 2.68 0 3.18 1.76 3.18 4.04V18H16.2v-3.55c0-.84-.02-1.93-1.18-1.93-1.18 0-1.36.92-1.36 1.87V18h-2.5Z"/>',
  github:
    '<path d="M12 2.75a9.25 9.25 0 0 0-2.92 18.03c.46.08.63-.2.63-.45 0-.22-.01-.96-.01-1.74-2.31.42-2.91-.56-3.1-1.07-.1-.26-.53-1.07-.9-1.29-.31-.17-.74-.59-.01-.6.69-.01 1.18.63 1.35.9.79 1.32 2.04.95 2.54.72.08-.57.31-.95.56-1.17-2.05-.23-4.2-1.03-4.2-4.55 0-1 .36-1.82.95-2.46-.1-.23-.42-1.18.09-2.46 0 0 .78-.25 2.55.94a8.59 8.59 0 0 1 4.65 0c1.77-1.2 2.55-.94 2.55-.94.51 1.28.19 2.23.09 2.46.59.64.95 1.45.95 2.46 0 3.53-2.16 4.32-4.21 4.55.33.28.61.82.61 1.67 0 1.2-.01 2.16-.01 2.46 0 .25.17.54.63.45A9.25 9.25 0 0 0 12 2.75Z"/>',
  substack:
    '<path d="M4.5 5.5h15v2.25h-15Z"/><path d="M4.5 9.25h15v2.25h-15Z"/><path d="M6 12.75h12v6.75H6Z"/><path d="M4.5 19.5h1.5v-6.75h12V19.5h1.5V14.25H4.5Z"/>'
};

function icon(name) {
  const pathMarkup = iconPaths[name] || iconPaths.arrow;
  return `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${pathMarkup}</svg>`;
}

function absoluteUrl(relativePath) {
  const normalized = relativePath.startsWith('/') ? relativePath : `/${relativePath}`;
  return new URL(normalized, site.url).toString();
}

function publicHref(pageKey, lang) {
  const page = site.pages[pageKey];
  if (pageKey === 'home') {
    return lang === 'es' ? '/' : '/en/';
  }

  return page.paths[lang];
}

function outputFileFor(pageKey, lang) {
  const target = site.pages[pageKey].paths[lang];
  const relative = target === '/' ? '/index.html' : target;
  return path.join(rootDir, relative.replace(/^\//, ''));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function pageMeta(pageKey, lang) {
  const page = site.pages[pageKey];

  return {
    title: page.title[lang],
    description: page.description[lang],
    canonical: absoluteUrl(page.canonical[lang]),
    locale: site.locale[lang]
  };
}

function personSchema(lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.person.fullName,
    alternateName: site.person.legalName,
    url: site.url,
    image: absoluteUrl(site.person.image),
    jobTitle: site.person.role[lang],
    description: site.person.statement[lang],
    worksFor: {
      '@type': 'Organization',
      name: 'Candel Medical',
      url: site.links.candel
    },
    sameAs: [site.links.linkedin, site.links.substack, site.links.candel]
  };
}

function renderHeader(pageKey, lang) {
  const alternateLang = lang === 'es' ? 'en' : 'es';

  return `
    <header class="site-header">
      <div class="site-header__inner">
        <a class="site-brand" href="${publicHref('home', lang)}">${escapeHtml(site.person.fullName)}</a>
        <a class="language-switch" href="${publicHref(pageKey, alternateLang)}" lang="${alternateLang}" hreflang="${alternateLang}">
          <span>${alternateLang.toUpperCase()}</span>
        </a>
      </div>
    </header>
  `;
}

function renderFooter() {
  return `
    <footer class="site-footer">
      <p>&copy; ${new Date().getFullYear()} ${escapeHtml(site.person.fullName)}</p>
    </footer>
  `;
}

function renderHome(lang) {
  const page = site.pages.home;
  const contributionChart = `https://ghchart.rshah.org/0e7a73/MuenaWWW`;

  const signals = page.validation.items
    .map(
      (item) => `
        <li class="signal">
          <strong>${escapeHtml(item.label)}</strong>
          <span>${escapeHtml(item.note[lang])}</span>
        </li>
      `
    )
    .join('');

  const highlights = page.highlights.items[lang]
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join('');

  const heroBadges = page.hero.badges[lang]
    .map((item) => `<li class="hero-badge">${escapeHtml(item)}</li>`)
    .join('');

  const proof = page.proof.items[lang]
    .map(
      (item) => `
        <article class="proof-card">
          <h2 class="proof-card__title">${escapeHtml(item.title)}</h2>
          <p class="proof-card__body">${escapeHtml(item.body)}</p>
        </article>
      `
    )
    .join('');

  const presence = `
    <div class="presence-grid">
      <div class="presence-card">
        <a class="portrait-link" href="${site.links.linkedin}" target="_blank" rel="noopener noreferrer">
          <img class="portrait-image" src="${site.person.image}" alt="${lang === 'es' ? 'Retrato profesional de Sebastián Muena' : 'Professional portrait of Sebastián Muena'}" width="1200" height="1500" loading="lazy" />
        </a>
        <div class="presence-copy">
          <h2 class="presence-title">${escapeHtml(page.presence.title[lang])}</h2>
          <p class="presence-summary">${escapeHtml(page.presence.summary[lang])}</p>
          <div class="linkedin-card">
            <p class="linkedin-card__label">${escapeHtml(page.presence.linkedin.label[lang])}</p>
            <p class="linkedin-card__headline">${escapeHtml(page.presence.linkedin.headline[lang])}</p>
            <a class="button-link" href="${site.links.linkedin}" target="_blank" rel="noopener noreferrer">${escapeHtml(page.presence.linkedin.cta[lang])}</a>
          </div>
        </div>
      </div>
      <a class="github-card" href="${site.links.github}" target="_blank" rel="noopener noreferrer">
        <div class="github-card__header">
          <div>
            <p class="band__label">${escapeHtml(page.presence.github.label[lang])}</p>
            <h2 class="github-card__title">${escapeHtml(page.presence.github.title[lang])}</h2>
          </div>
          ${icon('github')}
        </div>
        <p class="github-card__body">${escapeHtml(page.presence.github.body[lang])}</p>
        <img class="github-card__chart" src="${contributionChart}" alt="${escapeHtml(page.presence.github.chartAlt[lang])}" loading="lazy" />
      </a>
    </div>
  `;

  const links = page.linksSection.items
    .map(
      (item) => `
        <a class="link-card" href="${item.href}" target="_blank" rel="noopener noreferrer">
          <span>${icon(item.key)}</span>
          <strong>${escapeHtml(item.label)}</strong>
          <span>${icon('arrow')}</span>
        </a>
      `
    )
    .join('');

  return `
    <main id="main" class="page page--home">
      <section class="hero">
        <p class="hero__kicker">${escapeHtml(page.hero.kicker[lang])}</p>
        <h1>${escapeHtml(site.person.fullName)}</h1>
        <p class="hero__statement">${escapeHtml(site.person.statement[lang])}</p>
        <ul class="hero-badge-list" aria-label="${lang === 'es' ? 'Foco actual' : 'Current focus'}">
          ${heroBadges}
        </ul>
      </section>

      <section class="band" aria-labelledby="validation-title">
        <div class="band__header">
          <p class="band__label">${escapeHtml(page.validation.heading[lang])}</p>
        </div>
        <ul class="signal-list" id="validation-title">
          ${signals}
        </ul>
        <div class="proof-grid">
          ${proof}
        </div>
      </section>

      <section class="band" aria-labelledby="highlights-title">
        <div class="band__header">
          <p class="band__label">${escapeHtml(page.highlights.heading[lang])}</p>
        </div>
        <ul class="highlight-list" id="highlights-title">
          ${highlights}
        </ul>
      </section>

      <section class="band" aria-labelledby="presence-title">
        <div class="band__header">
          <p class="band__label" id="presence-title">${escapeHtml(page.presence.heading[lang])}</p>
        </div>
        ${presence}
      </section>

      <section class="band" aria-labelledby="links-title">
        <div class="band__header">
          <p class="band__label">${escapeHtml(page.linksSection.heading[lang])}</p>
        </div>
        <div class="link-list" id="links-title">
          ${links}
        </div>
      </section>
    </main>
  `;
}

function renderLegacy(pageKey, lang) {
  const page = site.pages[pageKey];
  const href = page.redirect.href[lang];

  return `
    <main id="main" class="page page--legacy">
      <section class="legacy">
        <p class="legacy__label">${escapeHtml(site.person.fullName)}</p>
        <h1>${escapeHtml(page.redirect.body[lang])}</h1>
        <div class="legacy__actions">
          <a class="button-link" href="${href}"${href.startsWith('http') ? ' target="_blank" rel="noopener noreferrer"' : ''}>
            ${escapeHtml(page.redirect.label[lang])}
          </a>
          <a class="button-link button-link--quiet" href="${publicHref('home', lang)}">
            ${lang === 'es' ? 'Inicio' : 'Home'}
          </a>
        </div>
      </section>
    </main>
  `;
}

function render404(lang = 'es') {
  return `
    <main id="main" class="page page--legacy">
      <section class="legacy">
        <p class="legacy__label">404</p>
        <h1>${lang === 'es' ? 'Esta ruta no existe.' : 'This route does not exist.'}</h1>
        <div class="legacy__actions">
          <a class="button-link" href="${publicHref('home', lang)}">${lang === 'es' ? 'Volver al inicio' : 'Back to home'}</a>
        </div>
      </section>
    </main>
  `;
}

function renderLayout(pageKey, lang, bodyMarkup, overrides = {}) {
  const baseMeta = pageMeta(pageKey, lang);
  const meta = { ...baseMeta, ...overrides };
  const noindex = overrides.noindex === true;
  const refreshHref = overrides.refreshHref;
  const showAlternates = overrides.showAlternates !== false;

  return `<!doctype html>
<html lang="${lang}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(meta.title)}</title>
    <meta name="description" content="${escapeHtml(meta.description)}" />
    <meta name="theme-color" content="#111111" />
    <link rel="canonical" href="${meta.canonical}" />
    ${noindex ? '<meta name="robots" content="noindex, nofollow" />' : ''}
    ${refreshHref ? `<meta http-equiv="refresh" content="0; url=${escapeHtml(refreshHref)}" />` : ''}
    ${showAlternates ? `<link rel="alternate" hreflang="es" href="${absoluteUrl(site.pages.home.canonical.es)}" />
    <link rel="alternate" hreflang="en" href="${absoluteUrl(site.pages.home.canonical.en)}" />
    <link rel="alternate" hreflang="x-default" href="${absoluteUrl(site.pages.home.canonical.es)}" />` : ''}
    <meta property="og:site_name" content="${escapeHtml(site.siteName)}" />
    <meta property="og:title" content="${escapeHtml(meta.title)}" />
    <meta property="og:description" content="${escapeHtml(meta.description)}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${meta.canonical}" />
    <meta property="og:image" content="${absoluteUrl(site.person.ogImage)}" />
    <meta property="og:locale" content="${meta.locale}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(meta.title)}" />
    <meta name="twitter:description" content="${escapeHtml(meta.description)}" />
    <meta name="twitter:image" content="${absoluteUrl(site.person.ogImage)}" />
    <link rel="icon" href="/images/favicon.svg" type="image/svg+xml" />
    <link rel="stylesheet" href="/assets/css/main.css" />
    <script type="application/ld+json">${JSON.stringify(personSchema(lang))}</script>
  </head>
  <body>
    <a class="skip-link" href="#main">${lang === 'es' ? 'Saltar al contenido' : 'Skip to content'}</a>
    <div class="site-shell">
      ${renderHeader(pageKey, lang)}
      ${bodyMarkup}
      ${renderFooter()}
    </div>
  </body>
</html>`;
}

function renderPage(pageKey, lang) {
  if (pageKey === 'home') {
    return renderLayout(pageKey, lang, renderHome(lang));
  }

  const redirectHref = site.pages[pageKey].redirect.href[lang];
  return renderLayout(pageKey, lang, renderLegacy(pageKey, lang), {
    canonical: absoluteUrl(site.pages.home.canonical[lang]),
    noindex: true,
    refreshHref: redirectHref,
    showAlternates: false
  });
}

function renderSitemap() {
  const urls = ['es', 'en'].map((lang) => absoluteUrl(site.pages.home.canonical[lang]));
  const entries = urls.map((url) => `  <url>\n    <loc>${escapeHtml(url)}</loc>\n  </url>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;
}

function renderRobots() {
  return `User-agent: *\nAllow: /\n\nSitemap: ${absoluteUrl('/sitemap.xml')}\n`;
}

function renderFaviconSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="SM"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0e7a73"/><stop offset="100%" stop-color="#12363a"/></linearGradient></defs><rect width="64" height="64" rx="20" fill="url(#g)"/><path d="M18 20h11c7.2 0 11 3.3 11 8.9 0 4.1-2.4 7.1-6.5 8l7.1 7.1H34l-5.9-6.4H24V44h-6V20Zm6 5v8.3h4.5c3.7 0 5.6-1.4 5.6-4.2 0-2.7-1.9-4.1-5.6-4.1H24Z" fill="#fff"/><path d="M42.3 20H48v24h-5.7z" fill="#d5efe9"/></svg>`;
}

function renderOgSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-label="Sebastián Muena"><defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#12363a"/><stop offset="100%" stop-color="#0e7a73"/></linearGradient><radialGradient id="glow" cx="18%" cy="18%" r="60%"><stop offset="0%" stop-color="rgba(244,239,231,0.45)"/><stop offset="100%" stop-color="rgba(244,239,231,0)"/></radialGradient></defs><rect width="1200" height="630" fill="url(#bg)"/><rect width="1200" height="630" fill="url(#glow)"/><circle cx="980" cy="130" r="140" fill="rgba(200,140,83,0.18)"/><circle cx="1020" cy="500" r="200" fill="rgba(255,255,255,0.06)"/><g fill="#f4efe7"><text x="84" y="188" font-family="Arial, sans-serif" font-size="34" font-weight="700" letter-spacing="6">SEBASTIÁN MUENA</text><text x="84" y="296" font-family="Georgia, serif" font-size="76" font-weight="700">Co-founder of Candel Medical,</text><text x="84" y="380" font-family="Georgia, serif" font-size="76" font-weight="700">building healthtech for Latin America.</text><text x="84" y="478" font-family="Arial, sans-serif" font-size="28" opacity="0.84">Finance, operations, and strategy</text><text x="84" y="526" font-family="Arial, sans-serif" font-size="28" opacity="0.68">sebastianmuena.com</text></g></svg>`;
}

async function writePage(relativePath, content) {
  const outputPath = path.join(rootDir, relativePath.replace(/^\//, ''));
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, content, 'utf8');
}

async function main() {
  await mkdir(path.join(rootDir, 'assets', 'js'), { recursive: true });
  await mkdir(path.join(rootDir, 'assets', 'css'), { recursive: true });
  await mkdir(path.join(rootDir, 'images'), { recursive: true });
  await mkdir(path.join(rootDir, 'en'), { recursive: true });

  for (const pageKey of pageOrder) {
    for (const lang of ['es', 'en']) {
      const filePath = outputFileFor(pageKey, lang);
      await mkdir(path.dirname(filePath), { recursive: true });
      await writeFile(filePath, renderPage(pageKey, lang), 'utf8');
    }
  }

  await writePage(
    '/404.html',
    renderLayout('home', 'es', render404('es'), {
      title: '404 | Sebastián Muena',
      description: 'Ruta no encontrada en sebastianmuena.com.',
      canonical: absoluteUrl('/404.html'),
      noindex: true,
      showAlternates: false
    })
  );

  await writePage('/sitemap.xml', renderSitemap());
  await writePage('/robots.txt', renderRobots());
  await writePage('/images/favicon.svg', renderFaviconSvg());
  await writePage('/images/og-cover.svg', renderOgSvg());

  await copyFile(
    path.join(rootDir, 'src', 'scripts', 'site.js'),
    path.join(rootDir, 'assets', 'js', 'site.js')
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
