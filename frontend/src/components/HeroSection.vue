<template>
  <section id="hero" class="hero">

    <!-- Floating decorations -->
    <div class="floaters" aria-hidden="true">
      <span v-for="f in floaters" :key="f.id" class="floater" :style="f.style">{{ f.emoji }}</span>
    </div>

    <div class="container">
      <div class="hero-inner">

        <!-- Pixel character card -->
        <div class="char-card pbox pbox-green">
          <div class="char-tag">PLAYER_001</div>

          <!-- CSS Pixel character -->
          <div class="sprite-wrap">
            <div class="sprite">
              <!-- Hair -->
              <div class="s-hair"></div>
              <!-- Head -->
              <div class="s-head">
                <div class="s-eye left"></div>
                <div class="s-eye right"></div>
                <div class="s-mouth"></div>
              </div>
              <!-- Shirt -->
              <div class="s-body"></div>
              <!-- Arms -->
              <div class="s-arm left"></div>
              <div class="s-arm right"></div>
              <!-- Legs -->
              <div class="s-leg left"></div>
              <div class="s-leg right"></div>
              <!-- Feet -->
              <div class="s-foot left"></div>
              <div class="s-foot right"></div>
            </div>
          </div>

          <!-- Stat bars -->
          <div class="char-bars">
            <div class="bar-row">
              <span class="bar-lbl">HP</span>
              <div class="bar-track"><div class="bar-fill hp"></div></div>
              <span class="bar-val">100</span>
            </div>
            <div class="bar-row">
              <span class="bar-lbl">XP</span>
              <div class="bar-track"><div class="bar-fill xp"></div></div>
              <span class="bar-val">75</span>
            </div>
            <div class="bar-row">
              <span class="bar-lbl">SP</span>
              <div class="bar-track"><div class="bar-fill sp"></div></div>
              <span class="bar-val">88</span>
            </div>
          </div>

          <div class="char-level">
            <span class="lv-label">LEVEL</span>
            <span class="lv-num">99</span>
          </div>
        </div>

        <!-- Hero text -->
        <div class="hero-text">
          <p class="hero-greeting">
            <span class="blink">▶</span> WELCOME TO MY WORLD
          </p>

          <h1 class="hero-name">
            <span class="name-main">JUAN DELA</span>
            <span class="name-accent">CRUZ</span>
          </h1>

          <div class="hero-role">
            <span class="role-bracket">[</span>
            <span class="role-text">{{ displayedRole }}</span>
            <span class="role-cursor" :class="{ invisible: !cursorVisible }">█</span>
            <span class="role-bracket">]</span>
          </div>

          <p class="hero-bio">
            Full-stack developer building pixel-perfect experiences.
            I craft UIs with Vue.js, power them with NestJS backends,
            and store everything in Supabase. ⚡
          </p>

          <!-- Stat counters -->
          <div class="hero-stats">
            <div class="stat pbox" v-for="s in stats" :key="s.label">
              <div class="stat-num" :style="{ color: s.color }">{{ s.value }}</div>
              <div class="stat-label">{{ s.label }}</div>
            </div>
          </div>

          <div class="hero-cta">
            <a href="#projects" class="pbtn" @click.prevent="scrollTo('#projects')">
              🗺️ PROJECTS
            </a>
            <a href="#guestbook" class="pbtn pbtn-blue" @click.prevent="scrollTo('#guestbook')">
              📜 GUESTBOOK
            </a>
            <a href="https://github.com" target="_blank" class="pbtn" style="background:#1a2332;border-color:#4b5563;box-shadow:4px 4px 0 #111827">
              🐙 GITHUB
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Ground row -->
    <div class="ground" aria-hidden="true">
      <div v-for="i in 40" :key="i" class="ground-tile" :class="i % 2 === 0 ? 'dark' : 'light'"></div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Typing effect
const roles = [
  'FULL-STACK DEVELOPER',
  'VUE.JS SPECIALIST',
  'NESTJS ARCHITECT',
  'UI/UX ENTHUSIAST',
  'OPEN SOURCE FAN',
]
const displayedRole = ref('')
const cursorVisible = ref(true)
let rIdx = 0, cIdx = 0, isTyping = true, timer = null

const type = () => {
  const target = roles[rIdx]
  if (isTyping) {
    if (cIdx < target.length) {
      displayedRole.value = target.slice(0, ++cIdx)
      timer = setTimeout(type, 75)
    } else {
      isTyping = false
      timer = setTimeout(type, 2200)
    }
  } else {
    if (cIdx > 0) {
      displayedRole.value = target.slice(0, --cIdx)
      timer = setTimeout(type, 35)
    } else {
      isTyping = true
      rIdx = (rIdx + 1) % roles.length
      timer = setTimeout(type, 300)
    }
  }
}

const cursorTimer = ref(null)

