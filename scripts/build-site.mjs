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
    '<path d="M4.5 5.5h15v2.25h-15Z"/><path d="M4.5 9.25h15v2.25h-15Z"/><path d="M6 12.75h12v6.75H6Z"/><path d="M4.5 19.5h1.5v-6.75h12V19.5h1.5V14.25H4.5Z"/>',
  pulse:
    '<path d="M3 12h4.1l1.65-3.55L12.5 18l2.75-6h5.75"/><path d="M12 21.25c-4.6-3.13-7.5-5.95-7.5-10a4.25 4.25 0 0 1 7.5-2.69 4.25 4.25 0 0 1 7.5 2.69c0 4.05-2.9 6.87-7.5 10Z"/>',
  lab: '<path d="M10 3v4.35l-4.95 8.3A2 2 0 0 0 6.78 19h10.44a2 2 0 0 0 1.73-3.05L14 7.35V3"/><path d="M8.25 10.75h7.5"/>',
  map: '<path d="m3 6.5 6-2 6 2 6-2v13l-6 2-6-2-6 2Z"/><path d="M9 4.5v13"/><path d="M15 6.5v13"/>',
  award:
    '<circle cx="12" cy="8.5" r="4.5"/><path d="m8.75 13 1.1 8L12 19.75 14.15 21l1.1-8"/>',
  rocket:
    '<path d="M14.5 4.5c2.25.4 4.1 2.25 4.5 4.5-.92 3.18-3.38 5.63-6.56 6.56-2.25-.4-4.1-2.25-4.5-4.5.93-3.18 3.38-5.64 6.56-6.56Z"/><path d="M8.25 15.75 5.5 18.5"/><path d="M8.5 10.5a1.75 1.75 0 1 0 3.5 0 1.75 1.75 0 0 0-3.5 0Z"/>',
  globe:
    '<circle cx="12" cy="12" r="8.75"/><path d="M3.75 12h16.5"/><path d="M12 3.25a14.75 14.75 0 0 1 0 17.5"/><path d="M12 3.25a14.75 14.75 0 0 0 0 17.5"/>',
  chart:
    '<path d="M4.5 19.5h15"/><path d="M7.5 16V9.5"/><path d="M12 16V5.5"/><path d="M16.5 16v-4.5"/>',
  seed:
    '<path d="M12 21c4-2.2 6.5-5.6 6.5-9.5A6.5 6.5 0 0 0 12 5a6.5 6.5 0 0 0-6.5 6.5C5.5 15.4 8 18.8 12 21Z"/><path d="M12 7.5v11"/><path d="M12 12c-2.2 0-4-1.35-4.75-3.25M12 12c2.2 0 4-1.35 4.75-3.25"/>',
  hospital:
    '<path d="M6 20V7.75A1.75 1.75 0 0 1 7.75 6h8.5A1.75 1.75 0 0 1 18 7.75V20"/><path d="M4 20h16"/><path d="M10.25 9.5h3.5"/><path d="M12 7.75v3.5"/><path d="M9 20v-4.5h6V20"/>',
  bolt:
    '<path d="M13.25 2.75 6.5 13h4.25L9.75 21.25 17.5 10.5h-4.25Z"/>',
  monitor:
    '<rect x="4.5" y="5.5" width="15" height="10.5" rx="1.5"/><path d="M9.5 20h5"/><path d="M12 16v4"/><path d="M8.25 10h7.5"/>',
  pen: '<path d="m4.5 19.5 3.6-.85L19 7.75l-2.75-2.75L5.35 15.9 4.5 19.5Z"/><path d="m13.75 6.5 2.75 2.75"/>',
  mic: '<path d="M12 15.5a3.5 3.5 0 0 0 3.5-3.5V7.5a3.5 3.5 0 1 0-7 0V12a3.5 3.5 0 0 0 3.5 3.5Z"/><path d="M5.5 11.5v.5a6.5 6.5 0 0 0 13 0v-.5"/><path d="M12 18.5v3"/><path d="M9 21.5h6"/>',
  briefcase:
    '<path d="M8 7V5.75A1.75 1.75 0 0 1 9.75 4h4.5A1.75 1.75 0 0 1 16 5.75V7"/><path d="M4.5 8.25h15A1.25 1.25 0 0 1 20.75 9.5v7A1.25 1.25 0 0 1 19.5 17.75h-15A1.25 1.25 0 0 1 3.25 16.5v-7A1.25 1.25 0 0 1 4.5 8.25Z"/><path d="M10 12h4"/>',
  file:
    '<path d="M8 3.75h6.5l3.75 3.75V20a1.25 1.25 0 0 1-1.25 1.25h-9.5A1.25 1.25 0 0 1 6.25 20V5A1.25 1.25 0 0 1 7.5 3.75Z"/><path d="M14.5 3.75V8h4.25"/><path d="M9.5 12h5"/><path d="M9.5 15.5h5"/><path d="M9.5 19h3.5"/>',
  download: '<path d="M12 4.5v10.25"/><path d="m8.5 11.75 3.5 3.5 3.5-3.5"/><path d="M5 19.5h14"/>',
  handshake:
    '<path d="m6 12.5 3.25-3.25a2.25 2.25 0 0 1 3.18 0l.32.32a2.25 2.25 0 0 0 3.18 0L18 7.5"/><path d="m6 12.5 2.25 2.25a1.6 1.6 0 0 0 2.26 0l1.24-1.24"/><path d="m9.75 16.25.5.5a1.6 1.6 0 0 0 2.26 0l1.24-1.24"/><path d="m13 17.25.25.25a1.6 1.6 0 0 0 2.26 0L18 15.01"/><path d="M3.75 10.25 6 12.5l-2.25 2.25"/><path d="M20.25 10.25 18 12.5l2.25 2.25"/>',
  compass:
    '<circle cx="12" cy="12" r="8.75"/><path d="m14.75 9.25-5.5 2.5 2.5 5.5 2-8Z"/>',
  clock: '<circle cx="12" cy="12" r="8.75"/><path d="M12 7.5v5l3.25 2"/>'
};

const mediaDownloads = {
  es: '/assets/media/sebastian-muena-media-kit-es.txt',
  en: '/assets/media/sebastian-muena-media-kit-en.txt',
  vcf: '/assets/media/sebastian-muena-contact.vcf'
};

function icon(name, extraClass = '') {
  const pathMarkup = iconPaths[name] || iconPaths.arrow;
  return `<svg class="${extraClass}" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${pathMarkup}</svg>`;
}

function absoluteUrl(relativePath) {
  const normalized = relativePath.startsWith('/') ? relativePath : `/${relativePath}`;
  return new URL(normalized, site.url).toString();
}

