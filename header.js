function initHeader() {
  const headerContainer = document.getElementById('shared-header');
  if (headerContainer) {
    headerContainer.innerHTML = `
      <nav class="fixed top-0 w-full bg-surface-ebony/90 backdrop-blur-md z-50 border-b border-white/10" id="main-nav">
        <div class="flex justify-between items-center px-margin-desktop py-4 max-w-container-max mx-auto relative">
          <a class="text-headline-sm font-headline-sm font-bold text-accent-gold flex items-center gap-2" href="index.html#home" id="nav-brand">ChessWithSasha</a>
          
          <!-- Desktop Nav Links -->
          <div class="hidden xl:flex gap-6 items-center" id="nav-desktop-menu">
            <a class="text-pure-white/90 hover:text-accent-gold transition-colors font-body-md whitespace-nowrap" href="index.html#home">Home</a>
            <a class="text-pure-white/90 hover:text-accent-gold transition-colors font-body-md whitespace-nowrap" href="index.html#about">About me</a>
            <a class="text-pure-white/90 hover:text-accent-gold transition-colors font-body-md whitespace-nowrap" href="index.html#sessions">In-person sessions</a>
            <a class="text-pure-white/90 hover:text-accent-gold transition-colors font-body-md whitespace-nowrap" href="index.html#clubs">Chess Clubs</a>
            <a class="text-pure-white/90 hover:text-accent-gold transition-colors font-body-md whitespace-nowrap" href="index.html#training">Camps</a>
            <a class="text-pure-white/90 hover:text-accent-gold transition-colors font-body-md whitespace-nowrap" href="gallery.html">Gallery</a>
            <a class="text-pure-white/90 hover:text-accent-gold transition-colors font-body-md whitespace-nowrap" href="index.html#contacts">Contacts</a>
          </div>
          
          <div class="flex items-center gap-4">
            <a href="index.html#booking" class="hidden sm:inline-block px-6 py-2 bg-accent-gold text-surface-ebony font-bold hover:bg-opacity-90 transition-all duration-200 uppercase text-label-caps tracking-widest text-center" id="nav-join-btn">
              Book Lesson
            </a>
            
            <!-- Mobile Hamburger Button -->
            <button id="mobile-menu-btn" class="xl:hidden text-pure-white hover:text-accent-gold focus:outline-none flex items-center" aria-expanded="false" aria-label="Toggle navigation menu">
              <span class="material-symbols-outlined text-3xl">menu</span>
            </button>
          </div>
          
          <!-- Mobile Nav Links Panel -->
          <div id="nav-links-container" class="hidden xl:hidden flex-col absolute top-full left-0 w-full bg-surface-ebony/95 border-b border-white/10 px-margin-desktop py-6 gap-4">
            <a class="text-pure-white/90 hover:text-accent-gold transition-colors font-body-md" href="index.html#home">Home</a>
            <a class="text-pure-white/90 hover:text-accent-gold transition-colors font-body-md" href="index.html#about">About me</a>
            <a class="text-pure-white/90 hover:text-accent-gold transition-colors font-body-md" href="index.html#sessions">In-person sessions</a>
            <a class="text-pure-white/90 hover:text-accent-gold transition-colors font-body-md" href="index.html#clubs">Chess Clubs</a>
            <a class="text-pure-white/90 hover:text-accent-gold transition-colors font-body-md" href="index.html#training">Camps</a>
            <a class="text-pure-white/90 hover:text-accent-gold transition-colors font-body-md" href="gallery.html">Gallery</a>
            <a class="text-pure-white/90 hover:text-accent-gold transition-colors font-body-md" href="index.html#contacts">Contacts</a>
            <a href="index.html#booking" class="w-full mt-2 py-3 bg-accent-gold text-surface-ebony font-bold hover:bg-opacity-90 transition-all uppercase text-label-caps tracking-widest text-center block">
              Book Lesson
            </a>
          </div>
        </div>
      </nav>
    `;
    // Trigger mobile menu activation if function is loaded
    if (typeof initMobileMenu === 'function') {
      initMobileMenu();
    }
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHeader);
} else {
  initHeader();
}
