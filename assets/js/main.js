const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
const navDropdownItems = Array.from(document.querySelectorAll('.site-nav__item'));

const closeMainMenu = () => {
  if (!menuButton || !nav) return;
  nav.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
};

const closeAllDropdowns = () => {
  navDropdownItems.forEach((item) => {
    item.classList.remove('is-open');
    const trigger = item.querySelector('.site-nav__dropdown-trigger');
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
  });
};

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    if (!isOpen) closeAllDropdowns();
  });
}

const mobileDropdownQuery = window.matchMedia('(max-width: 980px)');

navDropdownItems.forEach((item) => {
  const trigger = item.querySelector('.site-nav__dropdown-trigger');
  if (!trigger) return;

  const onMobileTriggerClick = (event) => {
    event.preventDefault();
    const wasOpen = item.classList.contains('is-open');
    closeAllDropdowns();
    if (!wasOpen) {
      item.classList.add('is-open');
      trigger.setAttribute('aria-expanded', 'true');
    }
  };

  const syncDropdownMode = () => {
    if (mobileDropdownQuery.matches) {
      trigger.addEventListener('click', onMobileTriggerClick);
    } else {
      trigger.removeEventListener('click', onMobileTriggerClick);
      item.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
    }
  };

  item.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      closeAllDropdowns();
      closeMainMenu();
    });
  });

  syncDropdownMode();
  mobileDropdownQuery.addEventListener('change', syncDropdownMode);
});

document.addEventListener('click', (event) => {
  if (nav && menuButton && nav.contains(event.target)) return;
  if (!navDropdownItems.some((item) => item.contains(event.target))) {
    closeAllDropdowns();
  }
});

mobileDropdownQuery.addEventListener('change', () => {
  if (!mobileDropdownQuery.matches) closeMainMenu();
});

window.addEventListener('resize', () => {
  if (window.matchMedia('(min-width: 981px)').matches) closeMainMenu();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeMainMenu();
    closeAllDropdowns();
  }
});

// Animated counters for KPIs in 'Nossos Números'
document.addEventListener('DOMContentLoaded', () => {
  const kpiEls = document.querySelectorAll('.kpi-value');
  if (!kpiEls || kpiEls.length === 0) return;

  const animateNumber = (el, target) => {
    const duration = 1400;
    const startTime = performance.now();
    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.floor(progress * target);
      el.textContent = value.toLocaleString('pt-BR');
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString('pt-BR');
    };
    requestAnimationFrame(step);
  };

  const onEntry = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        if (!el.dataset.animated) {
          const target = parseInt(el.getAttribute('data-target'), 10) || 0;
          animateNumber(el, target);
          el.dataset.animated = 'true';
        }
        observer.unobserve(el);
      }
    });
  };

  const io = new IntersectionObserver(onEntry, { threshold: 0.35 });
  kpiEls.forEach((el) => io.observe(el));
});

