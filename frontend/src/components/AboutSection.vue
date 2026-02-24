<template>
  <section id="about" class="section about-section">
    <div class="container">
      <h2 class="section-title">CHARACTER PROFILE</h2>

      <div class="about-grid">

        <!-- Info card -->
        <div class="info-card pbox pbox-green">
          <div class="card-head">
            <span>📋</span>
            <span>CHARACTER INFO</span>
          </div>
          <div class="info-list">
            <div class="info-row" v-for="row in info" :key="row.key">
              <span class="info-key">{{ row.key }}</span>
              <span class="info-val" :style="row.color ? { color: row.color } : {}">{{ row.val }}</span>
            </div>
          </div>
        </div>

        <!-- Right column -->
        <div class="about-right">

          <!-- Bio -->
          <div class="bio-box pbox">
            <div class="box-head">
              <span>📜</span>
              <span class="box-title">PLAYER STORY</span>
              <span class="pbadge" style="color:var(--yellow);border-color:var(--yellow)">MAIN QUEST</span>
            </div>
            <div class="bio-text">
              <p>
                Hey there, adventurer! I'm a passionate full-stack developer who loves building
                things for the web. I specialize in <strong>Vue.js</strong> on the frontend and
                <strong>NestJS</strong> on the backend, connecting it all to <strong>Supabase</strong>.
              </p>
              <p>
                When I'm not shipping features or squashing bugs, you'll find me exploring new
                frameworks, designing pixel art, or getting lost in a good RPG. I believe in clean
                code, great UX, and always leveling up.
              </p>
            </div>
          </div>

          <!-- Achievements -->
          <div class="achievements">
            <p class="ach-title">🏆 ACHIEVEMENTS</p>
            <div class="ach-grid">
              <div class="ach-item pbox" v-for="a in achievements" :key="a.title">
                <span class="ach-icon">{{ a.icon }}</span>
                <div>
                  <div class="ach-name">{{ a.title }}</div>
                  <div class="ach-desc">{{ a.desc }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const info = [
  { key: 'NAME',     val: 'Rafael Laurence E. Martinez' },
  { key: 'ROLE',     val: 'Full-Stack Dev',    color: 'var(--green)' },
  { key: 'LOCATION', val: 'Manila, PH 🇵🇭' },
  { key: 'STATUS',   val: '✅ Open to work',   color: 'var(--green)' },
  { key: 'SCHOOL',   val: 'RTU / Asia Pacific College' },
  { key: 'JOINED',   val: '2020' },
  { key: 'GUILD',    val: 'Open Source PH' },
]

const achievements = [
  { icon: '🚀', title: 'FIRST DEPLOY',  desc: 'Launched first web app' },
  { icon: '🔥', title: 'CODE STREAK',   desc: '100+ day GitHub streak' },
  { icon: '⭐', title: 'STAR HUNTER',   desc: '50+ GitHub stars' },
  { icon: '🤝', title: 'COLLABORATOR',  desc: '10+ team projects' },
]
</script>

<style scoped>
.about-section {
  background: linear-gradient(180deg, transparent 0%, rgba(74,222,128,.03) 50%, transparent 100%);
}

.about-grid {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 28px;
  align-items: start;
}

/* Info card */
.info-card { overflow: hidden; align-self: start; }
.card-head {
  background: var(--green-dark);
  padding: 12px 16px;
  display: flex; align-items: center; gap: 10px;
  font-family: var(--font-pixel);
  font-size: 9px;
  color: #fff;
  letter-spacing: 2px;
  border-bottom: 2px solid var(--border);
}
.info-list { padding: 8px 0; }
.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 11px 16px;
  border-bottom: 1px solid var(--border);
  gap: 12px;
}
.info-row:last-child { border-bottom: none; }
.info-key {
  font-family: var(--font-pixel);
  font-size: 7px;
  color: var(--text3);
  flex-shrink: 0;
  letter-spacing: 1px;
}
.info-val {
  font-family: var(--font-mono);
  font-size: 18px;
  color: var(--text);
  text-align: right;
}

/* Right */
.about-right { display: flex; flex-direction: column; gap: 24px; }

.bio-box { overflow: hidden; }
.box-head {
  background: var(--panel2);
  padding: 12px 18px;
  border-bottom: 2px solid var(--border);
  font-family: var(--font-pixel);
  font-size: 9px;
  color: var(--yellow);
  display: flex; align-items: center; gap: 12px;
  letter-spacing: 1px;
}
.box-title { flex: 1; }
.bio-text {
  padding: 20px;
  display: flex; flex-direction: column; gap: 14px;
}
.bio-text p {
  font-family: var(--font-body);
  font-size: 15px;
  color: var(--text2);
  line-height: 1.8;
}
.bio-text strong { color: var(--green); font-weight: 600; }

/* Achievements */
.ach-title {
  font-family: var(--font-pixel);
  font-size: 9px;
  color: var(--yellow);
  margin-bottom: 14px;
  letter-spacing: 1px;
}
.ach-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}
.ach-item {
  display: flex; align-items: center; gap: 12px;
  padding: 14px;
  transition: all .15s;
  cursor: default;
}
.ach-item:hover {
  border-color: var(--yellow);
  box-shadow: 4px 4px 0 #78350f;
  transform: translate(-2px,-2px);
}
.ach-icon { font-size: 26px; }
.ach-name {
  font-family: var(--font-pixel);
  font-size: 7px;
  color: var(--yellow);
  margin-bottom: 4px;
  letter-spacing: 1px;
}
.ach-desc {
  font-family: var(--font-body);
  font-size: 13px;
  color: var(--text3);
}

@media (max-width: 900px) {
  .about-grid { grid-template-columns: 1fr; }
  .ach-grid   { grid-template-columns: repeat(2,1fr); }
}
@media (max-width: 480px) {
  .ach-grid   { grid-template-columns: 1fr; }
}
</style>