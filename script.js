/* ════════════════════════════════════════════
   CHARAN'S BIRTHDAY SCRAPBOOK — script.js
   Interactive 13-Step Story Logic
   ════════════════════════════════════════════ */

'use strict';

const TOTAL_PAGES = 13;
let currentPage = 1;
let audioCtx = null;

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  renderProgressBar();
  showPage(1);
});

// Sound Effects via Web Audio API
function playSound(type = 'pop') {
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    if (type === 'pop') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(250, audioCtx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.12);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.13);
    } else if (type === 'fanfare') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, audioCtx.currentTime);
      osc.frequency.setValueAtTime(554, audioCtx.currentTime + 0.1);
      osc.frequency.setValueAtTime(659, audioCtx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.35);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.36);
    }
  } catch (_) { /* Audio fallback silent */ }
}

// Show Specific Page
function showPage(pageId) {
  const num = typeof pageId === 'number' ? pageId : parseInt(pageId);
  if (isNaN(num)) return;

  currentPage = num;
  const pages = document.querySelectorAll('.page');
  pages.forEach(p => p.classList.remove('active'));

  const target = document.getElementById(`page${num}`);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    updateProgressBar(num);
    playSound('pop');
  }
}

// Progress Dots Bar
function renderProgressBar() {
  const bar = document.getElementById('progressBar');
  if (!bar) return;
  bar.innerHTML = '';
  for (let i = 1; i <= TOTAL_PAGES; i++) {
    const dot = document.createElement('div');
    dot.className = `progress-dot ${i === 1 ? 'active' : ''}`;
    dot.id = `dot-${i}`;
    bar.appendChild(dot);
  }
}

function updateProgressBar(pageNum) {
  for (let i = 1; i <= TOTAL_PAGES; i++) {
    const dot = document.getElementById(`dot-${i}`);
    if (dot) {
      if (i <= pageNum) dot.classList.add('active');
      else dot.classList.remove('active');
    }
  }
}

// STEP 2: Gift Opening
function openGift(element, message) {
  element.classList.add('opened');
  const popup = document.getElementById('gift-message');
  if (popup) {
    popup.style.display = 'block';
    popup.innerHTML = `🎁 ${message}`;
  }
  playSound('pop');
  spawnConfetti(20);
}

// STEP 4: Rules Check & Stamp
function checkRules() {
  const r1 = document.getElementById('rule1')?.checked;
  const r2 = document.getElementById('rule2')?.checked;
  const r3 = document.getElementById('rule3')?.checked;

  const stampBtn = document.getElementById('stampBtn');
  if (stampBtn && r1 && r2 && r3) {
    stampBtn.style.animation = 'pulse 1s infinite';
  }
}

function stampApproved() {
  const r1 = document.getElementById('rule1')?.checked;
  const r2 = document.getElementById('rule2')?.checked;
  const r3 = document.getElementById('rule3')?.checked;

  if (!r1 || !r2 || !r3) {
    alert('Please check all 3 rules first, Thigne! 😜');
    return;
  }

  const badge = document.getElementById('stampBadge');
  const nextBtn = document.getElementById('ruleNextBtn');
  if (badge) badge.style.display = 'inline-block';
  if (nextBtn) nextBtn.style.display = 'inline-flex';

  playSound('fanfare');
  spawnConfetti(30);
}

// STEP 5: Blow Candles
let blownCount = 0;
function blowCandle(element) {
  if (element.classList.contains('blown')) return;
  element.classList.add('blown');
  blownCount++;
  playSound('pop');

  if (blownCount >= 3) {
    const banner = document.getElementById('wishBanner');
    if (banner) banner.style.display = 'block';
    playSound('fanfare');
    spawnConfetti(60);
  }
}

// STEP 6: Flip Memories Cards
function flipMemory(card) {
  card.classList.toggle('flipped');
  playSound('pop');
}

// STEP 7: Highlight Dictionary Card
function highlightDict(card) {
  card.classList.toggle('highlighted');
  playSound('pop');
}

// STEP 8: Friendship Test
function runFriendshipTest(btn) {
  const result = document.getElementById('statResult');
  if (result) result.style.display = 'inline-block';

  const fills = document.querySelectorAll('.bar-fill');
  fills.forEach(f => {
    const w = f.style.width;
    f.style.width = '0%';
    setTimeout(() => { f.style.width = w; }, 100);
  });

  playSound('fanfare');
  spawnConfetti(40);
}

// STEP 9: Scoreboard Dodge Button
function dodgeClick(btn) {
  const msg = document.getElementById('dodgeMsg');
  if (msg) msg.style.display = 'block';

  const randomX = (Math.random() - 0.5) * 120;
  const randomY = (Math.random() - 0.5) * 60;
  btn.style.transform = `translate(${randomX}px, ${randomY}px)`;
  playSound('pop');
}

// STEP 10: Secret Vault Key Turn
function unlockVault() {
  const lock = document.getElementById('lockIcon');
  const msg = document.getElementById('vaultUnlockMsg');
  const nextBtn = document.getElementById('vaultNextBtn');

  if (lock) lock.textContent = '🔓';
  if (msg) msg.style.display = 'block';
  if (nextBtn) nextBtn.style.display = 'inline-flex';

  playSound('fanfare');
  spawnConfetti(50);
}

// STEP 11: Unfold Sticky Notes
function unfoldNote(note) {
  note.style.transform = 'scale(1.06) rotate(0deg)';
  playSound('pop');
}

// STEP 12: Pinky Promise
function makePromise(area) {
  const badge = document.getElementById('promiseBadge');
  const nextBtn = document.getElementById('promiseNextBtn');
  if (badge) badge.style.display = 'inline-block';
  if (nextBtn) nextBtn.style.display = 'inline-flex';

  playSound('fanfare');
  spawnConfetti(50);
}

// STEP 13: Final Hug Button
function sendHug() {
  playSound('fanfare');
  spawnConfetti(100);
  alert('🤗 Virtual Hug sent successfully to Thigne! ❤️');
}

// Confetti Spawner Engine
function spawnConfetti(count = 30) {
  const container = document.getElementById('confetti-container');
  if (!container) return;

  const colors = ['#d32f2f', '#ffb300', '#00897b', '#ab47bc', '#ff8a80', '#e040fb'];

  for (let i = 0; i < count; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDuration = `${1.8 + Math.random() * 1.5}s`;
    piece.style.animationDelay = `${Math.random() * 0.4}s`;
    container.appendChild(piece);

    setTimeout(() => { piece.remove(); }, 3500);
  }
}