// Floaters
const floaters = [
  { id:1, emoji:'🌿', style:'top:12%;left:4%;animation-duration:3.8s;animation-delay:0s' },
  { id:2, emoji:'⚡', style:'top:22%;right:6%;animation-duration:3.2s;animation-delay:.6s' },
  { id:3, emoji:'💎', style:'top:58%;left:2%;animation-duration:4.5s;animation-delay:1.2s' },
  { id:4, emoji:'🔥', style:'top:70%;right:4%;animation-duration:3.5s;animation-delay:.3s' },
  { id:5, emoji:'⭐', style:'top:38%;right:10%;animation-duration:4s;animation-delay:.9s' },
  { id:6, emoji:'🍃', style:'top:82%;left:7%;animation-duration:5s;animation-delay:1.8s' },
  { id:7, emoji:'🌟', style:'top:48%;left:14%;animation-duration:3.6s;animation-delay:2.1s' },
]

const stats = [
  { value: '4+',  label: 'YRS EXP',   color: 'var(--green)' },
  { value: '20+', label: 'PROJECTS',  color: 'var(--blue)' },
  { value: '10+', label: 'TECH USED', color: 'var(--yellow)' },
]

const scrollTo = (href) => {
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

onMounted(() => {
  type()
  cursorTimer.value = setInterval(() => { cursorVisible.value = !cursorVisible.value }, 500)
})
onUnmounted(() => {
  clearTimeout(timer)
  clearInterval(cursorTimer.value)
})
</script>

<style scoped>
/* ---- SECTION ---- */
.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  padding-top: 68px;
  background:
    radial-gradient(ellipse at 15% 60%, rgba(74,222,128,.07) 0%, transparent 55%),
    radial-gradient(ellipse at 85% 20%, rgba(56,189,248,.05) 0%, transparent 55%),
    var(--bg);
}

.floaters { position: absolute; inset: 0; pointer-events: none; z-index: 0; }
.floater {
  position: absolute;
  font-size: 22px;
  animation: float var(--dur,4s) ease-in-out infinite;
  opacity: .35;
}

/* ---- INNER LAYOUT ---- */
.hero-inner {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 64px;
  padding: 72px 0 96px;
  position: relative;
  z-index: 1;
}

/* =====================
   PIXEL CHARACTER CARD
   ===================== */
.char-card {
  flex-shrink: 0;
  width: 220px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  animation: float 3s ease-in-out infinite;
}

.char-tag {
  font-family: var(--font-pixel);
  font-size: 7px;
  color: var(--green);
  letter-spacing: 2px;
  text-align: center;
}

/* -- CSS Pixel Sprite -- */
.sprite-wrap {
  display: flex;
  justify-content: center;
  padding: 12px 0;
}
.sprite {
  position: relative;
  width: 80px;
  height: 112px;
  image-rendering: pixelated;
}

/* Hair */
.s-hair {
  position: absolute;
  top: 0; left: 16px;
  width: 48px; height: 10px;
  background: #1e1b4b;
  border-bottom: 4px solid #312e81;
}

/* Head */
.s-head {
  position: absolute;
  top: 6px; left: 16px;
  width: 48px; height: 44px;
  background: #fde68a;
  border: 4px solid #d97706;
  box-shadow: inset -6px -6px 0 #f59e0b;
}
.s-eye {
  position: absolute;
  width: 8px; height: 8px;
  background: #1c1917;
  top: 14px;
}
.s-eye.left  { left: 8px; }
.s-eye.right { right: 8px; }

.s-mouth {
  position: absolute;
  bottom: 8px; left: 10px;
  width: 24px; height: 4px;
  background: #92400e;
}

/* Body */
.s-body {
  position: absolute;
  top: 54px; left: 12px;
  width: 56px; height: 36px;
  background: var(--green-dark);
  border: 4px solid #14532d;
  box-shadow: inset -6px -6px 0 #15803d;
}

/* Arms */
.s-arm {
  position: absolute;
  top: 56px;
  width: 14px; height: 30px;
  background: var(--green-dark);
  border: 3px solid #14532d;
}
.s-arm.left  { left: 0; transform: rotate(8deg); }
.s-arm.right { right: 0; transform: rotate(-8deg); }

/* Legs */
.s-leg {
  position: absolute;
  top: 90px;
  width: 20px; height: 24px;
  background: #1e40af;
  border: 3px solid #1e3a8a;
}
.s-leg.left  { left: 14px; }
.s-leg.right { right: 14px; }

/* Feet */
.s-foot {
  position: absolute;
  top: 110px;
  width: 24px; height: 10px;
  background: #292524;
  border: 3px solid #1c1917;
}
.s-foot.left  { left: 10px; }
.s-foot.right { right: 10px; }

