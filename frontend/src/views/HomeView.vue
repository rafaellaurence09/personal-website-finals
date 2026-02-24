<template>
  <div>
    <NavBar />
    <main>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <GuestbookSection />
    </main>
    <footer class="footer">
      <div class="container footer-inner">
        <div class="footer-brand">
          <span class="fb-gem">💎</span>
          <span class="fb-name">DEV.EXE</span>
        </div>
        <p class="footer-copy">
          BUILT WITH 💚 USING VUE.JS + NESTJS + SUPABASE + VERCEL
        </p>
        <div class="footer-links">
          <a href="https://github.com"        target="_blank" class="fl">🐙 GITHUB</a>
          <a href="mailto:you@example.com"                    class="fl">📧 EMAIL</a>
          <a href="https://linkedin.com"       target="_blank" class="fl">💼 LINKEDIN</a>
        </div>
      </div>
      <div class="footer-ground">
        <div v-for="i in 50" :key="i" class="fg-tile" :class="i%2===0?'b':'a'"></div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import NavBar          from '@/components/NavBar.vue'
import HeroSection     from '@/components/HeroSection.vue'
import AboutSection    from '@/components/AboutSection.vue'
import SkillsSection   from '@/components/SkillsSection.vue'
import ProjectsSection from '@/components/ProjectsSection.vue'
import GuestbookSection from '@/components/GuestbookSection.vue'
</script>

<style scoped>
.footer {
  background: var(--bg2);
  border-top: 2px solid var(--border2);
  position: relative;
  overflow: hidden;
  z-index: 1;
}
.footer-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  padding-top: 36px;
  padding-bottom: 36px;
}
.footer-brand {
  display: flex; align-items: center; gap: 10px;
  font-family: var(--font-pixel);
  font-size: 13px;
  color: var(--green);
  text-shadow: 0 0 20px rgba(74,222,128,.5);
  letter-spacing: 3px;
}
.fb-gem { font-size: 18px; animation: float 2.5s ease-in-out infinite; }
.footer-copy {
  font-family: var(--font-pixel);
  font-size: 7px;
  color: var(--text3);
  letter-spacing: 1px;
  text-align: center;
  line-height: 1.8;
}
.footer-links { display: flex; gap: 20px; flex-wrap: wrap; }
.fl {
  font-family: var(--font-pixel);
  font-size: 7px;
  color: var(--text3);
  text-decoration: none;
  letter-spacing: 1px;
  transition: color .15s;
}
.fl:hover { color: var(--green); }

/* Ground */
.footer-ground { display: flex; height: 24px; }
.fg-tile {
  flex: 1; height: 100%;
  border-top: 4px solid var(--green);
}
.fg-tile.a { background: var(--green-dark); }
.fg-tile.b { background: #15803d; border-top-color: var(--green-mid); }

@media (max-width: 700px) {
  .footer-inner { flex-direction: column; align-items: center; text-align: center; }
}
</style>