function outputFileFor(pageKey, lang) {
  const target = site.pages[pageKey].paths[lang];
  const relative = target === '/' ? '/index.html' : target;
  return path.join(rootDir, relative.replace(/^\//, ''));
}

function publicHref(pageKey, lang) {
  const page = site.pages[pageKey];
  if (pageKey === 'home') {
    return lang === 'es' ? '/' : '/en/';
  }

  return page.paths[lang];
}

function hrefFor(navKey, lang) {
  if (navKey === 'contact') {
    return lang === 'es' ? '/#contact' : '/en/#contact';
  }

  return publicHref(navKey, lang);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function currentYear() {
  return new Date().getFullYear();
}

function currentMonthLabel(lang) {
  return new Intl.DateTimeFormat(lang === 'es' ? 'es-CL' : 'en-US', {
    month: 'long',
    year: 'numeric'
  }).format(new Date());
}

function pageMeta(pageKey, lang) {
  const page = site.pages[pageKey];
  return {
    title: page.title[lang],
    description: page.description[lang],
    canonical: absoluteUrl(page.canonical[lang]),
    path: page.canonical[lang],
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
    description: site.person.tagline[lang],
    worksFor: {
      '@type': 'Organization',
      name: 'Candel Medical',
      url: site.links.candel
    },
    knowsAbout: ['healthtech', 'medical devices', 'operations', 'strategy', 'finance'],
    sameAs: [site.links.linkedin, site.links.github, site.links.substack, site.links.candel]
  };
}

function revealAttr(delay = 0) {
  return ` data-reveal data-reveal-delay="${delay}"`;
}

function externalLinkAttrs(href) {
  return href.startsWith('http') ? ' target="_blank" rel="noopener noreferrer"' : '';
}

function actionHref(item, lang) {
  if (item.pageKey) {
    return publicHref(item.pageKey, lang);
  }

  return item.href;
}

function renderMetricRows(items) {
  return items
    .map(
      (item) => `
        <div class="snapshot-list__item">
          <span class="snapshot-list__label">${escapeHtml(item.label)}</span>
          <span class="snapshot-list__value">${escapeHtml(item.value)}</span>
        </div>
      `
    )
    .join('');
}

function renderPillList(items) {
  return items.map((item) => `<span class="pill">${escapeHtml(item)}</span>`).join('');
}

function pageSummaryCard(pageKey, lang) {
  if (pageKey === 'home') {
    return `
      <div class="mini-card"${revealAttr(0)}>
        <strong>${escapeHtml(site.person.role[lang])}</strong>
        <p>${escapeHtml(site.person.tagline[lang])}</p>
      </div>
      <div class="mini-card"${revealAttr(80)}>
        <strong>${lang === 'es' ? 'Base de operación' : 'Operating context'}</strong>
        <p>${lang === 'es' ? 'Construyendo desde Chile para Latinoamérica.' : 'Building from Chile for Latin America.'}</p>
      </div>
    `;
  }

  if (pageKey === 'about') {
    return `
      <div class="mini-card"${revealAttr(0)}>
        <strong>${lang === 'es' ? 'Áreas de trabajo' : 'Focus areas'}</strong>
        <p>${lang === 'es' ? 'Healthtech, operaciones, estrategia y crecimiento.' : 'Healthtech, operations, strategy, and growth.'}</p>
      </div>
      <div class="mini-card"${revealAttr(80)}>
        <strong>${lang === 'es' ? 'Lectura complementaria' : 'Keep exploring'}</strong>
        <p>${lang === 'es' ? 'También puedes revisar proyectos, media kit y textos publicados.' : 'You can also explore projects, the media kit, and published writing.'}</p>
      </div>
    `;
  }

  if (pageKey === 'projects') {
    return `
      <div class="mini-card"${revealAttr(0)}>
        <strong>${lang === 'es' ? 'Criterio de selección' : 'Selection criteria'}</strong>
        <p>${lang === 'es' ? 'Solo muestro frentes que representen bien el tipo de trabajo que me interesa construir.' : 'I only show workstreams that represent the type of work I care about building.'}</p>
      </div>
      <div class="mini-card"${revealAttr(80)}>
        <strong>${lang === 'es' ? 'Valor visible' : 'Visible value'}</strong>
        <p>${lang === 'es' ? 'Cada proyecto está ordenado para explicar rol, enfoque y señal de profesionalismo.' : 'Each project is framed to show role, focus, and a clear professional signal.'}</p>
      </div>
    `;
  }

  if (pageKey === 'media') {
    return `
      <div class="mini-card"${revealAttr(0)}>
        <strong>${lang === 'es' ? 'Uso recomendado' : 'Best use'}</strong>
        <p>${lang === 'es' ? 'Prensa, eventos, presentaciones, perfiles editoriales y coordinación de conversaciones.' : 'Press, events, introductions, editorial profiles, and conversation planning.'}</p>
      </div>
      <div class="mini-card"${revealAttr(80)}>
        <strong>${lang === 'es' ? 'Actualizado' : 'Updated'}</strong>
        <p>${escapeHtml(currentMonthLabel(lang))}</p>
      </div>
    `;
  }

  return `
    <div class="mini-card"${revealAttr(0)}>
      <strong>${lang === 'es' ? 'Formato' : 'Format'}</strong>
      <p>${lang === 'es' ? 'Ensayos breves, observaciones y notas de trabajo.' : 'Short essays, observations, and working notes.'}</p>
    </div>
    <div class="mini-card"${revealAttr(80)}>
      <strong>${lang === 'es' ? 'Canal principal' : 'Primary channel'}</strong>
      <p>Substack</p>
    </div>
  `;
}

function renderHeader(pageKey, lang) {
  const alternateLang = lang === 'es' ? 'en' : 'es';
  const languageLabel = alternateLang.toUpperCase();
  const languageHref = publicHref(pageKey, alternateLang);

  const navLinks = site.nav
    .map((item) => {
      const href = hrefFor(item.key, lang);
      const active = item.key === pageKey ? ' aria-current="page"' : '';
      return `<li><a href="${href}"${active}>${escapeHtml(item.label[lang])}</a></li>`;
    })
    .join('');

  return `
    <header class="site-header" data-site-header data-menu-open="false" data-scrolled="false">
      <div class="site-header__bar">
        <a class="site-brand" href="${publicHref('home', lang)}" aria-label="${lang === 'es' ? 'Ir al inicio' : 'Go to homepage'}">
          <span class="site-brand__mark">SM</span>
          <span>${escapeHtml(site.siteName)}</span>
        </a>
        <nav class="site-nav" aria-label="${lang === 'es' ? 'Navegación principal' : 'Primary navigation'}">
          <button class="site-nav__toggle" type="button" data-menu-toggle aria-expanded="false" aria-controls="site-nav-menu">
            ${lang === 'es' ? 'Abrir menú' : 'Open menu'}
          </button>
          <ul class="site-nav__menu" id="site-nav-menu" data-nav-menu>
            ${navLinks}
          </ul>
          <a class="language-switch" href="${languageHref}" lang="${alternateLang}" hreflang="${alternateLang}" aria-label="${lang === 'es' ? 'Cambiar a inglés' : 'Switch to Spanish'}">
            ${icon('arrow')}
            <span>${languageLabel}</span>
          </a>
        </nav>
      </div>
    </header>
  `;
}

function renderFooter(lang) {
  return `
    <footer class="footer">
      <div class="footer__inner">
        <div class="footer__meta">
          &copy; ${currentYear()} ${escapeHtml(site.person.fullName)}.
        </div>
        <div class="footer__meta footer__meta--links">
          <a href="${publicHref('media', lang)}">${lang === 'es' ? 'Media kit' : 'Media kit'}</a>
          <span aria-hidden="true">/</span>
          <a href="${site.links.repo}" target="_blank" rel="noopener noreferrer">${lang === 'es' ? 'Repositorio del sitio' : 'Site repository'}</a>
        </div>
      </div>
    </footer>
  `;
}

function renderSocialLinks(lang, compact = false) {
  const links = site.social
    .map(
      (item) => `
        <a href="${item.href}" target="_blank" rel="noopener noreferrer" aria-label="${item.label}">
          ${icon(item.key)}
          <span>${item.label}</span>
        </a>
      `
    )
    .join('');

  return `<div class="social-links${compact ? ' social-links--compact' : ''}">${links}</div>`;
}

function renderHome(lang) {
  const home = site.pages.home;

  const stats = home.hero.stats
    .map(
      (item, index) => `
        <div class="stat"${revealAttr(index * 90)}>
          <span class="stat__value">${escapeHtml(item.value)}</span>
          <span class="stat__label">${escapeHtml(item.label[lang])}</span>
        </div>
      `
    )
    .join('');

  const validationItems = home.validation.items
    .map(
      (item, index) => `
        <article class="proof-badge"${revealAttr(index * 50)}>
          <strong>${escapeHtml(item.label)}</strong>
          <span>${escapeHtml(item.note[lang])}</span>
        </article>
      `
    )
    .join('');

  const highlightCards = home.highlights
    .map(
      (item, index) => `
        <article class="card card--soft"${revealAttr(index * 90)}>
          <div class="card__icon">${icon(item.icon)}</div>
          <h3 class="card__title">${escapeHtml(item.title[lang])}</h3>
          <p class="card__body">${escapeHtml(item.body[lang])}</p>
        </article>
      `
    )
    .join('');

  const nowCards = home.now.items
    .map(
      (item, index) => `
        <article class="card"${revealAttr(index * 90)}>
          <div class="card__icon">${icon(item.icon)}</div>
          <h3 class="card__title">${escapeHtml(item.title[lang])}</h3>
          <p class="card__body">${escapeHtml(item.body[lang])}</p>
        </article>
      `
    )
    .join('');

  const experience = home.experience
    .map((item, index) => {
      const organization = item.href
        ? `<a class="timeline__org" href="${item.href}" target="_blank" rel="noopener noreferrer">${escapeHtml(item.organization)}</a>`
        : `<div class="timeline__org">${escapeHtml(item.organization)}</div>`;

      return `
        <article class="timeline__item"${revealAttr(index * 110)}>
          <span class="timeline__period">${escapeHtml(item.period[lang])}</span>
          <h3 class="timeline__role">${escapeHtml(item.role[lang])}</h3>
          ${organization}
          <p class="timeline__body">${escapeHtml(item.body[lang])}</p>
        </article>
      `;
    })
    .join('');

  const recognition = home.recognition
    .map(
      (item, index) => `
        <article class="card"${revealAttr(index * 90)}>
          <div class="card__icon">${icon(item.icon)}</div>
          <h3 class="card__title">${escapeHtml(item.title)}</h3>
          <p class="card__body">${escapeHtml(item.body[lang])}</p>
        </article>
      `
    )
    .join('');

  const writing = home.writing.items
    .map((item, index) => {
      const href = actionHref(item, lang);

      return `
        <article class="story-card"${revealAttr(index * 90)}>
          <div class="pill">${escapeHtml(typeof item.eyebrow === 'string' ? item.eyebrow : item.eyebrow[lang])}</div>
          <h3 class="story-card__title">${escapeHtml(typeof item.title === 'string' ? item.title : item.title[lang])}</h3>
          <p class="card__body">${escapeHtml(item.body[lang])}</p>
          <div class="section-actions section-actions--top">
            <a class="button--secondary" href="${href}"${externalLinkAttrs(href)}>${escapeHtml(item.action[lang])} ${icon('arrow')}</a>
          </div>
        </article>
      `;
    })
    .join('');

  const speaking = home.speaking.topics
    .map(
      (item, index) => `
        <article class="card card--soft"${revealAttr(index * 80)}>
          <div class="card__icon">${icon(item.icon)}</div>
          <h3 class="card__title">${escapeHtml(item.title[lang])}</h3>
          <p class="card__body">${escapeHtml(item.body[lang])}</p>
        </article>
      `
    )
    .join('');

  const fitItems = home.contact.fit.items[lang]
    .map(
      (item) => `
        <div class="feature-list__item">
          <div class="feature-list__marker">${icon('handshake')}</div>
          <div>
            <div class="feature-list__title">${escapeHtml(item)}</div>
          </div>
        </div>
      `
    )
    .join('');

  return `
    <main id="main" class="page">
      <section class="hero">
        <div class="hero__copy"${revealAttr(0)}>
          <div class="eyebrow">${escapeHtml(home.hero.eyebrow[lang])}</div>
          <h1>${escapeHtml(home.hero.title[lang])}</h1>
          <p class="lead">${escapeHtml(home.hero.summary[lang])}</p>
          <div class="hero__actions">
            <a class="button" href="${publicHref('projects', lang)}">${lang === 'es' ? 'Ver proyectos' : 'View projects'} ${icon('arrow')}</a>
            <a class="button--secondary" href="${publicHref('media', lang)}">${lang === 'es' ? 'Abrir media kit' : 'Open media kit'}</a>
            <a class="button--ghost" href="#contact">${lang === 'es' ? 'Iniciar conversación' : 'Start a conversation'}</a>
          </div>
          <div class="hero__stats">
            ${stats}
          </div>
          ${renderSocialLinks(lang)}
        </div>
        <div class="hero__visual"${revealAttr(120)}>
          <div class="portrait">
            <img src="${site.person.image}" alt="${lang === 'es' ? 'Retrato de Sebastián Muena' : 'Portrait of Sebastián Muena'}" width="1200" height="1500" fetchpriority="high" />
            <div class="portrait__note">
              <strong>${escapeHtml(site.person.role[lang])}</strong>
              <span>${escapeHtml(site.person.tagline[lang])}</span>
            </div>
          </div>
        </div>
      </section>

      <section class="section section--tight" aria-labelledby="validation-title">
        <div class="proof-strip">
          <div class="proof-strip__copy"${revealAttr(0)}>
            <div class="section__eyebrow">${escapeHtml(home.validation.heading[lang])}</div>
            <h2 id="validation-title">${lang === 'es' ? 'Credibilidad visible, no implícita.' : 'Visible credibility, not implied.'}</h2>
            <p class="section__description">${escapeHtml(home.validation.body[lang])}</p>
          </div>
          <div class="proof-strip__grid">
            ${validationItems}
          </div>
        </div>
      </section>

      <section class="section" aria-labelledby="highlights-title">
        <div class="section__header"${revealAttr(0)}>
          <div>
            <div class="section__eyebrow">${lang === 'es' ? 'Enfoque' : 'Focus'}</div>
            <h2 id="highlights-title">${lang === 'es' ? 'Dónde concentro energía y criterio.' : 'Where I focus energy and judgment.'}</h2>
          </div>
          <p class="section__description">${lang === 'es' ? 'Mi trabajo combina operación, estrategia y una lectura muy concreta del contexto latinoamericano.' : 'My work combines operations, strategy, and a grounded reading of the Latin American context.'}</p>
        </div>
        <div class="grid grid--3">
          ${highlightCards}
        </div>
      </section>

      <section class="section" aria-labelledby="now-title">
        <div class="section__header"${revealAttr(0)}>
          <div>
            <div class="section__eyebrow">${lang === 'es' ? 'Ahora' : 'Now'}</div>
            <h2 id="now-title">${escapeHtml(home.now.heading[lang])}</h2>
          </div>
          <p class="section__description">${escapeHtml(home.now.body[lang])}</p>
        </div>
        <div class="grid grid--3">
          ${nowCards}
        </div>
      </section>

      <section class="section" aria-labelledby="experience-title">
        <div class="section__header"${revealAttr(0)}>
          <div>
            <div class="section__eyebrow">${lang === 'es' ? 'Trayectoria' : 'Experience'}</div>
            <h2 id="experience-title">${lang === 'es' ? 'Una mezcla de análisis, ejecución y construcción.' : 'A mix of analysis, execution, and company building.'}</h2>
          </div>
          <p class="section__description">${lang === 'es' ? 'Los hitos que mejor resumen el tipo de decisiones y sistemas que me interesa liderar.' : 'The milestones that best summarize the type of decisions and systems I like to lead.'}</p>
        </div>
        <div class="timeline">
          ${experience}
        </div>
      </section>

      <section class="section" aria-labelledby="recognition-title">
        <div class="section__header"${revealAttr(0)}>
          <div>
            <div class="section__eyebrow">${lang === 'es' ? 'Reconocimientos' : 'Recognition'}</div>
            <h2 id="recognition-title">${lang === 'es' ? 'Validación externa del trabajo en marcha.' : 'External validation for the work in motion.'}</h2>
          </div>
          <p class="section__description">${lang === 'es' ? 'Premios, programas y apoyos que han acompañado el desarrollo de Candel Medical.' : 'Awards, programs, and support that have accompanied the development of Candel Medical.'}</p>
        </div>
        <div class="grid grid--3">
          ${recognition}
        </div>
      </section>

      <section class="section" aria-labelledby="writing-title">
        <div class="section__header"${revealAttr(0)}>
          <div>
            <div class="section__eyebrow">${lang === 'es' ? 'Ideas' : 'Ideas'}</div>
            <h2 id="writing-title">${escapeHtml(home.writing.heading[lang])}</h2>
          </div>
          <p class="section__description">${escapeHtml(home.writing.body[lang])}</p>
        </div>
        <div class="grid grid--3">
          ${writing}
        </div>
      </section>

      <section class="section" aria-labelledby="speaking-title">
        <div class="section__header"${revealAttr(0)}>
          <div>
            <div class="section__eyebrow">${lang === 'es' ? 'Speaking y colaboración' : 'Speaking and collaboration'}</div>
            <h2 id="speaking-title">${escapeHtml(home.speaking.heading[lang])}</h2>
          </div>
          <p class="section__description">${escapeHtml(home.speaking.body[lang])}</p>
        </div>
        <div class="grid grid--2">
          ${speaking}
        </div>
        <div class="callout callout--wide"${revealAttr(120)}>
          <p>${escapeHtml(home.speaking.note[lang])}</p>
          <div class="section-actions section-actions--top">
            <a class="button--secondary" href="${publicHref('media', lang)}">${lang === 'es' ? 'Ver media kit' : 'View media kit'} ${icon('arrow')}</a>
          </div>
        </div>
      </section>

      <section class="section" id="contact" aria-labelledby="contact-title">
        <div class="section__header"${revealAttr(0)}>
          <div>
            <div class="section__eyebrow">${lang === 'es' ? 'Contacto' : 'Contact'}</div>
            <h2 id="contact-title">${escapeHtml(home.contact.heading[lang])}</h2>
          </div>
          <p class="section__description">${escapeHtml(home.contact.body[lang])}</p>
        </div>
        <div class="form-card">
          <div class="surface-panel"${revealAttr(0)}>
            <form class="contact-form" action="https://formspree.io/f/xbdzloag" method="POST" data-contact-form novalidate>
              <div class="contact-form__grid">
                <div class="field">
                  <label for="nombre">${lang === 'es' ? 'Nombre' : 'Name'}</label>
                  <input id="nombre" name="nombre" type="text" autocomplete="name" required />
                </div>
                <div class="field">
                  <label for="email">${lang === 'es' ? 'Email' : 'Email'}</label>
                  <input id="email" name="email" type="email" autocomplete="email" required />
                </div>
                <div class="field field--full">
                  <label for="asunto">${lang === 'es' ? 'Asunto' : 'Subject'}</label>
                  <input id="asunto" name="asunto" type="text" />
                </div>
                <div class="field field--full">
                  <label for="mensaje">${lang === 'es' ? 'Mensaje' : 'Message'}</label>
                  <textarea id="mensaje" name="mensaje" required></textarea>
                </div>
              </div>
              <div class="form-actions">
                <button class="button" type="submit" data-form-submit>${lang === 'es' ? 'Enviar mensaje' : 'Send message'} ${icon('arrow')}</button>
                <button class="button--ghost" type="reset">${lang === 'es' ? 'Limpiar' : 'Reset'}</button>
              </div>
              <p class="form-status" data-form-status data-state="info" hidden aria-live="polite"></p>
            </form>
          </div>
          <div class="surface-panel stack"${revealAttr(90)}>
            <div class="callout">
              <h3>${escapeHtml(home.contact.fit.heading[lang])}</h3>
              <div class="feature-list feature-list--dense">
                ${fitItems}
              </div>
            </div>
            <div class="callout">
              <p>${escapeHtml(home.contact.note[lang])}</p>
            </div>
            <div>
              <h3>${lang === 'es' ? 'Canales principales' : 'Primary channels'}</h3>
              <div class="stack stack--top">
                <a class="icon-link" href="${site.links.linkedin}" target="_blank" rel="noopener noreferrer">${icon('linkedin')} LinkedIn</a>
                <a class="icon-link" href="${site.links.substack}" target="_blank" rel="noopener noreferrer">${icon('substack')} Substack</a>
                <a class="icon-link" href="${publicHref('media', lang)}">${icon('file')} ${lang === 'es' ? 'Media kit' : 'Media kit'}</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  `;
}

function renderAbout(lang) {
  const page = site.pages.about;

  const pillarCards = page.pillars
    .map(
      (item, index) => `
        <article class="card card--soft"${revealAttr(index * 90)}>
          <div class="card__icon">${icon(item.icon)}</div>
          <h2 class="card__title">${escapeHtml(item.title[lang])}</h2>
          <p class="card__body">${escapeHtml(item.body[lang])}</p>
        </article>
      `
    )
    .join('');

  const principles = page.principles.items[lang]
    .map(
      (item) => `
        <div class="feature-list__item">
          <div class="feature-list__marker">${icon('arrow')}</div>
          <div>
            <div class="feature-list__title">${escapeHtml(item)}</div>
          </div>
        </div>
      `
    )
    .join('');

  const introParagraphs = page.intro.paragraphs[lang]
    .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
    .join('');

  return `
    <main id="main" class="page">
      <section class="page-heading">
        <div class="page-heading__content">
          <div class="page-heading__copy"${revealAttr(0)}>
            <div class="section__eyebrow">${lang === 'es' ? 'Perfil' : 'Profile'}</div>
            <h1>${escapeHtml(page.intro.heading[lang])}</h1>
            <p class="lead">${escapeHtml(site.person.tagline[lang])}</p>
          </div>
          <div class="page-heading__side">
            ${pageSummaryCard('about', lang)}
          </div>
        </div>
      </section>

      <section class="section" aria-labelledby="about-intro-title">
        <div class="note-grid">
          <div class="surface-panel prose"${revealAttr(0)}>
            <h2 id="about-intro-title">${lang === 'es' ? 'Contexto' : 'Context'}</h2>
            ${introParagraphs}
          </div>
          <div class="surface-panel"${revealAttr(90)}>
            <h2>${lang === 'es' ? 'Enlaces clave' : 'Key links'}</h2>
            <div class="stack stack--top">
              <a class="icon-link" href="${site.links.candel}" target="_blank" rel="noopener noreferrer">${icon('hospital')} Candel Medical</a>
              <a class="icon-link" href="${site.links.linkedin}" target="_blank" rel="noopener noreferrer">${icon('linkedin')} LinkedIn</a>
              <a class="icon-link" href="${publicHref('media', lang)}">${icon('file')} ${lang === 'es' ? 'Media kit' : 'Media kit'}</a>
              <a class="icon-link" href="${site.links.substack}" target="_blank" rel="noopener noreferrer">${icon('substack')} Substack</a>
            </div>
          </div>
        </div>
      </section>

      <section class="section" aria-labelledby="pillars-title">
        <div class="section__header"${revealAttr(0)}>
          <div>
            <div class="section__eyebrow">${lang === 'es' ? 'Pilares' : 'Pillars'}</div>
            <h2 id="pillars-title">${lang === 'es' ? 'Tres ejes que organizan mi trabajo.' : 'Three pillars that organize my work.'}</h2>
          </div>
          <p class="section__description">${lang === 'es' ? 'Más que una lista de cargos, esto resume dónde intento aportar mayor valor.' : 'More than a list of titles, this describes where I try to create the most value.'}</p>
        </div>
        <div class="grid grid--3">
          ${pillarCards}
        </div>
      </section>

      <section class="section" aria-labelledby="principles-title">
        <div class="section__header"${revealAttr(0)}>
          <div>
            <div class="section__eyebrow">${lang === 'es' ? 'Forma de trabajo' : 'Working style'}</div>
            <h2 id="principles-title">${escapeHtml(page.principles.heading[lang])}</h2>
          </div>
          <p class="section__description">${lang === 'es' ? 'Principios simples para sostener foco y calidad de ejecución.' : 'Simple principles to sustain focus and execution quality.'}</p>
        </div>
        <div class="surface-panel"${revealAttr(80)}>
          <div class="feature-list">
            ${principles}
          </div>
        </div>
      </section>

      <section class="section" aria-labelledby="outside-work-title">
        <details class="details-card"${revealAttr(0)}>
          <summary>${escapeHtml(page.note.heading[lang])}</summary>
          <div class="details-card__content">
            <p class="muted" id="outside-work-title">${escapeHtml(page.note.summary[lang])}</p>
          </div>
        </details>
      </section>
    </main>
  `;
}

function renderProjects(lang) {
  const page = site.pages.projects;

  const featured = page.featured
    .map((item, index) => {
      const title = typeof item.title === 'string' ? item.title : item.title[lang];
      const titleMarkup = item.href
        ? `<a href="${item.href}" target="_blank" rel="noopener noreferrer">${escapeHtml(title)}</a>`
        : escapeHtml(title);

      const tags = item.tags[lang].map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join('');

      return `
        <article class="card case-card"${revealAttr(index * 90)}>
          <div class="card__icon">${icon(item.icon)}</div>
          <h2 class="card__title">${titleMarkup}</h2>
          <p class="card__body">${escapeHtml(item.body[lang])}</p>
          <div class="snapshot-list">
            ${renderMetricRows(item.snapshot[lang])}
          </div>
          <div class="card__tags">${tags}</div>
        </article>
      `;
    })
    .join('');

  const selection = page.selection.items
    .map(
      (item, index) => `
        <article class="card card--soft"${revealAttr(index * 90)}>
          <div class="card__icon">${icon(item.icon)}</div>
          <h2 class="card__title"><a href="${item.href}" target="_blank" rel="noopener noreferrer">${escapeHtml(item.title)}</a></h2>
          <p class="card__body">${escapeHtml(item.body[lang])}</p>
        </article>
      `
    )
    .join('');

  return `
    <main id="main" class="page">
      <section class="page-heading">
        <div class="page-heading__content">
          <div class="page-heading__copy"${revealAttr(0)}>
            <div class="section__eyebrow">${lang === 'es' ? 'Trabajo en curso' : 'Work in motion'}</div>
            <h1>${lang === 'es' ? 'Proyectos que explican mejor el tipo de construcción que me interesa.' : 'Projects that best explain the type of building I care about.'}</h1>
            <p class="lead">${lang === 'es' ? 'Selección curada de frentes donde se cruzan salud, tecnología, estrategia y ejecución.' : 'A curated selection of workstreams where healthcare, technology, strategy, and execution meet.'}</p>
          </div>
          <div class="page-heading__side">
            ${pageSummaryCard('projects', lang)}
          </div>
        </div>
      </section>

      <section class="section" aria-labelledby="featured-projects-title">
        <div class="section__header"${revealAttr(0)}>
          <div>
            <div class="section__eyebrow">${lang === 'es' ? 'Selección principal' : 'Featured selection'}</div>
            <h2 id="featured-projects-title">${lang === 'es' ? 'Casos que muestran rol, criterio y nivel de ejecución.' : 'Cases that show role, judgment, and execution level.'}</h2>
          </div>
          <p class="section__description">${lang === 'es' ? 'La idea no es mostrar cantidad, sino dejar claro qué tipo de problemas me interesa resolver y cómo los abordo.' : 'The goal is not volume, but clarity around the problems I care about and how I approach them.'}</p>
        </div>
        <div class="grid grid--3">
          ${featured}
        </div>
      </section>

      <section class="section" aria-labelledby="follow-work-title">
        <div class="section__header"${revealAttr(0)}>
          <div>
            <div class="section__eyebrow">${lang === 'es' ? 'Canales' : 'Channels'}</div>
            <h2 id="follow-work-title">${escapeHtml(page.selection.heading[lang])}</h2>
          </div>
          <p class="section__description">${lang === 'es' ? 'Si quieres seguir el trabajo, estos son los puntos más útiles.' : 'If you want to follow the work, these are the most useful places to start.'}</p>
        </div>
        <div class="grid grid--3">
          ${selection}
        </div>
      </section>
    </main>
  `;
}

function renderBlog(lang) {
  const page = site.pages.blog;

  const posts = page.posts
    .map(
      (item, index) => `
        <article class="card"${revealAttr(index * 90)}>
          <div class="pill">${escapeHtml(item.date[lang])}</div>
          <h2 class="card__title card__title--spaced"><a href="${item.href}" target="_blank" rel="noopener noreferrer">${escapeHtml(item.title)}</a></h2>
          <p class="card__body">${escapeHtml(item.excerpt[lang])}</p>
          <div class="section-actions section-actions--top">
            <a class="button--secondary" href="${item.href}" target="_blank" rel="noopener noreferrer">${lang === 'es' ? 'Leer en Substack' : 'Read on Substack'} ${icon('arrow')}</a>
          </div>
        </article>
      `
    )
    .join('');

  const topics = page.topics
    .map(
      (item, index) => `
        <article class="card card--soft"${revealAttr(index * 80)}>
          <div class="card__icon">${icon(item.icon)}</div>
          <h2 class="card__title">${escapeHtml(item.title[lang])}</h2>
          <p class="card__body">${escapeHtml(item.body[lang])}</p>
        </article>
      `
    )
    .join('');

  return `
    <main id="main" class="page">
      <section class="page-heading">
        <div class="page-heading__content">
          <div class="page-heading__copy"${revealAttr(0)}>
            <div class="section__eyebrow">${lang === 'es' ? 'Blog' : 'Writing'}</div>
            <h1>${escapeHtml(page.intro.heading[lang])}</h1>
            <p class="lead">${escapeHtml(page.intro.body[lang])}</p>
          </div>
          <div class="page-heading__side">
            ${pageSummaryCard('blog', lang)}
          </div>
        </div>
      </section>

      <section class="section" aria-labelledby="latest-post-title">
        <div class="section__header"${revealAttr(0)}>
          <div>
            <div class="section__eyebrow">${lang === 'es' ? 'Último texto' : 'Latest essay'}</div>
            <h2 id="latest-post-title">${lang === 'es' ? 'Lo más reciente publicado.' : 'The most recent piece published.'}</h2>
          </div>
          <p class="section__description">${lang === 'es' ? 'La mayor parte de la escritura vive en Substack, donde mantengo la publicación principal.' : 'Most writing lives on Substack, where I keep the main publication.'}</p>
        </div>
        <div class="grid grid--2">
          ${posts}
          <div class="surface-panel stack"${revealAttr(110)}>
            <div class="callout">
              <h2>${escapeHtml(page.cta.heading[lang])}</h2>
              <p>${escapeHtml(page.cta.body[lang])}</p>
            </div>
            <div class="section-actions">
              <a class="button" href="${site.links.substack}" target="_blank" rel="noopener noreferrer">${lang === 'es' ? 'Ir a Substack' : 'Visit Substack'} ${icon('arrow')}</a>
              <a class="button--ghost" href="${publicHref('media', lang)}">${lang === 'es' ? 'Ver media kit' : 'View media kit'}</a>
            </div>
          </div>
        </div>
      </section>

      <section class="section" aria-labelledby="topics-title">
        <div class="section__header"${revealAttr(0)}>
          <div>
            <div class="section__eyebrow">${lang === 'es' ? 'Temas' : 'Topics'}</div>
            <h2 id="topics-title">${lang === 'es' ? 'Las conversaciones que me interesa sostener.' : 'The conversations I want to keep having.'}</h2>
          </div>
          <p class="section__description">${lang === 'es' ? 'Temas recurrentes en la escritura y en las notas que seguirán apareciendo.' : 'Recurring themes in the essays and notes I plan to keep publishing.'}</p>
        </div>
        <div class="grid grid--3">
          ${topics}
        </div>
      </section>
    </main>
  `;
}

function renderMedia(lang) {
  const page = site.pages.media;

  const facts = page.facts
    .map(
      (item, index) => `
        <article class="fact-card"${revealAttr(index * 70)}>
          <span class="fact-card__label">${escapeHtml(item.label[lang])}</span>
          <strong class="fact-card__value">${escapeHtml(item.value[lang])}</strong>
        </article>
      `
    )
    .join('');

  const descriptors = page.descriptors
    .map(
      (item, index) => `
        <article class="card card--soft"${revealAttr(index * 80)}>
          <div class="card__icon">${icon('file')}</div>
          <h2 class="card__title">${escapeHtml(item.title[lang])}</h2>
          <p class="card__body">${escapeHtml(item.body[lang])}</p>
        </article>
      `
    )
    .join('');

  const topics = page.topics
    .map(
      (item, index) => `
        <article class="card"${revealAttr(index * 80)}>
          <div class="card__icon">${icon(item.icon)}</div>
          <h2 class="card__title">${escapeHtml(item.title[lang])}</h2>
          <p class="card__body">${escapeHtml(item.body[lang])}</p>
        </article>
      `
    )
    .join('');

  const availability = page.availability.items[lang]
    .map(
      (item) => `
        <div class="feature-list__item">
          <div class="feature-list__marker">${icon('clock')}</div>
          <div>
            <div class="feature-list__title">${escapeHtml(item)}</div>
          </div>
        </div>
      `
    )
    .join('');

  return `
    <main id="main" class="page">
      <section class="page-heading">
        <div class="page-heading__content">
          <div class="page-heading__copy"${revealAttr(0)}>
            <div class="section__eyebrow">${lang === 'es' ? 'Media kit' : 'Media kit'}</div>
            <h1>${escapeHtml(page.intro.heading[lang])}</h1>
            <p class="lead">${escapeHtml(page.intro.body[lang])}</p>
            <div class="hero__actions">
              <a class="button" href="${mediaDownloads[lang]}" download>${lang === 'es' ? 'Descargar bio' : 'Download bio'} ${icon('download')}</a>
              <a class="button--secondary" href="${mediaDownloads.vcf}" download>${lang === 'es' ? 'Descargar contacto' : 'Download contact'} ${icon('download')}</a>
              <a class="button--ghost" href="${site.person.image}" target="_blank" rel="noopener noreferrer">${lang === 'es' ? 'Abrir retrato' : 'Open portrait'}</a>
            </div>
          </div>
          <div class="page-heading__side">
            ${pageSummaryCard('media', lang)}
          </div>
        </div>
      </section>

      <section class="section" aria-labelledby="facts-title">
        <div class="section__header"${revealAttr(0)}>
          <div>
            <div class="section__eyebrow">${lang === 'es' ? 'Ficha rápida' : 'Quick facts'}</div>
            <h2 id="facts-title">${lang === 'es' ? 'La información esencial, ordenada para presentar el trabajo.' : 'The essential information, organized to introduce the work.'}</h2>
          </div>
          <p class="section__description">${lang === 'es' ? 'Sirve para notas, presentaciones, invitaciones y material editorial.' : 'Useful for notes, introductions, invitations, and editorial material.'}</p>
        </div>
        <div class="fact-grid">
          ${facts}
        </div>
      </section>

      <section class="section" aria-labelledby="bio-title">
        <div class="section__header"${revealAttr(0)}>
          <div>
            <div class="section__eyebrow">${lang === 'es' ? 'Biografía' : 'Biography'}</div>
            <h2 id="bio-title">${lang === 'es' ? 'Dos versiones listas para usar.' : 'Two ready-to-use versions.'}</h2>
          </div>
          <p class="section__description">${lang === 'es' ? 'Puedes copiar el texto breve para presentaciones rápidas o usar la versión larga para perfiles editoriales.' : 'Use the short version for quick introductions or the long one for editorial profiles.'}</p>
        </div>
        <div class="grid grid--2">
          <article class="surface-panel prose"${revealAttr(0)}>
            <h2>${lang === 'es' ? 'Versión corta' : 'Short version'}</h2>
            <p>${escapeHtml(page.bios.short[lang])}</p>
          </article>
          <article class="surface-panel prose"${revealAttr(90)}>
            <h2>${lang === 'es' ? 'Versión extendida' : 'Extended version'}</h2>
            <p>${escapeHtml(page.bios.long[lang])}</p>
          </article>
        </div>
      </section>

      <section class="section" aria-labelledby="descriptor-title">
        <div class="section__header"${revealAttr(0)}>
          <div>
            <div class="section__eyebrow">${lang === 'es' ? 'Cómo presentarme' : 'How to introduce me'}</div>
            <h2 id="descriptor-title">${lang === 'es' ? 'Tres descripciones útiles según el contexto.' : 'Three useful descriptions depending on the context.'}</h2>
          </div>
          <p class="section__description">${lang === 'es' ? 'Pensadas para moderadores, periodistas, hosts o colaboradores.' : 'Designed for moderators, journalists, hosts, or collaborators.'}</p>
        </div>
        <div class="grid grid--3">
          ${descriptors}
        </div>
      </section>

      <section class="section" aria-labelledby="media-topics-title">
        <div class="section__header"${revealAttr(0)}>
          <div>
            <div class="section__eyebrow">${lang === 'es' ? 'Temas' : 'Topics'}</div>
            <h2 id="media-topics-title">${lang === 'es' ? 'Ángulos de conversación donde más puedo aportar.' : 'Conversation angles where I can contribute the most.'}</h2>
          </div>
          <p class="section__description">${lang === 'es' ? 'Una guía rápida para definir paneles, entrevistas o encuentros de trabajo.' : 'A quick guide to shape panels, interviews, or working sessions.'}</p>
        </div>
        <div class="grid grid--2">
          ${topics}
        </div>
      </section>

      <section class="section" aria-labelledby="availability-title">
        <div class="split-panel">
          <article class="surface-panel"${revealAttr(0)}>
            <h2 id="availability-title">${escapeHtml(page.availability.heading[lang])}</h2>
            <div class="feature-list feature-list--dense stack--top">
              ${availability}
            </div>
            <p class="muted stack--top">${escapeHtml(page.availability.note[lang])}</p>
          </article>
          <article class="surface-panel media-asset"${revealAttr(90)}>
            <div class="media-asset__image">
              <img src="${site.person.image}" alt="${lang === 'es' ? 'Retrato de Sebastián Muena' : 'Portrait of Sebastián Muena'}" width="1200" height="1500" loading="lazy" />
            </div>
            <div class="media-asset__copy">
              <h2>${lang === 'es' ? 'Activos disponibles' : 'Available assets'}</h2>
              <div class="stack stack--top">
                <a class="icon-link" href="${mediaDownloads[lang]}" download>${icon('download')} ${lang === 'es' ? 'Biografía descargable' : 'Downloadable biography'}</a>
                <a class="icon-link" href="${mediaDownloads.vcf}" download>${icon('download')} vCard</a>
                <a class="icon-link" href="${site.person.image}" target="_blank" rel="noopener noreferrer">${icon('file')} ${lang === 'es' ? 'Retrato en alta resolución base' : 'Base portrait asset'}</a>
                <a class="icon-link" href="${site.links.linkedin}" target="_blank" rel="noopener noreferrer">${icon('linkedin')} LinkedIn</a>
              </div>
            </div>
          </article>
        </div>
      </section>
    </main>
  `;
}

function render404(lang = 'es') {
  return `
    <main id="main" class="page">
      <section class="page-heading">
        <div class="page-heading__content">
          <div class="page-heading__copy"${revealAttr(0)}>
            <div class="section__eyebrow">404</div>
            <h1>${lang === 'es' ? 'Esta página no existe o cambió de lugar.' : 'This page does not exist or has moved.'}</h1>
            <p class="lead">${lang === 'es' ? 'Puedes volver al inicio y seguir navegando desde ahí.' : 'You can return to the homepage and continue from there.'}</p>
            <div class="hero__actions">
              <a class="button" href="${publicHref('home', lang)}">${lang === 'es' ? 'Volver al inicio' : 'Back to home'} ${icon('arrow')}</a>
            </div>
          </div>
          <div class="page-heading__side">
            <div class="mini-card"${revealAttr(80)}>
              <strong>${lang === 'es' ? 'Sugerencia' : 'Tip'}</strong>
              <p>${lang === 'es' ? 'Si venías por un recurso de prensa, prueba el media kit del sitio.' : 'If you were looking for a press resource, try the site media kit.'}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  `;
}

function renderLayout(pageKey, lang, bodyMarkup, overrides = {}) {
  const baseMeta = pageMeta(pageKey, lang);
  const meta = {
    ...baseMeta,
    ...overrides
  };
  const noindex = overrides.noindex === true;
  const showAlternates = overrides.showAlternates !== false;

  return `<!doctype html>
<html lang="${lang}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(meta.title)}</title>
    <meta name="description" content="${escapeHtml(meta.description)}" />
    <meta name="theme-color" content="#12363a" />
    <link rel="canonical" href="${meta.canonical}" />
    ${noindex ? '<meta name="robots" content="noindex, nofollow" />' : ''}
    ${showAlternates ? `<link rel="alternate" hreflang="es" href="${absoluteUrl(site.pages[pageKey].canonical.es)}" />
    <link rel="alternate" hreflang="en" href="${absoluteUrl(site.pages[pageKey].canonical.en)}" />
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
    <a class="skip-link" href="#main">${lang === 'es' ? 'Saltar al contenido principal' : 'Skip to main content'}</a>
    <div class="site-shell">
      ${renderHeader(pageKey, lang)}
      ${bodyMarkup}
      ${renderFooter(lang)}
    </div>
    <script src="/assets/js/site.js" defer></script>
  </body>
</html>`;
}

function renderPage(pageKey, lang) {
  if (pageKey === 'home') return renderLayout(pageKey, lang, renderHome(lang));
  if (pageKey === 'about') return renderLayout(pageKey, lang, renderAbout(lang));
  if (pageKey === 'projects') return renderLayout(pageKey, lang, renderProjects(lang));
  if (pageKey === 'blog') return renderLayout(pageKey, lang, renderBlog(lang));
  return renderLayout(pageKey, lang, renderMedia(lang));
}

function renderSitemap() {
  const urls = pageOrder.flatMap((pageKey) =>
    ['es', 'en'].map((lang) => absoluteUrl(site.pages[pageKey].canonical[lang]))
  );

  const entries = urls
    .map((url) => `  <url>\n    <loc>${escapeHtml(url)}</loc>\n  </url>`)
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;
}

function renderRobots() {
  return `User-agent: *\nAllow: /\n\nSitemap: ${absoluteUrl('/sitemap.xml')}\n`;
}

function renderFaviconSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="SM"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0e7a73"/><stop offset="100%" stop-color="#12363a"/></linearGradient></defs><rect width="64" height="64" rx="20" fill="url(#g)"/><path d="M18 20h11c7.2 0 11 3.3 11 8.9 0 4.1-2.4 7.1-6.5 8l7.1 7.1H34l-5.9-6.4H24V44h-6V20Zm6 5v8.3h4.5c3.7 0 5.6-1.4 5.6-4.2 0-2.7-1.9-4.1-5.6-4.1H24Z" fill="#fff"/><path d="M42.3 20H48v24h-5.7z" fill="#d5efe9"/></svg>`;
}

function renderOgSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-label="Sebastián Muena"><defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#12363a"/><stop offset="100%" stop-color="#0e7a73"/></linearGradient><radialGradient id="glow" cx="18%" cy="18%" r="60%"><stop offset="0%" stop-color="rgba(244,239,231,0.45)"/><stop offset="100%" stop-color="rgba(244,239,231,0)"/></radialGradient></defs><rect width="1200" height="630" fill="url(#bg)"/><rect width="1200" height="630" fill="url(#glow)"/><circle cx="980" cy="130" r="140" fill="rgba(200,140,83,0.18)"/><circle cx="1020" cy="500" r="200" fill="rgba(255,255,255,0.06)"/><g fill="#f4efe7"><text x="84" y="188" font-family="Arial, sans-serif" font-size="34" font-weight="700" letter-spacing="6">SEBASTIÁN MUENA</text><text x="84" y="302" font-family="Georgia, serif" font-size="84" font-weight="700">Healthtech, strategy,</text><text x="84" y="392" font-family="Georgia, serif" font-size="84" font-weight="700">and execution.</text><text x="84" y="478" font-family="Arial, sans-serif" font-size="32" opacity="0.86">Co-founder of Candel Medical</text><text x="84" y="528" font-family="Arial, sans-serif" font-size="28" opacity="0.7">sebastianmuena.com</text></g></svg>`;
}

function renderMediaText(lang) {
  const page = site.pages.media;

  return [
    site.person.fullName,
    site.person.role[lang],
    '',
    lang === 'es' ? 'BIOGRAFIA CORTA' : 'SHORT BIO',
    page.bios.short[lang],
    '',
    lang === 'es' ? 'BIOGRAFIA EXTENDIDA' : 'EXTENDED BIO',
    page.bios.long[lang],
    '',
    lang === 'es' ? 'TEMAS' : 'TOPICS',
    ...page.topics.map((item) => `- ${item.title[lang]}: ${item.body[lang]}`),
    '',
    lang === 'es' ? 'ENLACES' : 'LINKS',
    `- Website: ${site.url}`,
    `- LinkedIn: ${site.links.linkedin}`,
    `- Substack: ${site.links.substack}`,
    `- Candel Medical: ${site.links.candel}`,
    ''
  ].join('\n');
}

function renderVCard() {
  return [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${site.person.fullName}`,
    `N:Muena;Sebastián;;;`,
    `TITLE:${site.person.role.en}`,
    'ORG:Candel Medical',
    `URL:${site.url}`,
    `URL:${site.links.linkedin}`,
    `URL:${site.links.substack}`,
    'NOTE:Healthtech, operations, strategy, and execution in Chile and Latin America.',
    'END:VCARD',
    ''
  ].join('\n');
}

async function writePage(relativePath, content) {
  const outputPath = path.join(rootDir, relativePath.replace(/^\//, ''));
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, content, 'utf8');
}

async function main() {
  await mkdir(path.join(rootDir, 'assets', 'js'), { recursive: true });
  await mkdir(path.join(rootDir, 'assets', 'css'), { recursive: true });
  await mkdir(path.join(rootDir, 'assets', 'media'), { recursive: true });
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
      description: 'Página no encontrada en sebastianmuena.com.',
      canonical: absoluteUrl('/404.html'),
      noindex: true,
      showAlternates: false
    })
  );
  await writePage('/sitemap.xml', renderSitemap());
  await writePage('/robots.txt', renderRobots());
  await writePage('/images/favicon.svg', renderFaviconSvg());
  await writePage('/images/og-cover.svg', renderOgSvg());
  await writePage(mediaDownloads.es, renderMediaText('es'));
  await writePage(mediaDownloads.en, renderMediaText('en'));
  await writePage(mediaDownloads.vcf, renderVCard());

  await copyFile(
    path.join(rootDir, 'src', 'scripts', 'site.js'),
    path.join(rootDir, 'assets', 'js', 'site.js')
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
