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