function initFooter() {
const footerContainer = document.getElementById('shared-footer');
if (footerContainer) {
footerContainer.innerHTML = `
<div id="contacts" class="grid grid-cols-1 md:grid-cols-4 gap-12 px-margin-desktop py-16 max-w-container-max mx-auto">
  <div class="space-y-4">
    <div class="text-headline-sm font-headline-sm font-bold text-accent-gold">ChessWithSasha</div>
    <p class="text-pure-white/60 text-sm leading-relaxed">Developing youth strategy, tactical thinking, and competitive
      resilience. The premier destination for chess coaching in Somerset.</p>
  </div>
  <div class="space-y-4">
    <h5 class="text-pure-white font-bold uppercase text-xs tracking-widest">Quick Links</h5>
    <ul class="space-y-2 text-sm">
      <li><a class="text-pure-white/60 hover:text-accent-gold transition-colors" href="index.html#home">Home</a></li>
      <li><a class="text-pure-white/60 hover:text-accent-gold transition-colors" href="index.html#about">About me</a>
      </li>
      <li><a class="text-pure-white/60 hover:text-accent-gold transition-colors" href="index.html#sessions">In-person
          sessions</a></li>
      <li><a class="text-pure-white/60 hover:text-accent-gold transition-colors" href="index.html#clubs">Chess Clubs</a>
      </li>
      <li><a class="text-pure-white/60 hover:text-accent-gold transition-colors" href="index.html#training">Training
          camps and lectures</a>
      </li>
    </ul>
  </div>
  <div class="space-y-4">
    <h5 class="text-pure-white font-bold uppercase text-xs tracking-widest">Policies</h5>
    <ul class="space-y-2 text-sm">
      <li><a class="text-pure-white/60 hover:text-pure-white transition-colors" href="legal.html#privacy">Privacy
          Policy</a></li>
      <li><a class="text-pure-white/60 hover:text-pure-white transition-colors" href="legal.html#terms">Terms of
          Service</a></li>
    </ul>
  </div>
  <div class="space-y-4">
    <h5 class="text-pure-white font-bold uppercase text-xs tracking-widest">Contacts</h5>
    <ul class="space-y-3 text-sm">
      <li class="flex items-center gap-2 text-pure-white/60">
        <span class="material-symbols-outlined text-accent-gold text-lg">mail</span>
        <a href="mailto:oleksandr.matlak@gmail.com"
          class="hover:text-accent-gold transition-colors">oleksandr.matlak@gmail.com</a>
      </li>
      <li class="flex items-center gap-2 text-pure-white/60">
        <span class="material-symbols-outlined text-accent-gold text-lg">call</span>
        <a href="tel:+447553715617" class="hover:text-accent-gold transition-colors">+44 7553 715617</a>
      </li>
      <li class="flex items-center gap-2 text-pure-white/60">
        <span class="material-symbols-outlined text-accent-gold text-lg">chat</span>
        <span>+380 96 634 9667 (WhatsApp)</span>
      </li>
      <li class="flex items-center gap-2 text-pure-white/60">
        <span class="material-symbols-outlined text-accent-gold text-lg">public</span>
        <a class="hover:text-accent-gold transition-colors" href="https://www.facebook.com/alexander.matlak"
          target="_blank" rel="noopener noreferrer">Facebook Profile</a>
      </li>
    </ul>
  </div>
</div>
<div class="border-t border-white/10 py-6 px-margin-desktop text-center bg-surface-ebony/40">
  <p class="text-pure-white/40 text-xs">© 2026 ChessWithSasha. All rights reserved. Registered in the UK</p>
</div>
`;
}
}

if (document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', initFooter);
} else {
initFooter();
}