// Simple carousel behavior (no external libs)
document.addEventListener('DOMContentLoaded', () => {
  const carousels = document.querySelectorAll('[data-carousel]');
  carousels.forEach((carousel) => {
    const track = carousel.querySelector('.carousel__track');
    const slides = Array.from(track.children);
    const prevBtn = carousel.querySelector('[data-carousel-button="prev"]');
    const nextBtn = carousel.querySelector('[data-carousel-button="next"]');
    const indicators = Array.from(carousel.querySelectorAll('.carousel__indicator'));
    let currentIndex = slides.findIndex(s => s.classList.contains('current-slide')) || 0;

    const update = (index) => {
      const container = carousel.querySelector('.carousel__track-container');
      const slideWidth = container.getBoundingClientRect().width;
      track.style.transform = `translateX(-${index * slideWidth}px)`;
      slides.forEach((s, i) => s.classList.toggle('current-slide', i === index));
      indicators.forEach((ind, i) => ind.classList.toggle('current-indicator', i === index));
      currentIndex = index;
    };

    // wrap-enabled prev/next and autoplay support
    const autoplayInterval = 5000;
    let autoplayTimer = null;

    const startAutoplay = () => {
      if (autoplayTimer) clearInterval(autoplayTimer);
      autoplayTimer = setInterval(() => {
        update((currentIndex + 1) % slides.length);
      }, autoplayInterval);
    };

    const stopAutoplay = () => {
      if (autoplayTimer) { clearInterval(autoplayTimer); autoplayTimer = null; }
    };

    prevBtn.addEventListener('click', () => {
      stopAutoplay();
      update((currentIndex - 1 + slides.length) % slides.length);
      setTimeout(startAutoplay, autoplayInterval);
    });

    nextBtn.addEventListener('click', () => {
      stopAutoplay();
      update((currentIndex + 1) % slides.length);
      setTimeout(startAutoplay, autoplayInterval);
    });

    indicators.forEach((btn, i) => btn.addEventListener('click', () => { stopAutoplay(); update(i); setTimeout(startAutoplay, autoplayInterval); }));

    // touch support (drag to navigate)
    let startX = 0; let isDragging = false;
    track.addEventListener('pointerdown', (e) => { startX = e.clientX; isDragging = true; track.style.transition = 'none'; stopAutoplay(); });
    window.addEventListener('pointerup', (e) => {
      if (!isDragging) return; isDragging = false; track.style.transition = '';
      const diff = startX - e.clientX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) update((currentIndex + 1) % slides.length);
        else update((currentIndex - 1 + slides.length) % slides.length);
      }
      setTimeout(startAutoplay, autoplayInterval);
    });

    // initial layout + start autoplay
    window.addEventListener('load', () => { update(currentIndex); startAutoplay(); });
    window.addEventListener('resize', () => update(currentIndex));
  });
});

