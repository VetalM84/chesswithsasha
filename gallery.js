function initGalleryPage() {
  // CONFIGURATION
  // Мы вписываем ваш Cloud Name прямо в код - это абсолютно безопасно!
  const cloudName = "dakejb5ws";

  // 9 Gallery Sections matching your tags
  const categories = [
    {
      id: "chess-clubs",
      title: "Chess Clubs",
      description: "Weekly club meetings, friendly tournaments, and junior coaching at Wells, Frome, Meare, and Axbridge.",
      tag: "chess-clubs",
      demoImages: [
        "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1518152006812-edab29b069ac?w=800&auto=format&fit=crop&q=80"
      ]
    },
    {
      id: "chess-player",
      title: "Chess Player",
      description: "FIDE Arena Grand Master Sasha Matlak in action during tournaments and simultaneous exhibitions.",
      tag: "chess-player",
      demoImages: [
        "https://images.unsplash.com/photo-1523821741446-edb2b68bb7a0?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&auto=format&fit=crop&q=80"
      ]
    },
    {
      id: "events",
      title: "Events",
      description: "Match highlights, community chess festivals, and simultaneous exhibition events.",
      tag: "events",
      demoImages: [
        "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1586165368502-1bad197a64e1?w=800&auto=format&fit=crop&q=80"
      ]
    },
    {
      id: "lectures",
      title: "Lectures",
      description: "Master classes, opening theory breakdowns, and game analysis presentations.",
      tag: "lectures",
      demoImages: [
        "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=800&auto=format&fit=crop&q=80"
      ]
    },
    {
      id: "references",
      title: "References",
      description: "Review certificates, official recommendations, and feedback from local schools and parents.",
      tag: "references",
      demoImages: [
        "https://images.unsplash.com/photo-1518152006812-edab29b069ac?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&auto=format&fit=crop&q=80"
      ]
    },
    {
      id: "somerset-media",
      title: "Somerset Media",
      description: "News headlines, articles, and media coverage celebrating chess development in Somerset.",
      tag: "somerset-media",
      demoImages: [
        "https://images.unsplash.com/photo-1523821741446-edb2b68bb7a0?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1586165368502-1bad197a64e1?w=800&auto=format&fit=crop&q=80"
      ]
    },
    {
      id: "students",
      title: "Students",
      description: "Students deep in tactical games, analyzing puzzles, and receiving certificates.",
      tag: "students",
      demoImages: [
        "https://images.unsplash.com/photo-1586165368502-1bad197a64e1?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&auto=format&fit=crop&q=80"
      ]
    },
    {
      id: "teams",
      title: "Teams",
      description: "Somerset junior league team lineups, championships, and squad pictures.",
      tag: "teams",
      demoImages: [
        "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1518152006812-edab29b069ac?w=800&auto=format&fit=crop&q=80"
      ]
    },
    {
      id: "with-top-players",
      title: "With Top Players",
      description: "Photos with international chess masters, Grandmasters, and distinguished FIDE officials.",
      tag: "with-top-players",
      demoImages: [
        "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1523821741446-edb2b68bb7a0?w=800&auto=format&fit=crop&q=80"
      ]
    }
  ];

  // DOM Elements
  const sectionsContainer = document.getElementById('gallery-sections-container');
  const filtersContainer = document.getElementById('gallery-filters');

  // Lightbox Elements
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');

  // State
  let activeImages = []; // Stores URLs and captions of currently visible images for Lightbox navigation
  let currentImageIndex = 0;

  // Initialize and Render Filters dynamically
  function renderFilters() {
    if (!filtersContainer) return;

    filtersContainer.innerHTML = '';

    // Add "Show All" Button
    const showAllBtn = document.createElement('button');
    showAllBtn.setAttribute('data-filter', 'all');
    showAllBtn.className = "px-5 py-2.5 rounded bg-accent-gold text-surface-ebony font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-lg";
    showAllBtn.innerText = "Show All";

    showAllBtn.addEventListener('click', () => {
      const filterButtons = filtersContainer.querySelectorAll('button');
      filterButtons.forEach(b => {
        b.className = "px-5 py-2.5 rounded border border-white/15 hover:border-accent-gold/50 text-pure-white/80 hover:text-accent-gold font-semibold text-xs uppercase tracking-wider transition-all duration-200";
      });

      showAllBtn.className = "px-5 py-2.5 rounded bg-accent-gold text-surface-ebony font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-lg";

      const sections = document.querySelectorAll('.gallery-section');
      sections.forEach(sec => sec.classList.remove('hidden'));

      updateActiveImagesList();
    });

    filtersContainer.appendChild(showAllBtn);

    // Add Category Buttons
    categories.forEach(cat => {
      const btn = document.createElement('button');
      btn.setAttribute('data-filter', cat.id);
      btn.className = "px-5 py-2.5 rounded border border-white/15 hover:border-accent-gold/50 text-pure-white/80 hover:text-accent-gold font-semibold text-xs uppercase tracking-wider transition-all duration-200";
      btn.innerText = cat.title;

      btn.addEventListener('click', () => {
        const filterVal = btn.getAttribute('data-filter');

        // Update active filter button state style
        const filterButtons = filtersContainer.querySelectorAll('button');
        filterButtons.forEach(b => {
          b.className = "px-5 py-2.5 rounded border border-white/15 hover:border-accent-gold/50 text-pure-white/80 hover:text-accent-gold font-semibold text-xs uppercase tracking-wider transition-all duration-200";
        });

        btn.className = "px-5 py-2.5 rounded bg-accent-gold text-surface-ebony font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-lg";

        // Show/Hide sections smoothly
        const sections = document.querySelectorAll('.gallery-section');
        sections.forEach(sec => {
          if (sec.id === filterVal) {
            sec.classList.remove('hidden');
          } else {
            sec.classList.add('hidden');
          }
        });

        // Update active image list for Lightbox navigation
        updateActiveImagesList();
      });

      filtersContainer.appendChild(btn);
    });
  }

  // Fetch images for a category from Cloudinary List API
  async function fetchCloudinaryImages(cat, isLight) {
    const listUrl = `https://res.cloudinary.com/${cloudName}/image/list/${cat.tag}.json`;

    try {
      const response = await fetch(listUrl);
      if (!response.ok) {
        throw new Error("List not found or tag is empty");
      }

      const data = await response.json();

      // Transform the Cloudinary resources into thumbnail and full resolution URLs
      const imageUrls = data.resources.map(res => {
        return {
          thumbnail: `https://res.cloudinary.com/${cloudName}/image/upload/w_400,c_scale/v${res.version}/${res.public_id}.${res.format}`,
          full: `https://res.cloudinary.com/${cloudName}/image/upload/w_1200,c_scale/v${res.version}/${res.public_id}.${res.format}`
        };
      });

      renderImages(cat, imageUrls, false, isLight);

    } catch (error) {
      console.warn(`Could not load images for tag "${cat.tag}" (${error.message}). Falling back to demo images.`);

      // Use demo images
      const demoUrls = cat.demoImages.map(url => ({ thumbnail: url, full: url }));
      renderImages(cat, demoUrls, true, isLight);
    }
  }

  // Render Image Cards inside Grid
  function renderImages(cat, urls, isDemoMode = false, isLight = false) {
    const grid = document.getElementById(`grid-${cat.id}`);
    if (!grid) return;

    grid.innerHTML = '';

    if (urls.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full py-12 text-center ${isLight ? 'text-black/40 border-black/10' : 'text-pure-white/40 border-white/10'} border border-dashed rounded">
          <span class="material-symbols-outlined text-4xl mb-2">add_photo_alternate</span>
          <p class="text-sm">No photos uploaded to this section yet.</p>
        </div>
      `;
      return;
    }

    urls.forEach((urlObj, index) => {
      const card = document.createElement('div');

      // Apply different card background, border and shadows based on section lighting
      if (isLight) {
        card.className = "aspect-video bg-white border border-black/10 overflow-hidden rounded shadow-md hover:shadow-xl group relative cursor-pointer hover:border-accent-gold transition-all duration-300 transform hover:-translate-y-1.5";
      } else {
        card.className = "aspect-video bg-black border border-white/10 overflow-hidden rounded shadow-inner group relative cursor-pointer hover:border-accent-gold transition-all duration-300 transform hover:-translate-y-1.5";
      }

      card.innerHTML = `
        <img class="w-full h-full object-cover transition-all duration-700 scale-100 group-hover:scale-105" 
             src="${urlObj.thumbnail}" 
             alt="${cat.title} Photo" 
             loading="lazy">
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
          <span class="text-xs text-accent-gold font-bold uppercase tracking-wider">${cat.title}</span>
          ${isDemoMode ? '<span class="text-[9px] text-pure-white/40">Demo Placeholder</span>' : ''}
        </div>
      `;

      // Store full url to card dataset for Lightbox
      card.dataset.fullUrl = urlObj.full;
      card.dataset.caption = `${cat.title} — Image ${index + 1}`;

      card.addEventListener('click', () => {
        openLightbox(urlObj.full, `${cat.title} — Image ${index + 1}`);
      });

      grid.appendChild(card);
    });

    // Update global list of visible images
    updateActiveImagesList();
  }

  // Update visible list of images based on active filter
  function updateActiveImagesList() {
    activeImages = [];
    const visibleCards = document.querySelectorAll('.gallery-section:not(.hidden) [data-full-url]');
    visibleCards.forEach(card => {
      activeImages.push({
        url: card.dataset.fullUrl,
        caption: card.dataset.caption
      });
    });
  }

  // Lightbox Modal Controls
  function openLightbox(url, caption) {
    if (!lightboxModal) return;

    lightboxImage.src = url;
    lightboxCaption.innerText = caption;

    // Find current index in active list
    currentImageIndex = activeImages.findIndex(img => img.url === url);
    if (currentImageIndex === -1) currentImageIndex = 0;

    lightboxModal.classList.remove('hidden');
    lightboxModal.classList.add('flex');
    document.body.classList.add('overflow-hidden'); // Lock page scroll

    setTimeout(() => {
      lightboxImage.classList.remove('scale-95');
      lightboxImage.classList.add('scale-100');
    }, 50);
  }

  // Close Lightbox
  function closeLightbox() {
    if (!lightboxModal) return;

    lightboxImage.classList.remove('scale-100');
    lightboxImage.classList.add('scale-95');

    setTimeout(() => {
      lightboxModal.classList.add('hidden');
      lightboxModal.classList.remove('flex');
      document.body.classList.remove('overflow-hidden');
    }, 200);
  }

  // Navigate next/prev in Lightbox
  function navigateLightbox(direction) {
    if (activeImages.length === 0) return;

    currentImageIndex += direction;

    // Wrap around index limits
    if (currentImageIndex >= activeImages.length) currentImageIndex = 0;
    if (currentImageIndex < 0) currentImageIndex = activeImages.length - 1;

    const nextImg = activeImages[currentImageIndex];

    // Fade Transition effect
    lightboxImage.classList.add('opacity-0');
    setTimeout(() => {
      lightboxImage.src = nextImg.url;
      lightboxCaption.innerText = nextImg.caption;
      lightboxImage.classList.remove('opacity-0');
    }, 150);
  }

  // Lightbox Event Listeners
  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
  if (lightboxNext) lightboxNext.addEventListener('click', () => navigateLightbox(1));

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal || e.target.closest('#lightbox-modal') && !e.target.closest('img') && !e.target.closest('button')) {
        closeLightbox();
      }
    });
  }

  // Keyboard navigation for Lightbox
  document.addEventListener('keydown', (e) => {
    if (lightboxModal && !lightboxModal.classList.contains('hidden')) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') navigateLightbox(1);
      if (e.key === 'ArrowLeft') navigateLightbox(-1);
    }
  });

  // Main Initialization
  function initGallery() {
    sectionsContainer.innerHTML = '';

    categories.forEach((cat, index) => {
      const isLight = (index % 2 === 0);

      // Determine colors based on light vs dark section style
      let bgClass, titleColor, descColor, badgeColor;

      if (isLight) {
        // Alternating off-white (bg-surface) and pure white (bg-white)
        const lightBg = (index % 4 === 0) ? 'bg-white' : 'bg-surface';
        bgClass = `${lightBg} text-on-surface`;
        titleColor = 'text-on-surface';
        descColor = 'text-on-surface-variant';
        badgeColor = 'text-on-surface-variant/50 border-black/10 bg-black/5';
      } else {
        // Alternating slate blue (bg-slate-depth) and standard black (bg-surface-ebony)
        const darkBg = (index % 4 === 1) ? 'bg-surface-ebony' : 'bg-slate-depth';
        bgClass = `${darkBg} text-pure-white`;
        titleColor = 'text-pure-white';
        descColor = 'text-pure-white/70';
        badgeColor = 'text-pure-white/40 border-white/10 bg-white/5';
      }

      // Create section element
      const section = document.createElement('section');
      section.id = cat.id;
      section.className = `gallery-section ${bgClass} scroll-mt-28 w-full transition-all duration-300`;

      section.innerHTML = `
        <div class="max-w-container-max mx-auto px-margin-desktop py-24">
          <div class="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div class="max-w-2xl">
              <h2 class="text-headline-sm font-headline-sm font-bold text-accent-gold mb-3">${cat.title}</h2>
              <p class="${descColor} text-sm leading-relaxed">${cat.description}</p>
            </div>
            <span class="text-xs ${badgeColor} font-mono px-3 py-1 border rounded-full self-start md:self-auto select-none">Tag: ${cat.tag}</span>
          </div>
          
          <!-- Image Grid -->
          <div id="grid-${cat.id}" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <!-- Skeleton Loading -->
            <div class="aspect-video ${isLight ? 'bg-black/5 border-black/5' : 'bg-white/5 border-white/5'} border rounded animate-pulse"></div>
            <div class="aspect-video ${isLight ? 'bg-black/5 border-black/5' : 'bg-white/5 border-white/5'} border rounded animate-pulse"></div>
            <div class="aspect-video ${isLight ? 'bg-black/5 border-black/5' : 'bg-white/5 border-white/5'} border rounded animate-pulse"></div>
          </div>
        </div>
      `;

      sectionsContainer.appendChild(section);

      // Trigger API fetch for this section
      fetchCloudinaryImages(cat, isLight);
    });
  }

  // Run Initialization
  renderFilters();
  initGallery();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGalleryPage);
} else {
  initGalleryPage();
}
