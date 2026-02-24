<template>
  <section id="skills" class="section skills-section">
    <div class="container">
      <h2 class="section-title">SKILLS & INVENTORY</h2>

      <div class="skills-grid">
        <div
          v-for="cat in categories"
          :key="cat.name"
          class="skill-cat pbox"
        >
          <div class="cat-head" :style="{ borderBottomColor: cat.color + '55' }">
            <span class="cat-icon">{{ cat.icon }}</span>
            <span class="cat-name">{{ cat.name }}</span>
            <span class="pbadge" :style="{ color: cat.color, borderColor: cat.color }">
              {{ cat.skills.length }} ITEMS
            </span>
          </div>

          <div class="skill-list">
            <div v-for="skill in cat.skills" :key="skill.name" class="skill-item">
              <div class="skill-row">
                <span class="sk-icon">{{ skill.icon }}</span>
                <span class="sk-name">{{ skill.name }}</span>
                <span class="sk-pct" :style="{ color: cat.color }">{{ skill.level }}%</span>
              </div>
              <div class="sk-track">
                <div
                  class="sk-fill"
                  :style="{
                    width: skill.level + '%',
                    background: `linear-gradient(90deg, ${cat.colorDark}, ${cat.color})`,
                    boxShadow: `0 0 8px ${cat.color}66`,
                  }"
                ></div>
                <div class="sk-segments">
                  <div v-for="i in 9" :key="i" class="sk-seg"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tools row -->
      <div class="tools-row">
        <span class="tools-label">🔧 EQUIPPED:</span>
        <div class="tools-tags">
          <span class="ptag" v-for="t in tools" :key="t">{{ t }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const categories = [
  {
    name: 'FRONTEND', icon: '🖥️',
    color: '#4ade80', colorDark: '#16a34a',
    skills: [
      { name: 'Vue.js 3',    icon: '💚', level: 92 },
      { name: 'React',       icon: '⚛️', level: 80 },
      { name: 'HTML / CSS',  icon: '🎨', level: 96 },
      { name: 'Tailwind',    icon: '🌊', level: 87 },
    ],
  },
  {
    name: 'BACKEND', icon: '⚙️',
    color: '#38bdf8', colorDark: '#0369a1',
    skills: [
      { name: 'NestJS',      icon: '🏗️', level: 85 },
      { name: 'Node.js',     icon: '🟢', level: 88 },
      { name: 'Python',      icon: '🐍', level: 74 },
      { name: 'REST APIs',   icon: '🔗', level: 93 },
    ],
  },
  {
    name: 'DATABASE', icon: '🗄️',
    color: '#a78bfa', colorDark: '#6d28d9',
    skills: [
      { name: 'Supabase',    icon: '⚡', level: 88 },
      { name: 'PostgreSQL',  icon: '🐘', level: 82 },
      { name: 'MongoDB',     icon: '🍃', level: 72 },
      { name: 'Redis',       icon: '🔴', level: 62 },
    ],
  },
  {
    name: 'DEVOPS', icon: '🚀',
    color: '#fbbf24', colorDark: '#b45309',
    skills: [
      { name: 'Vercel',      icon: '▲', level: 92 },
      { name: 'Git / GitHub',icon: '🐙', level: 96 },
      { name: 'Docker',      icon: '🐳', level: 70 },
      { name: 'CI/CD',       icon: '🔄', level: 74 },
    ],
  },
]

const tools = [
  'VS Code','Vite','npm','Postman','Figma',
  'Vercel','Supabase','GitHub','Insomnia','Linux',
]
</script>

<style scoped>
.skills-section {
  background: linear-gradient(180deg, transparent, rgba(56,189,248,.03), transparent);
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-bottom: 36px;
}

.skill-cat { overflow: hidden; }

.cat-head {
  background: var(--panel2);
  padding: 13px 18px;
  display: flex; align-items: center; gap: 10px;
  border-bottom: 2px solid var(--border);
  font-family: var(--font-pixel);
  font-size: 9px;
  color: var(--text);
  letter-spacing: 1px;
}
.cat-icon  { font-size: 16px; }
.cat-name  { flex: 1; }

.skill-list { padding: 16px; display: flex; flex-direction: column; gap: 14px; }

.skill-row {
  display: flex; align-items: center; gap: 8px;
  margin-bottom: 6px;
}
.sk-icon { font-size: 14px; }
.sk-name {
  font-family: var(--font-pixel);
  font-size: 7px;
  color: var(--text);
  flex: 1;
  letter-spacing: 1px;
}
.sk-pct {
  font-family: var(--font-pixel);
  font-size: 8px;
}

.sk-track {
  height: 14px;
  background: var(--bg);
  border: 2px solid var(--border);
  position: relative;
  overflow: hidden;
}
.sk-fill {
  height: 100%;
  transition: width 1.2s cubic-bezier(.2,1,.3,1);
}
.sk-segments {
  position: absolute; inset: 0;
  display: flex; pointer-events: none;
}
.sk-seg {
  flex: 1;
  border-right: 2px solid rgba(0,0,0,.35);
}

/* Tools */
.tools-row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}
.tools-label {
  font-family: var(--font-pixel);
  font-size: 8px;
  color: var(--text3);
  flex-shrink: 0;
  letter-spacing: 1px;
}
.tools-tags { display: flex; flex-wrap: wrap; }

@media (max-width: 768px) {
  .skills-grid { grid-template-columns: 1fr; }
}
</style>