// People tree modal behavior
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.querySelector('[data-pessoa-modal]');
  if (!modal) return;

  const closeButton = modal.querySelector('.people-modal__close');
  const nodes = document.querySelectorAll('.people-node[data-nome]');
  const nomeEl = document.getElementById('pessoa-modal-nome');
  const vinculoEl = document.getElementById('pessoa-modal-vinculo');
  const pesquisaEl = document.getElementById('pessoa-modal-pesquisa');
  const concentracaoEl = document.getElementById('pessoa-modal-concentracao');
  const fotoEl = document.getElementById('pessoa-modal-foto');
  const projetoEl = document.getElementById('pessoa-modal-projeto');
  const linkedinEl = document.getElementById('pessoa-modal-linkedin');
  const lattesEl = document.getElementById('pessoa-modal-lattes');
  const orcidEl = document.getElementById('pessoa-modal-orcid');

  const slugify = (value) =>
    String(value || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

  const hashString = (value) => {
    let hash = 0;
    for (let i = 0; i < value.length; i += 1) {
      hash = (hash << 5) - hash + value.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  };

  const inferGender = (node) => {
    const vinculo = String(node.dataset.vinculo || '').toLowerCase();
    const nome = String(node.dataset.nome || '').toLowerCase();

    if (
      vinculo.includes('doutoranda')
      || vinculo.includes('mestranda')
      || vinculo.includes('egressa')
      || nome.includes('profa')
      || nome.includes('dra.')
    ) {
      return 'female';
    }

    if (
      vinculo.includes('doutorando')
      || vinculo.includes('mestrando')
      || vinculo.includes('egresso')
      || nome.includes('prof. dr.')
    ) {
      return 'male';
    }

    const firstName = nome.split(' ')[0] || '';
    if (firstName.endsWith('a')) {
      return 'female';
    }

    return 'male';
  };

  const getAvatarUrl = (node) => {
    if (node.dataset.foto) return node.dataset.foto;
    const nome = node.dataset.nome || 'trama-pessoa';
    const gender = inferGender(node);
    const portraitIndex = hashString(nome) % 100;
    const genderPath = gender === 'female' ? 'women' : 'men';
    return `https://randomuser.me/api/portraits/${genderPath}/${portraitIndex}.jpg`;
  };

  const getProjectImageUrl = (node) => {
    if (node.dataset.projetoImagem) return node.dataset.projetoImagem;
    return '../assets/images/imagem-fundo-inicial.png';
  };

  const getLinkedinUrl = (node) => {
    if (node.dataset.linkedin) return node.dataset.linkedin;
    return `https://www.linkedin.com/in/${slugify(node.dataset.nome || 'trama-pesquisador')}`;
  };

  const getLattesUrl = (node) => {
    if (node.dataset.lattes) return node.dataset.lattes;
    return `http://lattes.cnpq.br/${Math.floor(1000000000000000 + Math.random() * 9000000000000000)}`;
  };

  nodes.forEach((node) => {
    const avatar = node.querySelector('.people-avatar');
    if (!avatar) return;

    const initials = avatar.textContent.trim();
    const avatarUrl = getAvatarUrl(node);
    avatar.innerHTML = `<img src="${avatarUrl}" alt="Foto de ${node.dataset.nome || 'pesquisador'}" loading="lazy" />`;
    const img = avatar.querySelector('img');
    if (!img) return;
    img.addEventListener('error', () => {
      avatar.textContent = initials;
    });
  });

  const closeModal = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  };

  const openModal = (node) => {
    const nome = node.dataset.nome || 'Pessoa do laboratório';
    const avatarUrl = getAvatarUrl(node);
    const projectImageUrl = getProjectImageUrl(node);
    const linkedinUrl = getLinkedinUrl(node);
    const lattesUrl = getLattesUrl(node);

    nomeEl.textContent = nome;
    vinculoEl.textContent = node.dataset.vinculo || 'Vínculo';
    pesquisaEl.textContent = node.dataset.pesquisa || 'Sem informações de pesquisa.';
    concentracaoEl.textContent = node.dataset.concentracao || 'Sem áreas de concentração informadas.';

    if (fotoEl) {
      fotoEl.src = avatarUrl;
      fotoEl.alt = `Foto de ${nome}`;
      fotoEl.onerror = () => {
        fotoEl.src = '../assets/images/logo-trama.png';
      };
    }

    if (projetoEl) {
      projetoEl.src = projectImageUrl;
      projetoEl.alt = `Imagem de resumo de projeto de ${nome}`;
      projetoEl.onerror = () => {
        projetoEl.src = '../assets/images/imagem-fundo-inicial.png';
      };
    }

    if (linkedinEl) {
      linkedinEl.href = linkedinUrl;
    }

    if (lattesEl) {
      lattesEl.href = lattesUrl;
    }

    if (orcidEl) {
      const orcid = (node.dataset.orcid || '').trim();
      const isValid = orcid && orcid !== '0000-0000-0000-0000';
      if (isValid) {
        orcidEl.href = orcid.startsWith('http') ? orcid : `https://orcid.org/${orcid}`;
        orcidEl.hidden = false;
      } else {
        orcidEl.href = '#';
        orcidEl.hidden = true;
      }
    }

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  };

  nodes.forEach((node) => {
    node.addEventListener('click', () => {
      openModal(node);
    });
  });

  if (closeButton) {
    closeButton.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });
});

// Blog categories filter
document.addEventListener('DOMContentLoaded', () => {
  const featuredSlot = document.querySelector('[data-featured-slot]');
  const featuredCard = document.querySelector('.blog-card-link[data-featured="true"]');

  if (featuredSlot) {
    const showcaseSection = featuredSlot.closest('.blog-showcase');

    if (featuredCard) {
      const featuredImage = featuredCard.querySelector('img');
      const title = featuredCard.querySelector('h3');
      const summary = featuredCard.querySelector('.blog-card p:not(.blog-card__kicker)');
      const meta = featuredCard.querySelector('.blog-card__meta');
      const href = featuredCard.getAttribute('href') || '#';

      featuredSlot.innerHTML = `
        <a class="blog-featured-link" href="${href}" aria-label="Abrir publicação em destaque">
          <article class="blog-featured" aria-label="Publicação em destaque">
            <img src="${featuredImage?.getAttribute('src') || ''}" alt="${featuredImage?.getAttribute('alt') || ''}" />
            <div class="blog-featured__content">
              <span class="blog-pill">Destaque da semana</span>
              <h2>${title?.textContent || ''}</h2>
              <p>${summary?.textContent || ''}</p>
              <div class="blog-meta">
                ${meta ? meta.innerHTML : ''}
              </div>
            </div>
          </article>
        </a>
      `;
    } else if (showcaseSection) {
      showcaseSection.hidden = true;
    }
  }

  const filters = document.querySelectorAll('.blog-tag[data-filter]');
  const cards = document.querySelectorAll('.blog-card-link[data-category]');
  if (!filters.length || !cards.length) return;

  const applyFilter = (value) => {
    cards.forEach((card) => {
      const category = card.getAttribute('data-category');
      const shouldShow = value === 'todos' || category === value;
      card.hidden = !shouldShow;
    });

    filters.forEach((filter) => {
      filter.classList.toggle('is-active', filter.getAttribute('data-filter') === value);
    });
  };

  filters.forEach((filter) => {
    filter.addEventListener('click', () => {
      applyFilter(filter.getAttribute('data-filter') || 'todos');
    });
  });
});

