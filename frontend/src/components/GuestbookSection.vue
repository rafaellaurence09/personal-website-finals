<template>
  <section id="guestbook" class="section gb-section">
    <div class="container">
      <h2 class="section-title">GUESTBOOK — SIGN THE SCROLL</h2>

      <div class="gb-layout">

        <!-- ══════════════════ LEFT — FORM ══════════════════ -->
        <div class="gb-left">

          <div class="gb-form pbox pbox-green">
            <div class="form-head">
              <span>✍️</span>
              <span>LEAVE A MESSAGE</span>
            </div>

            <form class="form-body" @submit.prevent="handleSubmit">

              <!-- Name -->
              <div class="field">
                <label class="field-label">👤 ADVENTURER NAME</label>
                <input
                  v-model="form.name"
                  type="text"
                  class="pinput"
                  placeholder="Your name..."
                  maxlength="100"
                  :disabled="submitting"
                  autocomplete="off"
                />
                <div class="field-footer">
                  <span class="field-hint" v-if="nameErr">{{ nameErr }}</span>
                  <span v-else></span>
                  <span class="char-count">{{ form.name.length }}/100</span>
                </div>
              </div>

              <!-- Message -->
              <div class="field">
                <label class="field-label">💬 YOUR MESSAGE</label>
                <textarea
                  v-model="form.message"
                  class="pinput field-textarea"
                  placeholder="Write something awesome..."
                  maxlength="500"
                  rows="5"
                  :disabled="submitting"
                ></textarea>
                <div class="field-footer">
                  <span class="field-hint" v-if="msgErr">{{ msgErr }}</span>
                  <span v-else></span>
                  <span class="char-count">{{ form.message.length }}/500</span>
                </div>
              </div>

              <!-- Post error -->
              <div v-if="postError" class="alert alert-err">
                <span>❌</span> {{ postError }}
              </div>

              <!-- Success -->
              <Transition name="fade">
                <div v-if="postOk" class="alert alert-ok">
                  <span>✅</span> MESSAGE SENT — THANKS FOR SIGNING!
                </div>
              </Transition>

              <button
                type="submit"
                class="pbtn submit-btn"
                :disabled="submitting || !canSubmit"
              >
                <span v-if="submitting">⏳ SENDING...</span>
                <span v-else>📜 SIGN THE GUESTBOOK</span>
              </button>
            </form>
          </div>

          <!-- API reference box -->
          <div class="api-ref pbox">
            <div class="api-title">🔌 API ENDPOINTS</div>
            <div class="ep-row">
              <span class="ep-method get">GET</span>
              <span class="ep-path">/guestbook</span>
              <span class="ep-note">Fetch all messages</span>
            </div>
            <div class="ep-row">
              <span class="ep-method post">POST</span>
              <span class="ep-path">/guestbook</span>
              <span class="ep-note">Create message</span>
            </div>
            <div class="ep-row">
              <span class="ep-method get">GET</span>
              <span class="ep-path">/health</span>
              <span class="ep-note">API health check</span>
            </div>
          </div>
        </div>

        <!-- ══════════════════ RIGHT — LIST ══════════════════ -->
        <div class="gb-right">
          <div class="list-head">
            <span class="list-title">📜 MESSAGES</span>
            <span class="pbadge" style="color:var(--green);border-color:var(--green-dark)">
              {{ messages.length }} ENTRIES
            </span>
            <button class="pbtn pbtn-sm" @click="fetchMessages" :disabled="loading">
              {{ loading ? '⏳' : '🔄' }} REFRESH
            </button>
          </div>

          <!-- Loading -->
          <div v-if="loading" class="state-box">
            <div class="load-dots">
              <div v-for="i in 5" :key="i" class="dot" :style="`animation-delay:${(i-1)*.15}s`"></div>
            </div>
            <p class="state-text">LOADING MESSAGES...</p>
          </div>

          <!-- Fetch error -->
          <div v-else-if="fetchError" class="state-box">
            <span style="font-size:40px">⚠️</span>
            <p class="state-text">{{ fetchError }}</p>
            <button class="pbtn pbtn-sm" @click="fetchMessages">RETRY</button>
          </div>

          <!-- Empty -->
          <div v-else-if="messages.length === 0" class="state-box pbox">
            <span class="state-icon">📭</span>
            <p class="state-title">NO MESSAGES YET</p>
            <p class="state-sub">Be the first adventurer to sign!</p>
          </div>

          <!-- Messages -->
          <div v-else class="msg-list">
            <TransitionGroup name="msg">
              <div
                v-for="(msg, idx) in messages"
                :key="msg.id"
                class="msg-card pbox"
              >
                <div class="msg-top">
                  <div class="msg-avatar">{{ msg.name.charAt(0).toUpperCase() }}</div>
                  <div class="msg-meta">
                    <span class="msg-name">{{ msg.name }}</span>
                    <span class="msg-date">{{ formatDate(msg.created_at) }}</span>
                  </div>
                  <span class="msg-idx">#{{ String(idx + 1).padStart(3,'0') }}</span>
                </div>
                <p class="msg-text">{{ msg.message }}</p>
              </div>
            </TransitionGroup>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useGuestbook } from '../composables/useGuestbook.js'

