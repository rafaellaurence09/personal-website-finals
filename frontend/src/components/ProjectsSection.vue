<template>
  <section id="projects" class="section projects-section">
    <div class="container">
      <h2 class="section-title">WORLD MAP — PROJECTS</h2>

      <div class="projects-grid">
        <div
          v-for="p in projects"
          :key="p.title"
          class="proj-card pbox"
          :style="`--acc: ${p.accent}; --acc-dark: ${p.accentDark};`"
        >
          <!-- Thumbnail -->
          <div class="proj-thumb" :style="{ background: p.thumbBg }">
            <span class="proj-thumb-icon">{{ p.icon }}</span>
            <span class="pbadge proj-type" :style="{ color: p.accent, borderColor: p.accent }">
              {{ p.type }}
            </span>
            <div class="proj-thumb-pattern"></div>
          </div>

          <!-- Body -->
          <div class="proj-body">
            <h3 class="proj-title">{{ p.title }}</h3>
            <p class="proj-desc">{{ p.desc }}</p>

            <div class="proj-tags">
              <span class="ptag" v-for="t in p.tags" :key="t" :style="{ borderColor: p.accentDark, color: p.accent, background: p.accent + '0d' }">
                {{ t }}
              </span>
            </div>

            <div class="proj-footer">
              <div class="proj-stats">
                <span class="ps">⭐ {{ p.stars }}</span>
                <span class="ps">🔱 {{ p.forks }}</span>
              </div>
              <div class="proj-links">
                <a :href="p.demo" target="_blank" class="pbtn pbtn-sm">▶ DEMO</a>
                <a :href="p.repo" target="_blank" class="pbtn pbtn-sm pbtn-blue">🐙 CODE</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const projects = [
  {
    title: 'PROFILE QUEST',
    desc: 'This site! Vue.js + NestJS + Supabase with a Growtopia pixel-art design.',
    icon: '🌿', type: 'WEB APP',
    accent: '#4ade80', accentDark: '#16a34a',
    thumbBg: 'linear-gradient(135deg,#14532d,#166534)',
    tags: ['Vue.js','NestJS','Supabase','Vercel'],
    stars: 42, forks: 8, demo: '#', repo: 'https://github.com',
  },
  {
    title: 'DUNGEON TASKS',
    desc: 'Gamified task management with XP, quests, and party features for teams.',
    icon: '⚔️', type: 'FULL STACK',
    accent: '#a78bfa', accentDark: '#6d28d9',
    thumbBg: 'linear-gradient(135deg,#4c1d95,#5b21b6)',
    tags: ['React','Node.js','MongoDB','Socket.io'],
    stars: 87, forks: 23, demo: '#', repo: 'https://github.com',
  },
  {
    title: 'PIXEL SHOP',
    desc: 'E-commerce with pixel art UI, cart, Stripe payments and admin dashboard.',
    icon: '🏪', type: 'E-COMMERCE',
    accent: '#fbbf24', accentDark: '#b45309',
    thumbBg: 'linear-gradient(135deg,#78350f,#92400e)',
    tags: ['Vue.js','NestJS','PostgreSQL','Stripe'],
    stars: 55, forks: 14, demo: '#', repo: 'https://github.com',
  },
  {
    title: 'API GATEWAY',
    desc: 'REST API boilerplate: JWT auth, rate limiting, Swagger docs, Supabase.',
    icon: '🔗', type: 'BACKEND',
    accent: '#38bdf8', accentDark: '#0369a1',
    thumbBg: 'linear-gradient(135deg,#1e3a8a,#1e40af)',
    tags: ['NestJS','JWT','Swagger','Supabase'],
    stars: 130, forks: 47, demo: '#', repo: 'https://github.com',
  },
  {
    title: 'WEATHER WORLD',
    desc: 'Real-time weather with pixel art animations per condition and geolocation.',
    icon: '🌦️', type: 'API PROJECT',
    accent: '#7dd3fc', accentDark: '#0c4a6e',
    thumbBg: 'linear-gradient(135deg,#0c4a6e,#075985)',
    tags: ['Vue.js','OpenWeather API','Geolocation'],
    stars: 38, forks: 9, demo: '#', repo: 'https://github.com',
  },
  {
    title: 'CHAT DUNGEON',
    desc: 'Real-time chat with rooms, usernames, emotes, WebSocket messaging.',
    icon: '💬', type: 'REAL-TIME',
    accent: '#fb923c', accentDark: '#c2410c',
    thumbBg: 'linear-gradient(135deg,#7c2d12,#9a3412)',
    tags: ['Socket.io','Vue.js','Redis','Express'],
    stars: 61, forks: 17, demo: '#', repo: 'https://github.com',
  },
]
</script>

<style scoped>
.projects-section {
  background: linear-gradient(180deg, transparent, rgba(74,222,128,.025), transparent);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.proj-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: transform .2s, box-shadow .2s, border-color .2s;
}
.proj-card:hover {
  transform: translate(-3px,-3px);
  border-color: var(--acc);
  box-shadow: 7px 7px 0 var(--acc-dark);
}

/* Thumb */
.proj-thumb {
  height: 106px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  overflow: hidden;
}
.proj-thumb-icon {
  font-size: 42px;
  filter: drop-shadow(2px 4px 0 rgba(0,0,0,.5));
  z-index: 1;
}
.proj-type { z-index: 1; }
.proj-thumb-pattern {
  position: absolute; inset: 0;
  background: repeating-linear-gradient(
    45deg, transparent, transparent 6px,
    rgba(0,0,0,.08) 6px, rgba(0,0,0,.08) 12px
  );
  pointer-events: none;
}

/* Body */
.proj-body {
  padding: 16px 18px 18px;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.proj-title {
  font-family: var(--font-pixel);
  font-size: 9px;
  color: var(--text);
  margin-bottom: 10px;
  letter-spacing: 1px;
}
.proj-desc {
  font-family: var(--font-body);
  font-size: 14px;
  color: var(--text2);
  line-height: 1.65;
  flex: 1;
  margin-bottom: 14px;
}
.proj-tags { margin-bottom: 16px; }

.proj-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  flex-wrap: wrap;
}
.proj-stats { display: flex; gap: 12px; }
.ps {
  font-family: var(--font-pixel);
  font-size: 7px;
  color: var(--text3);
}
.proj-links { display: flex; gap: 8px; }

@media (max-width: 1024px) {
  .projects-grid { grid-template-columns: repeat(2,1fr); }
}
@media (max-width: 640px) {
  .projects-grid { grid-template-columns: 1fr; }
}
</style>