/* -- Stat Bars -- */
.char-bars { width: 100%; display: flex; flex-direction: column; gap: 8px; }
.bar-row { display: flex; align-items: center; gap: 8px; }
.bar-lbl {
  font-family: var(--font-pixel);
  font-size: 7px; color: var(--text2);
  width: 18px; text-align: right;
}
.bar-val {
  font-family: var(--font-pixel);
  font-size: 7px; color: var(--text2);
  width: 24px;
}
.bar-track {
  flex: 1; height: 10px;
  background: var(--bg);
  border: 2px solid var(--border);
}
.bar-fill { height: 100%; transition: width 1.6s ease; }
.bar-fill.hp { width: 100%; background: linear-gradient(90deg, #16a34a, #4ade80); }
.bar-fill.xp { width: 75%;  background: linear-gradient(90deg, #1d4ed8, #38bdf8); }
.bar-fill.sp { width: 88%;  background: linear-gradient(90deg, #b45309, #fbbf24); }

/* Level badge */
.char-level {
  display: flex; align-items: center; gap: 8px;
  background: var(--yellow);
  padding: 6px 14px;
  border: 2px solid #92400e;
  box-shadow: 2px 2px 0 #78350f;
}
.lv-label {
  font-family: var(--font-pixel);
  font-size: 7px; color: #000;
}
.lv-num {
  font-family: var(--font-pixel);
  font-size: 14px; color: #000;
}

/* ---- HERO TEXT ---- */
.hero-text {
  flex: 1;
  animation: fadeUp .7s ease both;
}

.hero-greeting {
  font-family: var(--font-pixel);
  font-size: 9px;
  color: var(--green);
  letter-spacing: 3px;
  margin-bottom: 24px;
  opacity: .85;
}
.blink { animation: blink .9s step-end infinite; color: var(--yellow); }

.hero-name {
  display: flex;
  flex-direction: column;
  line-height: 1.05;
  margin-bottom: 18px;
}
.name-main {
  font-family: 'Outfit', sans-serif;
  font-weight: 700;
  font-size: clamp(38px, 6vw, 72px);
  color: var(--text);
  text-shadow: 4px 4px 0 rgba(0,0,0,.6);
  letter-spacing: -1px;
}
.name-accent {
  font-family: 'Outfit', sans-serif;
  font-weight: 700;
  font-size: clamp(38px, 6vw, 72px);
  color: var(--green);
  text-shadow: 4px 4px 0 var(--green-dark), 0 0 48px rgba(74,222,128,.35);
  letter-spacing: -1px;
  animation: glitch 8s infinite;
}

.hero-role {
  font-family: var(--font-pixel);
  font-size: clamp(8px, 1.3vw, 11px);
  color: var(--blue);
  letter-spacing: 2px;
  margin-bottom: 28px;
  min-height: 28px;
  display: flex; align-items: center; gap: 4px;
}
.role-bracket { color: var(--yellow); }
.role-cursor { color: var(--blue); }
.invisible { opacity: 0; }

.hero-bio {
  font-family: var(--font-body);
  font-size: 16px;
  color: var(--text2);
  line-height: 1.8;
  max-width: 520px;
  margin-bottom: 36px;
  padding-left: 18px;
  border-left: 3px solid var(--green-dark);
}

/* Stats */
.hero-stats {
  display: flex;
  gap: 16px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}
.stat {
  text-align: center;
  padding: 16px 22px;
  min-width: 88px;
  transition: all .15s;
}
.stat:hover {
  transform: translate(-2px,-2px);
  border-color: var(--green);
  box-shadow: 5px 5px 0 var(--green-dark);
}
.stat-num {
  font-family: var(--font-pixel);
  font-size: 20px;
  margin-bottom: 6px;
  text-shadow: 0 0 12px currentColor;
}
.stat-label {
  font-family: var(--font-pixel);
  font-size: 6px;
  color: var(--text3);
  letter-spacing: 1px;
}

.hero-cta { display: flex; gap: 14px; flex-wrap: wrap; }

/* Ground */
.ground {
  display: flex;
  height: 28px;
  margin-top: auto;
}
.ground-tile {
  flex: 1;
  height: 100%;
  border-top: 4px solid var(--green);
}
.ground-tile.dark  { background: var(--green-dark); border-top-color: var(--green-mid); }
.ground-tile.light { background: #15803d; }

/* ---- RESPONSIVE ---- */
@media (max-width: 900px) {
  .hero-inner {
    flex-direction: column;
    text-align: center;
    gap: 48px;
    padding: 48px 0 80px;
  }
  .hero-bio {
    border-left: none;
    border-top: 3px solid var(--green-dark);
    padding: 18px 0 0;
    margin: 0 auto 36px;
  }
  .hero-stats { justify-content: center; }
  .hero-cta   { justify-content: center; }
}

@media (max-width: 480px) {
  .char-card { width: 190px; }
  .hero-cta { flex-direction: column; align-items: center; }
  .pbtn { width: 220px; justify-content: center; }
  .hero-stats { gap: 10px; }
  .stat { padding: 12px 16px; min-width: 76px; }
}
</style>