const {
  messages, loading, submitting,
  fetchError, postError, postOk,
  fetchMessages, postMessage, formatDate,
} = useGuestbook()

const form = ref({ name: '', message: '' })

// Inline validation
const nameErr = computed(() => {
  if (!form.value.name) return ''
  if (form.value.name.trim().length < 2) return 'Min 2 characters'
  return ''
})
const msgErr = computed(() => {
  if (!form.value.message) return ''
  if (form.value.message.trim().length < 5) return 'Min 5 characters'
  return ''
})
const canSubmit = computed(() =>
  form.value.name.trim().length >= 2 &&
  form.value.message.trim().length >= 5 &&
  !nameErr.value && !msgErr.value
)

const handleSubmit = async () => {
  if (!canSubmit.value) return
  const ok = await postMessage(form.value.name, form.value.message)
  if (ok) {
    form.value = { name: '', message: '' }
    setTimeout(() => { postOk.value = false }, 4000)
  }
}

onMounted(() => fetchMessages())
</script>

<style scoped>
.gb-section {
  background: linear-gradient(180deg, transparent, rgba(56,189,248,.025), transparent);
}

.gb-layout {
  display: grid;
  grid-template-columns: 380px 1fr;
  gap: 32px;
  align-items: start;
}

/* ─── LEFT ─── */
.gb-left { display: flex; flex-direction: column; gap: 20px; }

.gb-form { overflow: hidden; }
.form-head {
  background: var(--green-dark);
  padding: 12px 18px;
  display: flex; align-items: center; gap: 10px;
  font-family: var(--font-pixel);
  font-size: 9px;
  color: #fff;
  letter-spacing: 2px;
  border-bottom: 2px solid var(--border);
}

