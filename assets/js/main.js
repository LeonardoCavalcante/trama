const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
const navDropdownItem = document.querySelector('.site-nav__item');
const navDropdownTrigger = document.querySelector('.site-nav__dropdown-trigger');

const closeMainMenu = () => {
  if (!menuButton || !nav) return;

  nav.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
};

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(isOpen));

    if (!isOpen && navDropdownItem && navDropdownTrigger) {
      navDropdownItem.classList.remove('is-open');
      navDropdownTrigger.setAttribute('aria-expanded', 'false');
    }
  });
}

if (navDropdownItem && navDropdownTrigger) {
  const closeDropdown = () => {
    navDropdownItem.classList.remove('is-open');
    navDropdownTrigger.setAttribute('aria-expanded', 'false');
  };

  const mobileDropdownQuery = window.matchMedia('(max-width: 980px)');

  const syncDropdownMode = () => {
    if (mobileDropdownQuery.matches) {
      navDropdownTrigger.addEventListener('click', onMobileTriggerClick);
    } else {
      navDropdownTrigger.removeEventListener('click', onMobileTriggerClick);
      closeDropdown();
    }
  };

  function onMobileTriggerClick(event) {
    event.preventDefault();
    const isOpen = navDropdownItem.classList.toggle('is-open');
    navDropdownTrigger.setAttribute('aria-expanded', String(isOpen));
  }

  document.addEventListener('click', (event) => {
    if (nav && menuButton && nav.contains(event.target)) return;
    if (!navDropdownItem.contains(event.target)) {
      closeDropdown();
    }
  });

  navDropdownItem.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      closeDropdown();
      closeMainMenu();
    });
  });

  syncDropdownMode();
  mobileDropdownQuery.addEventListener('change', syncDropdownMode);

  mobileDropdownQuery.addEventListener('change', () => {
    if (!mobileDropdownQuery.matches) {
      closeMainMenu();
    }
  });
}

window.addEventListener('resize', () => {
  if (window.matchMedia('(min-width: 981px)').matches) {
    closeMainMenu();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeMainMenu();
    if (navDropdownItem && navDropdownTrigger) {
      navDropdownItem.classList.remove('is-open');
      navDropdownTrigger.setAttribute('aria-expanded', 'false');
    }
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