// World map of partners (parceiros.html)
document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('[data-world-map]');
  if (!container) return;

  const src = container.dataset.worldMapSrc;
  const normalize = (s) => (s || '').toUpperCase().trim();
  const homeIso = normalize(container.dataset.home);
  const partnerIsos = (container.dataset.partners || '')
    .split(',')
    .map(normalize)
    .filter(Boolean);

  if (!src) return;

  const tooltip = container.querySelector('[data-world-tooltip]');

  fetch(src)
    .then((res) => {
      if (!res.ok) throw new Error('Falha ao carregar o mapa: ' + res.status);
      return res.text();
    })
    .then((svgText) => {
      const loading = container.querySelector('.world-map__loading');
      if (loading) loading.remove();
      // remove fills inline ("style=fill:#xxxxxx") para o CSS poder colorir os países
      svgText = svgText.replace(/style="fill:[^"]*"/g, '');
      container.insertAdjacentHTML('afterbegin', svgText);
      const svg = container.querySelector('svg');
      if (!svg) return;
      svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
      svg.removeAttribute('width');
      svg.removeAttribute('height');

      // viewBox inicial: foca no continente habitado, removendo Antártida
      const baseView = { x: 40, y: 70, w: 1920, h: 700 };
      let view = { ...baseView };
      const applyView = () => svg.setAttribute('viewBox', `${view.x} ${view.y} ${view.w} ${view.h}`);
      applyView();

      // controles de zoom
      const zoomIn = container.querySelector('[data-zoom="in"]');
      const zoomOut = container.querySelector('[data-zoom="out"]');
      const zoomReset = container.querySelector('[data-zoom="reset"]');
      const applyZoom = (factor) => {
        const cx = view.x + view.w / 2;
        const cy = view.y + view.h / 2;
        const newW = Math.max(300, Math.min(baseView.w * 1.2, view.w * factor));
        const newH = newW * (baseView.h / baseView.w);
        view = { x: cx - newW / 2, y: cy - newH / 2, w: newW, h: newH };
        applyView();
      };
      if (zoomIn) zoomIn.addEventListener('click', () => applyZoom(0.75));
      if (zoomOut) zoomOut.addEventListener('click', () => applyZoom(1 / 0.75));
      if (zoomReset) zoomReset.addEventListener('click', () => { view = { ...baseView }; applyView(); });

      // pan (arrastar com o mouse / dedo)
      let panning = false;
      let panStart = { x: 0, y: 0, viewX: 0, viewY: 0 };
      const onPanStart = (e) => {
        panning = true;
        svg.classList.add('is-panning');
        const point = e.touches ? e.touches[0] : e;
        panStart.x = point.clientX;
        panStart.y = point.clientY;
        panStart.viewX = view.x;
        panStart.viewY = view.y;
      };
      const onPanMove = (e) => {
        if (!panning) return;
        const point = e.touches ? e.touches[0] : e;
        const rect = svg.getBoundingClientRect();
        const scaleX = view.w / rect.width;
        const scaleY = view.h / rect.height;
        view.x = panStart.viewX - (point.clientX - panStart.x) * scaleX;
        view.y = panStart.viewY - (point.clientY - panStart.y) * scaleY;
        applyView();
      };
      const onPanEnd = () => {
        panning = false;
        svg.classList.remove('is-panning');
      };
      svg.addEventListener('mousedown', onPanStart);
      window.addEventListener('mousemove', onPanMove);
      window.addEventListener('mouseup', onPanEnd);
      svg.addEventListener('touchstart', onPanStart, { passive: true });
      svg.addEventListener('touchmove', onPanMove, { passive: true });
      svg.addEventListener('touchend', onPanEnd);

      // zoom com a roda do mouse
      svg.addEventListener('wheel', (e) => {
        e.preventDefault();
        applyZoom(e.deltaY < 0 ? 0.85 : 1 / 0.85);
      }, { passive: false });

      const SVG_NS = 'http://www.w3.org/2000/svg';
      const XLINK_NS = 'http://www.w3.org/1999/xlink';

      const addFlag = (iso, isHome) => {
        const els = svg.querySelectorAll('[id="' + iso + '"]');
        if (!els.length) return;
        // pick the largest path (mainland) as anchor
        let main = els[0];
        let maxArea = 0;
        els.forEach((el) => {
          if (typeof el.getBBox !== 'function') return;
          const bb = el.getBBox();
          const area = bb.width * bb.height;
          if (area > maxArea) { main = el; maxArea = area; }
        });
        if (typeof main.getBBox !== 'function') return;
        const bb = main.getBBox();
        const w = isHome ? 22 : 18;
        const h = w * 3 / 4;
        const cx = bb.x + bb.width / 2;
        const cy = bb.y + bb.height / 2;
        const img = document.createElementNS(SVG_NS, 'image');
        img.setAttributeNS(XLINK_NS, 'href', 'https://flagcdn.com/' + iso.toLowerCase() + '.svg');
        img.setAttribute('href', 'https://flagcdn.com/' + iso.toLowerCase() + '.svg');
        img.setAttribute('x', cx - w / 2);
        img.setAttribute('y', cy - h / 2);
        img.setAttribute('width', w);
        img.setAttribute('height', h);
        img.setAttribute('class', isHome ? 'world-flag world-flag--home' : 'world-flag');
        img.setAttribute('pointer-events', 'none');
        svg.appendChild(img);
      };

      const markCountry = (iso, cls, isHome) => {
        if (!iso) return;
        svg.querySelectorAll('[id="' + iso + '"]').forEach((el) => el.classList.add(cls));
        addFlag(iso, isHome);
      };

      partnerIsos.forEach((iso) => markCountry(iso, 'is-partner', false));
      markCountry(homeIso, 'is-home', true);

      if (!tooltip) return;

      const showTooltip = (event, name) => {
        if (!name) return;
        tooltip.textContent = name;
        tooltip.classList.add('is-visible');
        const rect = container.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        tooltip.style.left = x + 'px';
        tooltip.style.top = y + 'px';
      };

      const hideTooltip = () => tooltip.classList.remove('is-visible');

      const ptNames = {
        AF:'Afeganistão',AL:'Albânia',DZ:'Argélia',AS:'Samoa Americana',AD:'Andorra',AO:'Angola',
        AI:'Anguila',AQ:'Antártida',AG:'Antígua e Barbuda',AR:'Argentina',AM:'Armênia',AW:'Aruba',
        AU:'Austrália',AT:'Áustria',AZ:'Azerbaijão',BS:'Bahamas',BH:'Bahrein',BD:'Bangladesh',
        BB:'Barbados',BY:'Bielorrússia',BE:'Bélgica',BZ:'Belize',BJ:'Benim',BM:'Bermudas',
        BT:'Butão',BO:'Bolívia',BA:'Bósnia e Herzegovina',BW:'Botsuana',BR:'Brasil',
        IO:'Território Britânico do Oceano Índico',VG:'Ilhas Virgens Britânicas',BN:'Brunei',
        BG:'Bulgária',BF:'Burkina Faso',BI:'Burundi',KH:'Camboja',CM:'Camarões',CA:'Canadá',
        CV:'Cabo Verde',KY:'Ilhas Cayman',CF:'República Centro-Africana',TD:'Chade',CL:'Chile',
        CN:'China',CX:'Ilha Christmas',CC:'Ilhas Cocos',CO:'Colômbia',KM:'Comores',CK:'Ilhas Cook',
        CR:'Costa Rica',HR:'Croácia',CU:'Cuba',CW:'Curaçao',CY:'Chipre',CZ:'Tchéquia',
        CD:'República Democrática do Congo',DK:'Dinamarca',DJ:'Djibuti',DM:'Dominica',
        DO:'República Dominicana',TL:'Timor-Leste',EC:'Equador',EG:'Egito',SV:'El Salvador',
        GQ:'Guiné Equatorial',ER:'Eritreia',EE:'Estônia',ET:'Etiópia',FK:'Ilhas Malvinas',
        FO:'Ilhas Faroé',FJ:'Fiji',FI:'Finlândia',FR:'França',PF:'Polinésia Francesa',
        GA:'Gabão',GM:'Gâmbia',GE:'Geórgia',DE:'Alemanha',GH:'Gana',GI:'Gibraltar',GR:'Grécia',
        GL:'Groenlândia',GD:'Granada',GU:'Guam',GT:'Guatemala',GG:'Guernsey',GN:'Guiné',
        GW:'Guiné-Bissau',GY:'Guiana',HT:'Haiti',HN:'Honduras',HK:'Hong Kong',HU:'Hungria',
        IS:'Islândia',IN:'Índia',ID:'Indonésia',IR:'Irã',IQ:'Iraque',IE:'Irlanda',IM:'Ilha de Man',
        IL:'Israel',IT:'Itália',CI:'Costa do Marfim',JM:'Jamaica',JP:'Japão',JE:'Jersey',
        JO:'Jordânia',KZ:'Cazaquistão',KE:'Quênia',KI:'Kiribati',XK:'Kosovo',KW:'Kuwait',
        KG:'Quirguistão',LA:'Laos',LV:'Letônia',LB:'Líbano',LS:'Lesoto',LR:'Libéria',LY:'Líbia',
        LI:'Liechtenstein',LT:'Lituânia',LU:'Luxemburgo',MO:'Macau',MK:'Macedônia do Norte',
        MG:'Madagáscar',MW:'Malávi',MY:'Malásia',MV:'Maldivas',ML:'Mali',MT:'Malta',
        MH:'Ilhas Marshall',MR:'Mauritânia',MU:'Maurício',MX:'México',FM:'Micronésia',
        MD:'Moldávia',MC:'Mônaco',MN:'Mongólia',ME:'Montenegro',MS:'Montserrat',MA:'Marrocos',
        MZ:'Moçambique',MM:'Mianmar',NA:'Namíbia',NR:'Nauru',NP:'Nepal',NL:'Países Baixos',
        NC:'Nova Caledônia',NZ:'Nova Zelândia',NI:'Nicarágua',NE:'Níger',NG:'Nigéria',NU:'Niue',
        KP:'Coreia do Norte',MP:'Marianas Setentrionais',NO:'Noruega',OM:'Omã',PK:'Paquistão',
        PW:'Palau',PS:'Palestina',PA:'Panamá',PG:'Papua-Nova Guiné',PY:'Paraguai',PE:'Peru',
        PH:'Filipinas',PN:'Ilhas Pitcairn',PL:'Polônia',PT:'Portugal',PR:'Porto Rico',QA:'Catar',
        CG:'República do Congo',RO:'Romênia',RU:'Rússia',RW:'Ruanda',BL:'São Bartolomeu',
        SH:'Santa Helena',KN:'São Cristóvão e Névis',LC:'Santa Lúcia',MF:'São Martinho',
        PM:'São Pedro e Miquelão',VC:'São Vicente e Granadinas',WS:'Samoa',SM:'San Marino',
        ST:'São Tomé e Príncipe',SA:'Arábia Saudita',SN:'Senegal',RS:'Sérvia',SC:'Seicheles',
        SL:'Serra Leoa',SG:'Singapura',SX:'São Martinho (Países Baixos)',SK:'Eslováquia',
        SI:'Eslovênia',SB:'Ilhas Salomão',SO:'Somália',ZA:'África do Sul',
        GS:'Geórgia do Sul',KR:'Coreia do Sul',SS:'Sudão do Sul',ES:'Espanha',LK:'Sri Lanka',
        SD:'Sudão',SR:'Suriname',SJ:'Svalbard e Jan Mayen',SZ:'Essuatíni',SE:'Suécia',
        CH:'Suíça',SY:'Síria',TW:'Taiwan',TJ:'Tajiquistão',TZ:'Tanzânia',TH:'Tailândia',
        TG:'Togo',TK:'Toquelau',TO:'Tonga',TT:'Trinidad e Tobago',TN:'Tunísia',TR:'Turquia',
        TM:'Turcomenistão',TC:'Ilhas Turcas e Caicos',TV:'Tuvalu',UG:'Uganda',UA:'Ucrânia',
        AE:'Emirados Árabes Unidos',GB:'Reino Unido',US:'Estados Unidos',UY:'Uruguai',
        UZ:'Uzbequistão',VU:'Vanuatu',VA:'Vaticano',VE:'Venezuela',VN:'Vietnã',
        WF:'Wallis e Futuna',EH:'Saara Ocidental',YE:'Iêmen',ZM:'Zâmbia',ZW:'Zimbábue'
      };

      svg.querySelectorAll('path[name], path[id]').forEach((path) => {
        const iso = (path.getAttribute('id') || '').toUpperCase();
        const fallback = path.getAttribute('name') || iso;
        const name = ptNames[iso] || fallback;
        if (!name || name === 'world.svg') return;
        path.addEventListener('mousemove', (e) => showTooltip(e, name));
        path.addEventListener('mouseleave', hideTooltip);
      });
    })
    .catch((err) => {
      container.innerHTML = '<p class="world-map__error">Não foi possível carregar o mapa.</p>';
      console.error(err);
    });
});