.form-body {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.field { display: flex; flex-direction: column; gap: 7px; }
.field-label {
  font-family: var(--font-pixel);
  font-size: 7px;
  color: var(--text3);
  letter-spacing: 1px;
}
.field-textarea {
  resize: vertical;
  min-height: 110px;
  font-family: var(--font-mono);
  font-size: 20px;
  line-height: 1.5;
}
.field-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.field-hint {
  font-family: var(--font-pixel);
  font-size: 7px;
  color: var(--red);
}
.char-count {
  font-family: var(--font-pixel);
  font-size: 7px;
  color: var(--text3);
}

/* Alerts */
.alert {
  font-family: var(--font-pixel);
  font-size: 7px;
  padding: 10px 12px;
  border: 2px solid;
  display: flex;
  align-items: center;
  gap: 8px;
  line-height: 1.8;
  letter-spacing: .5px;
}
.alert-err { border-color: var(--red);   color: var(--red);   background: rgba(248,113,113,.08); }
.alert-ok  { border-color: var(--green); color: var(--green); background: rgba(74,222,128,.08); }

.submit-btn {
  width: 100%;
  justify-content: center;
  font-size: 9px;
}
.submit-btn:disabled {
  opacity: .45;
  cursor: not-allowed;
  transform: none !important;
}

/* API ref */
.api-ref { padding: 16px; }
.api-title {
  font-family: var(--font-pixel);
  font-size: 8px;
  color: var(--text3);
  margin-bottom: 14px;
  letter-spacing: 1px;
}
.ep-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 0;
  border-bottom: 1px solid var(--border);
}
.ep-row:last-child { border-bottom: none; }
.ep-method {
  font-family: var(--font-pixel);
  font-size: 7px;
  padding: 3px 6px;
  border: 2px solid;
  min-width: 44px;
  text-align: center;
}
.ep-method.get  { color: var(--green); border-color: var(--green-dark); }
.ep-method.post { color: var(--blue);  border-color: var(--blue-dark); }
.ep-path {
  font-family: var(--font-mono);
  font-size: 17px;
  color: var(--text);
  flex: 1;
}
.ep-note {
  font-family: var(--font-body);
  font-size: 12px;
  color: var(--text3);
}

/* ─── RIGHT ─── */
.list-head {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}
.list-title {
  font-family: var(--font-pixel);
  font-size: 10px;
  color: var(--text);
  flex: 1;
  letter-spacing: 1px;
}

/* Loading / error / empty state */
.state-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  padding: 64px 32px;
  text-align: center;
}
.load-dots { display: flex; gap: 6px; }
.dot {
  width: 12px; height: 12px;
  background: var(--green);
  animation: blink .9s step-end infinite;
}
.state-text {
  font-family: var(--font-pixel);
  font-size: 8px;
  color: var(--text3);
  letter-spacing: 2px;
}
.state-icon { font-size: 52px; }
.state-title {
  font-family: var(--font-pixel);
  font-size: 10px;
  color: var(--text2);
  letter-spacing: 2px;
}
.state-sub {
  font-family: var(--font-body);
  font-size: 14px;
  color: var(--text3);
}

/* Message list */
.msg-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 640px;
  overflow-y: auto;
  padding-right: 6px;
}

.msg-card {
  padding: 16px;
  transition: border-color .15s, transform .15s;
}
.msg-card:hover {
  border-color: var(--green-dark);
  transform: translateX(4px);
}

.msg-top {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}
.msg-avatar {
  width: 38px; height: 38px;
  background: var(--green-dark);
  border: 2px solid var(--green);
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-pixel);
  font-size: 14px;
  color: #fff;
  flex-shrink: 0;
  animation: pulseGlow 3s ease infinite;
}
.msg-meta { flex: 1; }
.msg-name {
  font-family: var(--font-pixel);
  font-size: 8px;
  color: var(--text);
  letter-spacing: 1px;
  display: block;
  margin-bottom: 3px;
}
.msg-date {
  font-family: var(--font-body);
  font-size: 12px;
  color: var(--text3);
}
.msg-idx {
  font-family: var(--font-pixel);
  font-size: 7px;
  color: var(--text3);
}
.msg-text {
  font-family: var(--font-body);
  font-size: 15px;
  color: var(--text2);
  line-height: 1.7;
  padding-left: 50px;
}

/* Transitions */
.fade-enter-active, .fade-leave-active { transition: opacity .3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.msg-enter-active { transition: all .35s ease; }
.msg-enter-from { opacity: 0; transform: translateY(-12px); }

@media (max-width: 960px) {
  .gb-layout { grid-template-columns: 1fr; }
}
@media (max-width: 480px) {
  .msg-text { padding-left: 0; }
  .msg-list { max-height: 500px; }
}
</style>