import { mkdir, writeFile, copyFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { site } from '../src/site-data.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const pageOrder = ['home', 'about', 'projects', 'blog'];

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
  pen: '<path d="m4.5 19.5 3.6-.85L19 7.75l-2.75-2.75L5.35 15.9 4.5 19.5Z"/><path d="m13.75 6.5 2.75 2.75"/>'
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
    knowsAbout: ['healthtech', 'medical devices', 'operations', 'strategy', 'finance'],
    sameAs: [site.links.linkedin, site.links.github, site.links.substack, site.links.candel]
  };
}

function pageSummaryCard(pageKey, lang) {
  if (pageKey === 'home') {
    return `
      <div class="mini-card">
        <strong>${escapeHtml(site.person.role[lang])}</strong>
        <p>${escapeHtml(site.person.tagline[lang])}</p>
      </div>
      <div class="mini-card">
        <strong>${lang === 'es' ? 'Base de operaciones' : 'Operating context'}</strong>
        <p>${lang === 'es' ? 'Construyendo desde Chile para Latinoamérica.' : 'Building from Chile for Latin America.'}</p>
      </div>
    `;
  }

  if (pageKey === 'about') {
    return `
      <div class="mini-card">
        <strong>${lang === 'es' ? 'Areas de trabajo' : 'Focus areas'}</strong>
        <p>${lang === 'es' ? 'Healthtech, operaciones, estrategia y crecimiento.' : 'Healthtech, operations, strategy, and growth.'}</p>
      </div>
      <div class="mini-card">
        <strong>${lang === 'es' ? 'Lectura complementaria' : 'Keep exploring'}</strong>
        <p>${lang === 'es' ? 'También puedes revisar proyectos y textos publicados.' : 'You can also explore projects and published writing.'}</p>
      </div>
    `;
  }

  if (pageKey === 'projects') {
    return `
      <div class="mini-card">
        <strong>${lang === 'es' ? 'Criterio de seleccion' : 'Selection criteria'}</strong>
        <p>${lang === 'es' ? 'Solo muestro frentes que representen bien el tipo de trabajo que me interesa construir.' : 'I only show workstreams that represent the type of work I care about building.'}</p>
      </div>
      <div class="mini-card">
        <strong>${lang === 'es' ? 'Stack del sitio' : 'Site stack'}</strong>
        <p>${lang === 'es' ? 'Sitio estatico, contenido curado y despliegue simple.' : 'Static site, curated content, and simple deployment.'}</p>
      </div>
    `;
  }

  return `
    <div class="mini-card">
      <strong>${lang === 'es' ? 'Formato' : 'Format'}</strong>
      <p>${lang === 'es' ? 'Ensayos breves, observaciones y notas de trabajo.' : 'Short essays, observations, and working notes.'}</p>
    </div>
    <div class="mini-card">
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
    <header class="site-header" data-site-header data-menu-open="false">
      <div class="site-header__bar">
        <a class="site-brand" href="${publicHref('home', lang)}" aria-label="${lang === 'es' ? 'Ir al inicio' : 'Go to homepage'}">
          <span class="site-brand__mark">SM</span>
          <span>${escapeHtml(site.siteName)}</span>
        </a>
        <nav class="site-nav" aria-label="${lang === 'es' ? 'Navegación principal' : 'Primary navigation'}">
          <button class="site-nav__toggle" type="button" data-menu-toggle aria-expanded="false" aria-controls="site-nav-menu">
            ${lang === 'es' ? 'Abrir menu' : 'Open menu'}
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
        <div class="footer__meta">
          <a href="${site.links.repo}" target="_blank" rel="noopener noreferrer">${lang === 'es' ? 'Ver repositorio del sitio' : 'View site repository'}</a>
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
      (item) => `
        <div class="stat">
          <span class="stat__value">${escapeHtml(item.value)}</span>
          <span class="stat__label">${escapeHtml(item.label[lang])}</span>
        </div>
      `
    )
    .join('');

  const highlightCards = home.highlights
    .map(
      (item) => `
        <article class="card card--soft">
          <div class="card__icon">${icon(item.icon)}</div>
          <h3 class="card__title">${escapeHtml(item.title[lang])}</h3>
          <p class="card__body">${escapeHtml(item.body[lang])}</p>
        </article>
      `
    )
    .join('');

  const experience = home.experience
    .map((item) => {
      const organization = item.href
        ? `<a class="timeline__org" href="${item.href}" target="_blank" rel="noopener noreferrer">${escapeHtml(item.organization)}</a>`
        : `<div class="timeline__org">${escapeHtml(item.organization)}</div>`;

      return `
        <article class="timeline__item">
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
      (item) => `
        <article class="card">
          <div class="card__icon">${icon(item.icon)}</div>
          <h3 class="card__title">${escapeHtml(item.title)}</h3>
          <p class="card__body">${escapeHtml(item.body[lang])}</p>
        </article>
      `
    )
    .join('');

  return `
    <main id="main" class="page">
      <section class="hero">
        <div class="hero__copy">
          <div class="eyebrow">${escapeHtml(home.hero.eyebrow[lang])}</div>
          <h1>${escapeHtml(home.hero.title[lang])}</h1>
          <p class="lead">${escapeHtml(home.hero.summary[lang])}</p>
          <div class="hero__actions">
            <a class="button" href="${publicHref('about', lang)}">${lang === 'es' ? 'Conoce mi recorrido' : 'Explore my background'} ${icon('arrow')}</a>
            <a class="button--secondary" href="${publicHref('projects', lang)}">${lang === 'es' ? 'Ver proyectos' : 'View projects'}</a>
            <a class="button--ghost" href="#contact">${lang === 'es' ? 'Escribir mensaje' : 'Start a conversation'}</a>
          </div>
          <div class="hero__stats">
            ${stats}
          </div>
          ${renderSocialLinks(lang)}
        </div>
        <div class="hero__visual">
          <div class="portrait">
            <img src="${site.person.image}" alt="${lang === 'es' ? 'Retrato de Sebastián Muena' : 'Portrait of Sebastián Muena'}" width="1200" height="1500" fetchpriority="high" />
            <div class="portrait__note">
              <strong>${escapeHtml(site.person.role[lang])}</strong>
              <span>${escapeHtml(site.person.tagline[lang])}</span>
            </div>
          </div>
        </div>
      </section>

      <section class="section" aria-labelledby="highlights-title">
        <div class="section__header">
          <div>
            <div class="section__eyebrow">${lang === 'es' ? 'Enfoque' : 'Focus'}</div>
            <h2 id="highlights-title">${lang === 'es' ? 'Donde concentro energia y criterio.' : 'Where I focus energy and judgment.'}</h2>
          </div>
          <p class="section__description">${lang === 'es' ? 'Mi trabajo combina operacion, estrategia y una lectura muy concreta del contexto latinoamericano.' : 'My work combines operations, strategy, and a grounded reading of the Latin American context.'}</p>
        </div>
        <div class="grid grid--3">
          ${highlightCards}
        </div>
      </section>

      <section class="section" aria-labelledby="experience-title">
        <div class="section__header">
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
        <div class="section__header">
          <div>
            <div class="section__eyebrow">${lang === 'es' ? 'Reconocimientos' : 'Recognition'}</div>
            <h2 id="recognition-title">${lang === 'es' ? 'Validacion externa del trabajo en marcha.' : 'External validation for the work in motion.'}</h2>
          </div>
          <p class="section__description">${lang === 'es' ? 'Premios, programas y apoyos que han acompañado el desarrollo de Candel Medical.' : 'Awards, programs, and support that have accompanied the development of Candel Medical.'}</p>
        </div>
        <div class="grid grid--3">
          ${recognition}
        </div>
      </section>

      <section class="section" id="contact" aria-labelledby="contact-title">
        <div class="section__header">
          <div>
            <div class="section__eyebrow">${lang === 'es' ? 'Contacto' : 'Contact'}</div>
            <h2 id="contact-title">${escapeHtml(home.contact.heading[lang])}</h2>
          </div>
          <p class="section__description">${escapeHtml(home.contact.body[lang])}</p>
        </div>
        <div class="form-card">
          <div class="surface-panel">
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
          <div class="surface-panel stack">
            <div class="callout">
              <p>${escapeHtml(home.contact.note[lang])}</p>
            </div>
            <div>
              <h3>${lang === 'es' ? 'Canales principales' : 'Primary channels'}</h3>
              <div class="stack stack--top">
                <a class="icon-link" href="${site.links.linkedin}" target="_blank" rel="noopener noreferrer">${icon('linkedin')} LinkedIn</a>
                <a class="icon-link" href="${site.links.substack}" target="_blank" rel="noopener noreferrer">${icon('substack')} Substack</a>
                <a class="icon-link" href="${site.links.github}" target="_blank" rel="noopener noreferrer">${icon('github')} GitHub</a>
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
      (item) => `
        <article class="card card--soft">
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
          <div class="page-heading__copy">
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
          <div class="surface-panel prose">
            <h2 id="about-intro-title">${lang === 'es' ? 'Contexto' : 'Context'}</h2>
            ${introParagraphs}
          </div>
          <div class="surface-panel">
            <h2>${lang === 'es' ? 'Enlaces clave' : 'Key links'}</h2>
            <div class="stack stack--top">
              <a class="icon-link" href="${site.links.candel}" target="_blank" rel="noopener noreferrer">${icon('hospital')} Candel Medical</a>
              <a class="icon-link" href="${site.links.linkedin}" target="_blank" rel="noopener noreferrer">${icon('linkedin')} LinkedIn</a>
              <a class="icon-link" href="${site.links.substack}" target="_blank" rel="noopener noreferrer">${icon('substack')} Substack</a>
            </div>
          </div>
        </div>
      </section>

      <section class="section" aria-labelledby="pillars-title">
        <div class="section__header">
          <div>
            <div class="section__eyebrow">${lang === 'es' ? 'Pilares' : 'Pillars'}</div>
            <h2 id="pillars-title">${lang === 'es' ? 'Tres ejes que organizan mi trabajo.' : 'Three pillars that organize my work.'}</h2>
          </div>
          <p class="section__description">${lang === 'es' ? 'Mas que una lista de cargos, esto resume donde intento aportar mayor valor.' : 'More than a list of titles, this describes where I try to create the most value.'}</p>
        </div>
        <div class="grid grid--3">
          ${pillarCards}
        </div>
      </section>

      <section class="section" aria-labelledby="principles-title">
        <div class="section__header">
          <div>
            <div class="section__eyebrow">${lang === 'es' ? 'Forma de trabajo' : 'Working style'}</div>
            <h2 id="principles-title">${escapeHtml(page.principles.heading[lang])}</h2>
          </div>
          <p class="section__description">${lang === 'es' ? 'Principios simples para sostener foco y calidad de ejecución.' : 'Simple principles to sustain focus and execution quality.'}</p>
        </div>
        <div class="surface-panel">
          <div class="feature-list">
            ${principles}
          </div>
        </div>
      </section>

      <section class="section" aria-labelledby="outside-work-title">
        <div class="details-card">
          <summary>${escapeHtml(page.note.heading[lang])}</summary>
          <div class="details-card__content">
            <p class="muted" id="outside-work-title">${escapeHtml(page.note.summary[lang])}</p>
          </div>
        </div>
      </section>
    </main>
  `;
}

function renderProjects(lang) {
  const page = site.pages.projects;

  const featured = page.featured
    .map((item) => {
      const title = typeof item.title === 'string' ? item.title : item.title[lang];
      const titleMarkup = item.href
        ? `<a href="${item.href}" target="_blank" rel="noopener noreferrer">${escapeHtml(title)}</a>`
        : escapeHtml(title);

      const tags = item.tags[lang]
        .map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`)
        .join('');

      return `
        <article class="card">
          <div class="card__icon">${icon(item.icon)}</div>
          <h2 class="card__title">${titleMarkup}</h2>
          <p class="card__body">${escapeHtml(item.body[lang])}</p>
          <div class="card__tags">${tags}</div>
        </article>
      `;
    })
    .join('');

  const selection = page.selection.items
    .map(
      (item) => `
        <article class="card card--soft">
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
          <div class="page-heading__copy">
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
        <div class="section__header">
          <div>
            <div class="section__eyebrow">${lang === 'es' ? 'Selección principal' : 'Featured selection'}</div>
            <h2 id="featured-projects-title">${lang === 'es' ? 'Tres proyectos, tres formas de construir.' : 'Three projects, three ways of building.'}</h2>
          </div>
          <p class="section__description">${lang === 'es' ? 'La idea no es mostrar cantidad, sino dejar claro que tipo de problemas me interesa resolver.' : 'The goal is not volume, but clarity around the type of problems I want to solve.'}</p>
        </div>
        <div class="grid grid--3">
          ${featured}
        </div>
      </section>

      <section class="section" aria-labelledby="follow-work-title">
        <div class="section__header">
          <div>
            <div class="section__eyebrow">${lang === 'es' ? 'Canales' : 'Channels'}</div>
            <h2 id="follow-work-title">${escapeHtml(page.selection.heading[lang])}</h2>
          </div>
          <p class="section__description">${lang === 'es' ? 'Si quieres seguir el trabajo, estos son los puntos mas utiles.' : 'If you want to follow the work, these are the most useful places to start.'}</p>
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
      (item) => `
        <article class="card">
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
      (item) => `
        <article class="card card--soft">
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
          <div class="page-heading__copy">
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
        <div class="section__header">
          <div>
            <div class="section__eyebrow">${lang === 'es' ? 'Ultimo texto' : 'Latest essay'}</div>
            <h2 id="latest-post-title">${lang === 'es' ? 'Lo mas reciente publicado.' : 'The most recent piece published.'}</h2>
          </div>
          <p class="section__description">${lang === 'es' ? 'La mayor parte de la escritura vive en Substack, donde mantengo la publicación principal.' : 'Most writing lives on Substack, where I keep the main publication.'}</p>
        </div>
        <div class="grid grid--2">
          ${posts}
          <div class="surface-panel stack">
            <div class="callout">
              <h2>${escapeHtml(page.cta.heading[lang])}</h2>
              <p>${escapeHtml(page.cta.body[lang])}</p>
            </div>
            <div class="section-actions">
              <a class="button" href="${site.links.substack}" target="_blank" rel="noopener noreferrer">${lang === 'es' ? 'Ir a Substack' : 'Visit Substack'} ${icon('arrow')}</a>
              <a class="button--ghost" href="${site.links.linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
          </div>
        </div>
      </section>

      <section class="section" aria-labelledby="topics-title">
        <div class="section__header">
          <div>
            <div class="section__eyebrow">${lang === 'es' ? 'Temas' : 'Topics'}</div>
            <h2 id="topics-title">${lang === 'es' ? 'Las conversaciones que me interesa sostener.' : 'The conversations I want to keep having.'}</h2>
          </div>
          <p class="section__description">${lang === 'es' ? 'Temas recurrentes en la escritura y en las notas que seguiran apareciendo.' : 'Recurring themes in the essays and notes I plan to keep publishing.'}</p>
        </div>
        <div class="grid grid--3">
          ${topics}
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
          <div class="page-heading__copy">
            <div class="section__eyebrow">404</div>
            <h1>${lang === 'es' ? 'Esta página no existe o cambió de lugar.' : 'This page does not exist or has moved.'}</h1>
            <p class="lead">${lang === 'es' ? 'Puedes volver al inicio y seguir navegando desde ahi.' : 'You can return to the homepage and continue from there.'}</p>
            <div class="hero__actions">
              <a class="button" href="${publicHref('home', lang)}">${lang === 'es' ? 'Volver al inicio' : 'Back to home'} ${icon('arrow')}</a>
            </div>
          </div>
          <div class="page-heading__side">
            <div class="mini-card">
              <strong>${lang === 'es' ? 'Sugerencia' : 'Tip'}</strong>
              <p>${lang === 'es' ? 'Si venías por una página en inglés, prueba la versión /en/ del sitio.' : 'If you were looking for an English page, try the /en/ version of the site.'}</p>
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
  const alternateLang = lang === 'es' ? 'en' : 'es';
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
  return renderLayout(pageKey, lang, renderBlog(lang));
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
      description: 'Pagina no encontrada en sebastianmuena.com.',
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
