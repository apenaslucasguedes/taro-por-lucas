(() => {
  const config = window.TARO_CONFIG || {};
  const phone = String(config.whatsapp || '').replace(/\D/g, '');
  const ready = /^\d{10,15}$/.test(phone);
  const names = { direta: 'pergunta direta', aprofundada: 'pergunta aprofundada', completa: 'situação completa' };
  const prices = { direta: 25, aprofundada: 40, completa: 50, ...config.prices };
  const dialog = document.querySelector('#contact-dialog');
  const question = document.querySelector('#question');
  const send = document.querySelector('#send-contact');
  let selected = '';
  document.querySelector('#year').textContent = new Date().getFullYear();
  document.querySelectorAll('[data-price]').forEach(el => { el.textContent = prices[el.dataset.price].toLocaleString('pt-BR'); });
  if (ready) document.querySelector('#contact-status').textContent = 'consulte a disponibilidade e combine sua leitura comigo.';
  else document.querySelector('#contact-button').textContent = 'prepare sua pergunta';
  function openContact(reading = '') {
    selected = reading;
    document.querySelector('#selected-reading').textContent = reading ? `${names[reading]} · R$ ${prices[reading].toLocaleString('pt-BR')}` : 'se ainda não sabe qual leitura escolher, podemos conversar sobre isso.';
    document.querySelector('#dialog-note').textContent = ready ? 'você poderá revisar a mensagem no WhatsApp antes de enviar.' : 'a agenda está em preparação e o WhatsApp ainda não está disponível. você pode copiar sua pergunta para guardar. este site não envia nem armazena o texto.';
    send.textContent = ready ? 'abrir conversa no WhatsApp' : 'copiar minha pergunta';
    dialog.showModal();
  }
  document.querySelectorAll('.choose').forEach(el => el.addEventListener('click', () => openContact(el.dataset.reading)));
  document.querySelector('#contact-button').addEventListener('click', () => openContact());
  document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
  send.addEventListener('click', async () => {
    const message = `oi, lucas! ${selected ? `tenho interesse na leitura ${names[selected]} (R$ ${prices[selected]}).` : 'gostaria de saber mais sobre suas leituras.'}${question.value.trim() ? `\n\nminha pergunta: ${question.value.trim()}` : ''}`;
    if (ready) { window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer'); return; }
    try { await navigator.clipboard.writeText(message); send.textContent = 'pergunta copiada'; }
    catch { question.value = message; question.focus(); question.select(); document.querySelector('#dialog-note').textContent = 'selecione e copie o texto acima para guardar sua pergunta.'; }
  });

  // Animate only decorative stars while the scene is visible. No continuous loop.
  const scene = document.querySelector('[data-parallax-scene]');
  const layers = scene ? [...scene.querySelectorAll('[data-depth]')] : [];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let visible = false;
  let frame = 0;
  function renderLayers() {
    frame = 0;
    if (!visible || reducedMotion.matches) return;
    const progress = Math.min(360, Math.max(0, -scene.getBoundingClientRect().top));
    layers.forEach(layer => {
      layer.style.setProperty('--parallax-y', `${(progress * Number(layer.dataset.depth)).toFixed(2)}px`);
    });
  }
  function requestFrame() {
    if (!frame && visible && !reducedMotion.matches) frame = requestAnimationFrame(renderLayers);
  }
  function syncMotion() {
    window.removeEventListener('scroll', requestFrame);
    window.removeEventListener('resize', requestFrame);
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    if (reducedMotion.matches) layers.forEach(layer => layer.style.removeProperty('--parallax-y'));
    if (visible && !reducedMotion.matches) {
      window.addEventListener('scroll', requestFrame, { passive: true });
      window.addEventListener('resize', requestFrame, { passive: true });
      requestFrame();
    }
  }
  if (scene && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      syncMotion();
    });
    observer.observe(scene);
    reducedMotion.addEventListener('change', syncMotion);
  }
})();
