document.addEventListener('DOMContentLoaded', () => {
  // 1. LÓGICA DE CARRITO Y CONTADOR
  const cartBtn = document.getElementById('cartBtn');
  const cartBadge = document.getElementById('cartBadge');
  const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
  let cartItemsCount = 0;

  addToCartBtns.forEach(button => {
    button.addEventListener('click', () => {
      cartItemsCount++;
      cartBadge.textContent = cartItemsCount;

      // Animación visual del botón al presionar
      const originalText = button.querySelector('span').textContent;
      button.querySelector('span').textContent = '¡Añadido!';
      button.style.backgroundColor = '#16a34a';

      setTimeout(() => {
        button.querySelector('span').textContent = originalText;
        button.style.backgroundColor = '';
      }, 1200);
    });
  });

  // 2. FILTRADO DE PRODUCTOS POR CATEGORÍA
  const pillBtns = document.querySelectorAll('.pill-btn');
  const productCards = document.querySelectorAll('.product-card');
  const resultsCount = document.getElementById('resultsCount');

  pillBtns.forEach(pill => {
    pill.addEventListener('click', () => {
      // Remover clase activa de todos
      pillBtns.forEach(b => b.classList.remove('active'));
      pill.classList.add('active');

      const filter = pill.getAttribute('data-filter');
      let visibleCount = 0;

      productCards.forEach(card => {
        const categories = card.getAttribute('data-category');

        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'flex';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      resultsCount.textContent = `Mostrando ${visibleCount} producto${visibleCount !== 1 ? 's' : ''}`;
    });
  });

  // 3. BARRA DE BÚSQUEDA FLOTANTE
  const searchTrigger = document.getElementById('searchTrigger');
  const searchOverlay = document.getElementById('searchOverlay');
  const searchClose = document.getElementById('searchClose');
  const searchInput = document.getElementById('searchInput');

  searchTrigger.addEventListener('click', () => {
    searchOverlay.classList.toggle('active');
    if (searchOverlay.classList.contains('active')) {
      searchInput.focus();
    }
  });

  searchClose.addEventListener('click', () => {
    searchOverlay.classList.remove('active');
  });

  // Búsqueda en tiempo real
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    let visibleCount = 0;

    productCards.forEach(card => {
      const title = card.querySelector('.product-title').textContent.toLowerCase();
      const desc = card.querySelector('.product-desc').textContent.toLowerCase();

      if (title.includes(query) || desc.includes(query)) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    resultsCount.textContent = `Mostrando ${visibleCount} producto${visibleCount !== 1 ? 's' : ''}`;
  });

  // 4. BOTÓN "HABLEMOS"
  const contactBtn = document.getElementById('contactBtn');
  contactBtn.addEventListener('click', () => {
    alert('Contactando con el equipo comercial de Grupo Innovatek...');
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // ELEMENTOS DEL MODAL
  const modal = document.getElementById('productModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalImg = document.getElementById('modalImg');
  const modalCategory = document.getElementById('modalCategory');
  const modalTitle = document.getElementById('modalTitle');
  const modalPriceOld = document.getElementById('modalPriceOld');
  const modalPriceCurrent = document.getElementById('modalPriceCurrent');
  const modalDescription = document.getElementById('modalDescription');
  const modalSpecs = document.getElementById('modalSpecs');
  const modalAddToCartBtn = document.getElementById('modalAddToCartBtn');

  // ELEMENTOS DEL CARRITO Y BÚSQUEDA
  const cartBadge = document.getElementById('cartBadge');
  let cartCount = 0;
  let currentProductData = null;

  // ABRIR MODAL AL HACER CLIC EN UNA TARJETA
  const productCards = document.querySelectorAll('.product-card');

  productCards.forEach(card => {
    card.addEventListener('click', (e) => {
      // Evitar abrir modal si el usuario hace clic directamente en el botón "Añadir"
      if (e.target.closest('.add-to-cart-btn')) {
        return;
      }

      // EXTRAER DATOS DE LA TARJETA
      const img = card.querySelector('.product-image-container img').src;
      const title = card.querySelector('.product-title').innerText;
      const category = card.querySelector('.category-name').innerText;
      const priceOld = card.querySelector('.price-old')?.innerText || '';
      const priceCurrent = card.querySelector('.price-current').innerText;
      const fullDesc = card.getAttribute('data-full-desc') || card.querySelector('.product-desc').innerText;
      const specsHtml = card.querySelector('.specs-tags').innerHTML;

      // GUARDAR PRODUCTO ACTUAL EN MEMORIA
      const btn = card.querySelector('.add-to-cart-btn');
      currentProductData = {
        id: btn.getAttribute('data-id'),
        name: btn.getAttribute('data-name'),
        price: btn.getAttribute('data-price')
      };

      // POPULAR EL MODAL CON LOS DATOS
      modalImg.src = img;
      modalTitle.innerText = title;
      modalCategory.innerText = category;
      modalPriceOld.innerText = priceOld;
      modalPriceCurrent.innerText = priceCurrent;
      modalDescription.innerText = fullDesc;
      modalSpecs.innerHTML = specsHtml;

      // MOSTRAR MODAL
      modal.classList.add('active');
    });
  });

  // CERRAR MODAL
  const closeModal = () => {
    modal.classList.remove('active');
  };

  modalCloseBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // AÑADIR AL CARRITO DESDE LA TARJETA DIRECTA
  document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      cartCount++;
      cartBadge.innerText = cartCount;
    });
  });

  // AÑADIR AL CARRITO DESDE EL MODAL
  modalAddToCartBtn.addEventListener('click', () => {
    cartCount++;
    cartBadge.innerText = cartCount;
    closeModal();
  });

  // BÚSQUEDA OVERLAY
  const searchTrigger = document.getElementById('searchTrigger');
  const searchOverlay = document.getElementById('searchOverlay');
  const searchClose = document.getElementById('searchClose');

  if (searchTrigger && searchOverlay && searchClose) {
    searchTrigger.addEventListener('click', () => searchOverlay.classList.add('active'));
    searchClose.addEventListener('click', () => searchOverlay.classList.remove('active'));
  }
});

// CONTROL DEL CARRUSEL DE BANNERS CON VIDEO
const track = document.getElementById('vCarouselTrack');
const prevBtn = document.getElementById('vPrevBtn');
const nextBtn = document.getElementById('vNextBtn');

if (track && prevBtn && nextBtn) {
  const scrollAmount = 350;

  nextBtn.addEventListener('click', () => {
    track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });

  prevBtn.addEventListener('click', () => {
    track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });
}