// Partner modal (parceiros.html)
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.querySelector('[data-partner-modal]');
  if (!modal) return;
  const tiles = document.querySelectorAll('[data-partner]');
  if (!tiles.length) return;

  const closeBtn = modal.querySelector('.partner-modal__close');
  const fields = {
    nome: modal.querySelector('[data-partner-nome]'),
    tipo: modal.querySelector('[data-partner-tipo]'),
    pais: modal.querySelector('[data-partner-pais]'),
    periodo: modal.querySelector('[data-partner-periodo]'),
    escopo: modal.querySelector('[data-partner-escopo]'),
    site: modal.querySelector('[data-partner-site]'),
  };

  const open = (tile) => {
    fields.nome.textContent = tile.dataset.nome || '—';
    fields.tipo.textContent = tile.dataset.tipo || '';
    fields.pais.textContent = tile.dataset.pais || '—';
    fields.periodo.textContent = tile.dataset.periodo || '—';
    fields.escopo.textContent = tile.dataset.escopo || '';
    const site = tile.dataset.site || '';
    if (site && site !== '#') {
      fields.site.href = site;
      fields.site.hidden = false;
    } else {
      fields.site.hidden = true;
    }
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  };

  const close = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  };

  tiles.forEach((tile) => tile.addEventListener('click', () => open(tile)));
  if (closeBtn) closeBtn.addEventListener('click', close);
  modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) close();
  });
});

// Filtro da página de Oportunidades
document.addEventListener('DOMContentLoaded', () => {
  const filters = document.querySelectorAll('[data-oportunidade-filter]');
  const cards = document.querySelectorAll('[data-oportunidade-tipo]');
  if (!filters.length || !cards.length) return;

  const apply = (value) => {
    cards.forEach((card) => {
      const tipo = card.getAttribute('data-oportunidade-tipo');
      card.classList.toggle('is-hidden', value !== 'todas' && tipo !== value);
    });
    filters.forEach((f) => {
      f.classList.toggle('is-active', f.getAttribute('data-oportunidade-filter') === value);
    });
  };

  filters.forEach((f) => {
    f.addEventListener('click', () => apply(f.getAttribute('data-oportunidade-filter') || 'todas'));
  });
});
