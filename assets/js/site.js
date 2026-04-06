const translations = {
  es: {
    menuOpen: 'Abrir menu',
    menuClose: 'Cerrar menu',
    sending: 'Enviando mensaje...',
    success: 'Gracias. Tu mensaje fue enviado correctamente.',
    error: 'No fue posible enviar el mensaje. Intenta nuevamente en unos minutos.',
    invalid: 'Por favor completa nombre, email y mensaje antes de enviar.'
  },
  en: {
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    sending: 'Sending message...',
    success: 'Thanks. Your message was sent successfully.',
    error: 'Your message could not be sent. Please try again in a few minutes.',
    invalid: 'Please fill in your name, email, and message before sending.'
  }
};

const lang = document.documentElement.lang.startsWith('en') ? 'en' : 'es';

function setupNavigation() {
  const header = document.querySelector('[data-site-header]');
  const menu = document.querySelector('[data-nav-menu]');
  const toggle = document.querySelector('[data-menu-toggle]');

  if (!header || !menu || !toggle) return;

  const setExpanded = (expanded) => {
    toggle.setAttribute('aria-expanded', String(expanded));
    header.dataset.menuOpen = String(expanded);
    toggle.textContent = expanded ? translations[lang].menuClose : translations[lang].menuOpen;
  };

  setExpanded(false);

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    setExpanded(!expanded);
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setExpanded(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      setExpanded(false);
    }
  });
}

function setupContactForm() {
  const form = document.querySelector('[data-contact-form]');
  if (!form) return;

  const status = form.querySelector('[data-form-status]');
  const submit = form.querySelector('[data-form-submit]');

  const setStatus = (message, state) => {
    status.textContent = message;
    status.dataset.state = state;
    status.hidden = false;
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const payload = {
      nombre: String(formData.get('nombre') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      asunto: String(formData.get('asunto') || '').trim(),
      mensaje: String(formData.get('mensaje') || '').trim()
    };

    if (!payload.nombre || !payload.email || !payload.mensaje) {
      setStatus(translations[lang].invalid, 'error');
      return;
    }

    submit.disabled = true;
    setStatus(translations[lang].sending, 'info');

    try {
      const response = await fetch(form.action, {
        method: form.method,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Formspree request failed');
      }

      form.reset();
      setStatus(translations[lang].success, 'success');
    } catch (error) {
      setStatus(translations[lang].error, 'error');
    } finally {
      submit.disabled = false;
    }
  });
}

setupNavigation();
setupContactForm();

