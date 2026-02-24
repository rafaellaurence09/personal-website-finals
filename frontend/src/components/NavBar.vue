<template>
  <nav class="navbar" :class="{ scrolled: scrolled }">
    <div class="nav-container">

      <a href="#hero" class="nav-brand" @click.prevent="scrollTo('#hero')">
        <span class="brand-gem">💎</span>
        <span class="brand-name">DEV.EXE</span>
      </a>

      <!-- Desktop links -->
      <ul class="nav-links">
        <li v-for="link in links" :key="link.href">
          <a
            :href="link.href"
            class="nav-link"
            :class="{ active: activeSection === link.id }"
            @click.prevent="scrollTo(link.href)"
          >
            <span class="nl-icon">{{ link.icon }}</span>
            <span class="nl-text">{{ link.label }}</span>
          </a>
        </li>
      </ul>

      <!-- Hamburger -->
      <button class="hamburger" :class="{ open: menuOpen }" @click="menuOpen = !menuOpen" aria-label="Menu">
        <span /><span /><span />
      </button>
    </div>

    <!-- Mobile drawer -->
    <Transition name="drawer">
      <div v-if="menuOpen" class="mobile-drawer">
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          class="drawer-link"
          @click.prevent="scrollTo(link.href); menuOpen = false"
        >
          <span>{{ link.icon }}</span>
          <span>{{ link.label }}</span>
        </a>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const scrolled   = ref(false)
const menuOpen   = ref(false)
const activeSection = ref('hero')

const links = [
  { href: '#about',      id: 'about',      label: 'ABOUT',      icon: '👤' },
  { href: '#skills',     id: 'skills',     label: 'SKILLS',     icon: '⚔️'  },
  { href: '#projects',   id: 'projects',   label: 'PROJECTS',   icon: '🗺️'  },
  { href: '#guestbook',  id: 'guestbook',  label: 'GUESTBOOK',  icon: '📜'  },
]

const scrollTo = (href) => {
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const onScroll = () => {
  scrolled.value = window.scrollY > 60
  const sections = ['hero', 'about', 'skills', 'projects', 'guestbook']
  for (const id of [...sections].reverse()) {
    const el = document.getElementById(id)
    if (el && window.scrollY >= el.offsetTop - 120) {
      activeSection.value = id
      break
    }
  }
}

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 1000;
  transition: background .3s, border-color .3s, box-shadow .3s;
  border-bottom: 2px solid transparent;
}
.navbar.scrolled {
  background: rgba(7,12,20,.96);
  border-bottom-color: var(--border2);
  box-shadow: 0 4px 0 var(--green-dark);
  backdrop-filter: blur(12px);
}

.nav-container {
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 24px;
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Brand */
.nav-brand {
  display: flex; align-items: center; gap: 10px;
  text-decoration: none;
  font-family: var(--font-pixel);
  font-size: 13px;
  color: var(--green);
  text-shadow: 0 0 20px rgba(74,222,128,.7);
  letter-spacing: 3px;
}
.brand-gem { font-size: 18px; animation: float 2.5s ease-in-out infinite; }

/* Desktop nav */
.nav-links {
  list-style: none;
  display: flex;
  gap: 4px;
}
.nav-link {
  font-family: var(--font-pixel);
  font-size: 8px;
  color: var(--text2);
  text-decoration: none;
  padding: 8px 14px;
  border: 2px solid transparent;
  display: flex; align-items: center; gap: 7px;
  transition: all .15s;
  letter-spacing: 1px;
}
.nav-link:hover,
.nav-link.active {
  color: var(--green);
  border-color: var(--green-dark);
  background: rgba(74,222,128,.06);
  box-shadow: 2px 2px 0 var(--green-dark);
}
.nl-icon { font-size: 13px; }

/* Hamburger */
.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: 2px solid var(--border2);
  padding: 9px 10px;
  cursor: pointer;
}
.hamburger span {
  display: block;
  width: 20px; height: 2px;
  background: var(--green);
  transition: all .2s;
}
.hamburger.open span:nth-child(1) { transform: rotate(45deg) translate(5px,5px); }
.hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
.hamburger.open span:nth-child(3) { transform: rotate(-45deg) translate(5px,-5px); }

/* Mobile drawer */
.mobile-drawer {
  background: rgba(7,12,20,.98);
  border-bottom: 3px solid var(--green-dark);
  display: flex;
  flex-direction: column;
}
.drawer-link {
  font-family: var(--font-pixel);
  font-size: 10px;
  color: var(--text);
  text-decoration: none;
  padding: 18px 24px;
  border-bottom: 1px solid var(--border);
  display: flex; align-items: center; gap: 14px;
  letter-spacing: 1px;
  transition: color .15s, background .15s;
}
.drawer-link:hover { color: var(--green); background: rgba(74,222,128,.04); }

/* Transition */
.drawer-enter-active, .drawer-leave-active { transition: max-height .25s ease, opacity .2s; overflow: hidden; }
.drawer-enter-from, .drawer-leave-to { max-height: 0; opacity: 0; }
.drawer-enter-to, .drawer-leave-from { max-height: 400px; opacity: 1; }

@media (max-width: 768px) {
  .nav-links { display: none; }
  .hamburger { display: flex; }
}
</style>