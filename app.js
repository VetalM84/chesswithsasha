document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Mobile Menu Interactivity ---
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navLinksContainer = document.getElementById('nav-links-container');
  
  if (mobileMenuBtn && navLinksContainer) {
    mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
      
      // Toggle visibility
      navLinksContainer.classList.toggle('hidden');
      navLinksContainer.classList.toggle('flex');
    });

    // Close mobile menu on link click
    const links = navLinksContainer.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        if (!navLinksContainer.classList.contains('hidden')) {
          navLinksContainer.classList.add('hidden');
          navLinksContainer.classList.remove('flex');
          mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  // --- 2. Scroll Reveal Observer ---
  const revealElements = document.querySelectorAll('.scroll-reveal');
  
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          revealObserver.unobserve(entry.target); // Reveal once
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // --- 3. Interactive Scheduler Application ---
  const bookingContainer = document.getElementById('booking-app-container');
  if (bookingContainer) {
    initScheduler(bookingContainer);
  }
});

/**
 * Initializes the custom premium scheduling calendar widget
 */
function initScheduler(container) {
  // Initial State
  const state = {
    currentDate: new Date(),
    selectedDate: null,
    selectedDuration: '45min', // '45min', '1hr', '2hr'
    selectedTimeSlot: null,
    availableSlots: {
      morning: ['09:30 AM', '10:30 AM', '11:15 AM'],
      afternoon: ['01:30 PM', '03:00 PM', '04:15 PM', '05:30 PM']
    }
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Render HTML Structure of Scheduler inside container
  container.innerHTML = `
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-surface-ebony/90 border border-white/10 rounded-xl shadow-2xl overflow-hidden p-6 md:p-8 backdrop-blur-md">
      <!-- Left Sidebar: Session Selector & Summary -->
      <div class="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-white/10 pb-6 lg:pb-0 lg:pr-8 flex flex-col justify-between">
        <div>
          <h3 class="text-headline-sm font-headline-sm text-accent-gold mb-6 flex items-center gap-2">
            <span class="material-symbols-outlined">settings_accessibility</span>
            1. Select Session
          </h3>
          <div class="space-y-4">
            <button id="duration-btn-45" class="w-full text-left p-4 rounded border transition-all duration-200 border-accent-gold bg-accent-gold/10 text-pure-white" data-val="45min">
              <div class="flex justify-between items-center mb-1">
                <span class="font-bold text-sm tracking-wider uppercase text-accent-gold">Younger Juniors</span>
                <span class="text-xs text-pure-white/60">45 Minutes</span>
              </div>
              <p class="text-xs text-pure-white/70">Ideal for kids & beginners starting their chess journey.</p>
            </button>
            
            <button id="duration-btn-60" class="w-full text-left p-4 rounded border border-white/10 transition-all duration-200 hover:border-accent-gold/40 text-pure-white/80" data-val="1hr">
              <div class="flex justify-between items-center mb-1">
                <span class="font-bold text-sm tracking-wider uppercase text-pure-white">Strong Juniors</span>
                <span class="text-xs text-pure-white/60">1 Hour</span>
              </div>
              <p class="text-xs text-pure-white/70">Deeper tactics, strategic calculations & endgames.</p>
            </button>
            
            <button id="duration-btn-120" class="w-full text-left p-4 rounded border border-white/10 transition-all duration-200 hover:border-accent-gold/40 text-pure-white/80" data-val="2hr">
              <div class="flex justify-between items-center mb-1">
                <span class="font-bold text-sm tracking-wider uppercase text-pure-white">Adults & Masters</span>
                <span class="text-xs text-pure-white/60">2 Hours</span>
              </div>
              <p class="text-xs text-pure-white/70">Intense competitive training, opening prep & analysis.</p>
            </button>
          </div>
        </div>
        
        <div class="mt-8 pt-6 border-t border-white/10">
          <h4 class="text-xs uppercase tracking-widest text-accent-gold font-bold mb-3">Booking Details</h4>
          <div id="booking-summary" class="space-y-2 text-sm text-pure-white/80">
            <p class="flex items-center gap-2"><span class="material-symbols-outlined text-accent-gold text-lg">timer</span> <span id="summary-duration">45 Min Lesson</span></p>
            <p class="flex items-center gap-2"><span class="material-symbols-outlined text-accent-gold text-lg">calendar_today</span> <span id="summary-date" class="text-pure-white/50">Select a date</span></p>
            <p class="flex items-center gap-2"><span class="material-symbols-outlined text-accent-gold text-lg">schedule</span> <span id="summary-time" class="text-pure-white/50">Select a time slot</span></p>
          </div>
        </div>
      </div>

      <!-- Center: Calendar Grid -->
      <div class="lg:col-span-5 flex flex-col justify-between">
        <div>
          <h3 class="text-headline-sm font-headline-sm text-accent-gold mb-6 flex items-center gap-2">
            <span class="material-symbols-outlined">calendar_month</span>
            2. Choose Date
          </h3>
          
          <div class="flex justify-between items-center mb-4 px-2">
            <span id="calendar-month-year" class="text-pure-white font-bold text-lg">June 2026</span>
            <div class="flex gap-1">
              <button id="prev-month-btn" class="p-2 border border-white/10 hover:border-accent-gold/50 rounded text-pure-white/80 hover:text-accent-gold transition-colors">
                <span class="material-symbols-outlined">chevron_left</span>
              </button>
              <button id="next-month-btn" class="p-2 border border-white/10 hover:border-accent-gold/50 rounded text-pure-white/80 hover:text-accent-gold transition-colors">
                <span class="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
          
          <!-- Calendar Days Grid -->
          <div class="grid grid-cols-7 text-center text-xs font-bold text-accent-gold uppercase tracking-wider mb-2">
            <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
          </div>
          <div id="calendar-days-grid" class="grid grid-cols-7 gap-1 text-center">
            <!-- Dynamic days will render here -->
          </div>
        </div>
        
        <p class="text-xs text-pure-white/50 mt-4"><span class="text-accent-gold font-bold">*</span> Individual sessions are mostly scheduled in the afternoon and evening UK time.</p>
      </div>

      <!-- Right Sidebar: Time Slots / Form -->
      <div class="lg:col-span-3 border-t lg:border-t-0 lg:border-l border-white/10 pt-6 lg:pt-0 lg:pl-8 flex flex-col justify-between">
        <div id="timeslot-pane">
          <h3 class="text-headline-sm font-headline-sm text-accent-gold mb-6 flex items-center gap-2">
            <span class="material-symbols-outlined">alarm</span>
            3. Select Time
          </h3>
          
          <div id="no-date-selected-message" class="text-center py-12 text-pure-white/40">
            <span class="material-symbols-outlined text-4xl mb-2">touch_app</span>
            <p class="text-sm">Please select a date on the calendar first.</p>
          </div>
          
          <div id="slots-container" class="hidden space-y-4">
            <div>
              <p class="text-xs font-bold text-pure-white/50 uppercase tracking-widest mb-2">Morning Slots</p>
              <div id="morning-slots" class="grid grid-cols-1 gap-2"></div>
            </div>
            <div>
              <p class="text-xs font-bold text-pure-white/50 uppercase tracking-widest mb-2">Afternoon & Evening</p>
              <div id="afternoon-slots" class="grid grid-cols-1 gap-2"></div>
            </div>
          </div>
        </div>
        
        <!-- Next Step Form Launcher -->
        <div class="mt-8 pt-4">
          <button id="book-btn-submit" disabled class="w-full py-4 bg-white/10 text-pure-white/40 font-bold uppercase text-label-caps tracking-widest transition-all duration-200 cursor-not-allowed border border-white/5">
            Book Selected Session
          </button>
        </div>
      </div>
    </div>
    
    <!-- Dynamic Modal Overlay for Booking Form & Success -->
    <div id="booking-modal" class="fixed inset-0 z-50 bg-black/80 backdrop-blur-md hidden items-center justify-center p-4">
      <div id="modal-card" class="bg-surface-ebony border border-white/15 w-full max-w-lg rounded-xl shadow-2xl p-8 relative transform scale-95 transition-transform duration-300">
        <!-- Close Button -->
        <button id="close-modal-btn" class="absolute top-4 right-4 text-pure-white/60 hover:text-accent-gold transition-colors">
          <span class="material-symbols-outlined text-2xl">close</span>
        </button>
        
        <!-- Step 1: Form -->
        <div id="modal-form-step">
          <h3 class="text-headline-sm font-headline-sm text-accent-gold mb-2">Confirm Your Session</h3>
          <p class="text-sm text-pure-white/60 mb-6">Provide details to register your request with coach Sasha.</p>
          
          <form id="details-form" class="space-y-4">
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-pure-white/70 mb-2">Your Name *</label>
              <input type="text" id="form-name" required class="w-full bg-slate-depth border border-white/10 rounded px-4 py-3 text-pure-white focus:border-accent-gold focus:outline-none transition-colors">
            </div>
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-pure-white/70 mb-2">Email Address *</label>
              <input type="email" id="form-email" required class="w-full bg-slate-depth border border-white/10 rounded px-4 py-3 text-pure-white focus:border-accent-gold focus:outline-none transition-colors">
            </div>
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-pure-white/70 mb-2">Student's Chess Level / Age</label>
              <select id="form-level" class="w-full bg-slate-depth border border-white/10 rounded px-4 py-3 text-pure-white focus:border-accent-gold focus:outline-none transition-colors">
                <option value="beginner">Beginner (learn rules, basic checks)</option>
                <option value="intermediate">Intermediate (played in clubs, knows tactics)</option>
                <option value="advanced">Advanced (active tournament player)</option>
                <option value="adult">Adult Amateur / Casual Player</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-pure-white/70 mb-2">Special Notes / Goals</label>
              <textarea id="form-notes" rows="3" placeholder="Tell Sasha about your goals..." class="w-full bg-slate-depth border border-white/10 rounded px-4 py-3 text-pure-white focus:border-accent-gold focus:outline-none transition-colors"></textarea>
            </div>
            
            <div class="pt-4 flex gap-4">
              <button type="button" id="modal-cancel-btn" class="flex-1 py-3 border border-white/15 hover:bg-white/5 text-pure-white text-sm font-bold uppercase tracking-wider">Cancel</button>
              <button type="submit" class="flex-1 py-3 bg-accent-gold hover:bg-opacity-95 text-surface-ebony text-sm font-bold uppercase tracking-wider">Submit Request</button>
            </div>
          </form>
        </div>
        
        <!-- Step 2: Loader -->
        <div id="modal-loader-step" class="hidden flex-col items-center justify-center py-16 text-center">
          <div class="w-16 h-16 border-4 border-accent-gold border-t-transparent rounded-full animate-spin mb-6"></div>
          <h3 class="text-headline-sm font-headline-sm text-pure-white mb-2">Sending Request...</h3>
          <p class="text-sm text-pure-white/60">Scheduling with coach Sasha</p>
        </div>
        
        <!-- Step 3: Success Screen -->
        <div id="modal-success-step" class="hidden text-center py-4">
          <span class="material-symbols-outlined text-6xl text-accent-gold mb-4 animate-bounce">check_circle</span>
          <h3 class="text-headline-md font-headline-md text-pure-white mb-3">Booking Requested!</h3>
          <p class="text-sm text-pure-white/80 mb-6 leading-relaxed">
            Thank you, <strong id="success-user-name" class="text-accent-gold"></strong>! Your request for a <strong id="success-user-duration"></strong> lesson on <strong id="success-user-datetime"></strong> has been submitted.
          </p>
          <div class="bg-slate-depth/50 border border-accent-gold/20 p-4 rounded-lg text-left text-xs space-y-2 text-pure-white/80 max-w-sm mx-auto mb-8">
            <h4 class="font-bold text-accent-gold uppercase tracking-wider mb-1">What happens next:</h4>
            <p class="flex items-start gap-1"><span>1.</span> Sasha will review the request against his FIDE & tournament travel schedule.</p>
            <p class="flex items-start gap-1"><span>2.</span> You'll receive a confirmation email within 24 hours.</p>
            <p class="flex items-start gap-1"><span>3.</span> The email will contain the Google Meet link or travel details.</p>
          </div>
          <button id="success-done-btn" class="px-8 py-3 bg-accent-gold hover:bg-opacity-95 text-surface-ebony text-sm font-bold uppercase tracking-widest">
            Done
          </button>
        </div>
      </div>
    </div>
  `;

  // UI Element Cache
  const prevMonthBtn = document.getElementById('prev-month-btn');
  const nextMonthBtn = document.getElementById('next-month-btn');
  const monthYearLabel = document.getElementById('calendar-month-year');
  const daysGrid = document.getElementById('calendar-days-grid');
  
  const durBtn45 = document.getElementById('duration-btn-45');
  const durBtn60 = document.getElementById('duration-btn-60');
  const durBtn120 = document.getElementById('duration-btn-120');
  
  const summaryDuration = document.getElementById('summary-duration');
  const summaryDate = document.getElementById('summary-date');
  const summaryTime = document.getElementById('summary-time');
  
  const noDateMessage = document.getElementById('no-date-selected-message');
  const slotsContainer = document.getElementById('slots-container');
  const morningSlotsEl = document.getElementById('morning-slots');
  const afternoonSlotsEl = document.getElementById('afternoon-slots');
  
  const submitBookingBtn = document.getElementById('book-btn-submit');
  
  const modal = document.getElementById('booking-modal');
  const modalCard = document.getElementById('modal-card');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const modalCancelBtn = document.getElementById('modal-cancel-btn');
  
  const formStep = document.getElementById('modal-form-step');
  const loaderStep = document.getElementById('modal-loader-step');
  const successStep = document.getElementById('modal-success-step');
  const detailsForm = document.getElementById('details-form');
  const successUserName = document.getElementById('success-user-name');
  const successUserDuration = document.getElementById('success-user-duration');
  const successUserDateTime = document.getElementById('success-user-datetime');
  const successDoneBtn = document.getElementById('success-done-btn');

  // --- Session Duration Event Listeners ---
  const durationBtns = [durBtn45, durBtn60, durBtn120];
  durationBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      durationBtns.forEach(b => {
        b.classList.remove('border-accent-gold', 'bg-accent-gold/10', 'text-pure-white');
        b.classList.add('border-white/10', 'text-pure-white/80');
        b.querySelector('span').classList.remove('text-accent-gold');
        b.querySelector('span').classList.add('text-pure-white');
      });
      
      btn.classList.remove('border-white/10', 'text-pure-white/80');
      btn.classList.add('border-accent-gold', 'bg-accent-gold/10', 'text-pure-white');
      btn.querySelector('span').classList.add('text-accent-gold');
      
      state.selectedDuration = btn.getAttribute('data-val');
      updateSummary();
    });
  });

  // --- Calendar Month Navigation ---
  prevMonthBtn.addEventListener('click', () => {
    state.currentDate.setMonth(state.currentDate.getMonth() - 1);
    renderCalendar();
  });

  nextMonthBtn.addEventListener('click', () => {
    state.currentDate.setMonth(state.currentDate.getMonth() + 1);
    renderCalendar();
  });

  // --- Render Calendar Grid ---
  function renderCalendar() {
    const year = state.currentDate.getFullYear();
    const month = state.currentDate.getMonth();
    
    monthYearLabel.innerText = `${monthNames[month]} ${year}`;
    
    // Clear grid
    daysGrid.innerHTML = '';
    
    const firstDayIndex = new Date(year, month, 1).getDay();
    const numberOfDays = new Date(year, month + 1, 0).getDate();
    
    // Fill empty spots for previous month
    for (let i = 0; i < firstDayIndex; i++) {
      const emptyCell = document.createElement('div');
      daysGrid.appendChild(emptyCell);
    }
    
    const today = new Date();
    
    // Fill days
    for (let day = 1; day <= numberOfDays; day++) {
      const cellDate = new Date(year, month, day);
      const button = document.createElement('button');
      button.innerText = day;
      button.className = "calendar-day-btn aspect-square w-full rounded flex items-center justify-center text-sm font-semibold transition-all border border-transparent";
      
      // Highlight current day
      const isToday = cellDate.getDate() === today.getDate() && 
                      cellDate.getMonth() === today.getMonth() && 
                      cellDate.getFullYear() === today.getFullYear();
                      
      if (isToday) {
        button.classList.add('border-accent-gold/40', 'text-accent-gold');
      } else {
        button.classList.add('text-pure-white/80');
      }

      // Check if past date (disable if past today)
      const dateToCompare = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      if (cellDate < dateToCompare) {
        button.disabled = true;
        button.classList.add('opacity-25', 'cursor-not-allowed');
      } else {
        button.addEventListener('click', () => {
          selectDate(cellDate, button);
        });
      }
      
      // Re-apply selected class if matches selectedDate
      if (state.selectedDate && 
          cellDate.getDate() === state.selectedDate.getDate() && 
          cellDate.getMonth() === state.selectedDate.getMonth() && 
          cellDate.getFullYear() === state.selectedDate.getFullYear()) {
        button.classList.add('calendar-day-active');
      }
      
      daysGrid.appendChild(button);
    }
  }

  // --- Select Date Callback ---
  function selectDate(date, buttonEl) {
    state.selectedDate = date;
    
    // Reset any previously selected day class
    const activeBtns = daysGrid.querySelectorAll('.calendar-day-active');
    activeBtns.forEach(btn => btn.classList.remove('calendar-day-active'));
    
    buttonEl.classList.add('calendar-day-active');
    
    state.selectedTimeSlot = null; // Reset slot
    updateSummary();
    renderTimeSlots();
  }

  // --- Render Time Slots based on Date ---
  function renderTimeSlots() {
    noDateMessage.classList.add('hidden');
    slotsContainer.classList.remove('hidden');
    
    // Clear slots
    morningSlotsEl.innerHTML = '';
    afternoonSlotsEl.innerHTML = '';
    
    // Render Morning
    state.availableSlots.morning.forEach(slot => {
      const btn = createSlotButton(slot);
      morningSlotsEl.appendChild(btn);
    });
    
    // Render Afternoon
    state.availableSlots.afternoon.forEach(slot => {
      const btn = createSlotButton(slot);
      afternoonSlotsEl.appendChild(btn);
    });
  }

  function createSlotButton(timeStr) {
    const btn = document.createElement('button');
    btn.className = "w-full text-center py-2.5 rounded border border-white/10 hover:border-accent-gold text-pure-white/80 hover:text-accent-gold text-sm font-semibold transition-all duration-200";
    btn.innerText = timeStr;
    
    if (state.selectedTimeSlot === timeStr) {
      btn.classList.add('border-accent-gold', 'bg-accent-gold/10', 'text-accent-gold');
    }
    
    btn.addEventListener('click', () => {
      // De-select previous
      const allSlotBtns = slotsContainer.querySelectorAll('button');
      allSlotBtns.forEach(b => {
        b.classList.remove('border-accent-gold', 'bg-accent-gold/10', 'text-accent-gold');
        b.classList.add('border-white/10', 'text-pure-white/80');
      });
      
      // Select new
      btn.classList.remove('border-white/10', 'text-pure-white/80');
      btn.classList.add('border-accent-gold', 'bg-accent-gold/10', 'text-accent-gold');
      
      state.selectedTimeSlot = timeStr;
      updateSummary();
    });
    
    return btn;
  }

  // --- Update Booking Summary & Submit Button State ---
  function updateSummary() {
    // 1. Duration text
    let durText = '45 Min Lesson';
    if (state.selectedDuration === '1hr') durText = '1 Hour Lesson';
    if (state.selectedDuration === '2hr') durText = '2 Hour Lesson';
    summaryDuration.innerText = durText;
    
    // 2. Date text
    if (state.selectedDate) {
      const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
      summaryDate.innerText = state.selectedDate.toLocaleDateString('en-US', options);
      summaryDate.classList.remove('text-pure-white/50');
      summaryDate.classList.add('text-pure-white');
    } else {
      summaryDate.innerText = 'Select a date';
      summaryDate.classList.remove('text-pure-white');
      summaryDate.classList.add('text-pure-white/50');
    }
    
    // 3. Time text
    if (state.selectedTimeSlot) {
      summaryTime.innerText = state.selectedTimeSlot;
      summaryTime.classList.remove('text-pure-white/50');
      summaryTime.classList.add('text-pure-white');
    } else {
      summaryTime.innerText = 'Select a time slot';
      summaryTime.classList.remove('text-pure-white');
      summaryTime.classList.add('text-pure-white/50');
    }
    
    // 4. Enable button check
    if (state.selectedDate && state.selectedTimeSlot) {
      submitBookingBtn.disabled = false;
      submitBookingBtn.classList.remove('bg-white/10', 'text-pure-white/40', 'cursor-not-allowed', 'border-white/5');
      submitBookingBtn.classList.add('bg-accent-gold', 'text-surface-ebony', 'hover:scale-[1.02]', 'shadow-lg');
    } else {
      submitBookingBtn.disabled = true;
      submitBookingBtn.classList.remove('bg-accent-gold', 'text-surface-ebony', 'hover:scale-[1.02]', 'shadow-lg');
      submitBookingBtn.classList.add('bg-white/10', 'text-pure-white/40', 'cursor-not-allowed', 'border-white/5');
    }
  }

  // --- Form Modal Trigger & Event Listeners ---
  submitBookingBtn.addEventListener('click', () => {
    if (state.selectedDate && state.selectedTimeSlot) {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      setTimeout(() => {
        modalCard.classList.remove('scale-95');
        modalCard.classList.add('scale-100');
      }, 50);
      
      // Reset Modal Step
      formStep.classList.remove('hidden');
      loaderStep.classList.add('hidden');
      successStep.classList.add('hidden');
      detailsForm.reset();
    }
  });

  const closeModal = () => {
    modalCard.classList.remove('scale-100');
    modalCard.classList.add('scale-95');
    setTimeout(() => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }, 200);
  };

  closeModalBtn.addEventListener('click', closeModal);
  modalCancelBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // --- Details Form Submission ---
  detailsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nameVal = document.getElementById('form-name').value;
    
    // Switch to Loader Step
    formStep.classList.add('hidden');
    loaderStep.classList.remove('hidden');
    
    // Simulate API request
    setTimeout(() => {
      loaderStep.classList.add('hidden');
      successStep.classList.remove('hidden');
      
      // Update Success content
      successUserName.innerText = nameVal;
      
      let durText = '45 Min';
      if (state.selectedDuration === '1hr') durText = '1 Hour';
      if (state.selectedDuration === '2hr') durText = '2 Hours';
      successUserDuration.innerText = durText;
      
      const dateOptions = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
      const dateStr = state.selectedDate.toLocaleDateString('en-US', dateOptions);
      successUserDateTime.innerText = `${dateStr} at ${state.selectedTimeSlot}`;
      
    }, 1500);
  });

  successDoneBtn.addEventListener('click', () => {
    closeModal();
    // Reset calendar slot state
    state.selectedDate = null;
    state.selectedTimeSlot = null;
    updateSummary();
    
    // Redraw calendar & reset slots pane
    renderCalendar();
    slotsContainer.classList.add('hidden');
    noDateMessage.classList.remove('hidden');
  });

  // Initial Calendar Draw
  renderCalendar();
}
