// =============================================
// Toggle bilingüe ES / EN
// Uso: agregar data-es="..." data-en="..." a cualquier elemento
// =============================================

(function () {
  let lang = localStorage.getItem('lang') || 'es';

  function applyLang() {
    document.querySelectorAll('[data-es]').forEach(function (el) {
      // Si tiene hijos de tipo elemento, no tocar (puede romper links/íconos)
      if (el.children.length === 0) {
        el.textContent = lang === 'es' ? el.dataset.es : el.dataset.en;
      } else {
        // Para elementos con hijos (ej: <a> con íconos), usar innerHTML parcial
        // Solo actualiza si tiene data-html-es/data-html-en
        if (el.dataset.htmlEs) {
          el.innerHTML = lang === 'es' ? el.dataset.htmlEs : el.dataset.htmlEn;
        }
      }
    });

    // Actualizar placeholder de inputs
    document.querySelectorAll('[data-placeholder-es]').forEach(function (el) {
      el.placeholder = lang === 'es' ? el.dataset.placeholderEs : el.dataset.placeholderEn;
    });

    // Actualizar botón toggle
    const btn = document.getElementById('lang-toggle');
    if (btn) btn.textContent = lang === 'es' ? 'EN' : 'ES';

    // Actualizar atributo lang del html
    document.documentElement.lang = lang === 'es' ? 'es' : 'en';
  }

  window.toggleLang = function () {
    lang = lang === 'es' ? 'en' : 'es';
    localStorage.setItem('lang', lang);
    applyLang();
  };

  // Aplicar al cargar la página
  document.addEventListener('DOMContentLoaded', applyLang);
})();
