import { ref } from 'vue'

// ✅ Set VITE_API_URL in your .env file
// e.g. VITE_API_URL=https://your-backend.vercel.app
const BASE = (import.meta.env.VITE_API_URL || 'http://localhost:3000').replace(/\/$/, '')

export function useGuestbook() {
  const messages   = ref([])
  const loading    = ref(false)
  const submitting = ref(false)
  const fetchError = ref(null)
  const postError  = ref(null)
  const postOk     = ref(false)

  // ─── GET /guestbook ───────────────────────────────────────────
  const fetchMessages = async () => {
    loading.value    = true
    fetchError.value = null
    try {
      const res = await fetch(`${BASE}/guestbook`)
      if (!res.ok) throw new Error(`Server error ${res.status}`)
      const json = await res.json()
      messages.value = json.data ?? []
    } catch (err) {
      fetchError.value = 'Could not load messages. Is the backend online?'
      console.error('[useGuestbook] fetchMessages:', err)
    } finally {
      loading.value = false
    }
  }

  // ─── POST /guestbook ──────────────────────────────────────────
  const postMessage = async (name, message) => {
    submitting.value = true
    postError.value  = null
    postOk.value     = false
    try {
      const res = await fetch(`${BASE}/guestbook`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ name: name.trim(), message: message.trim() }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        const msg  = Array.isArray(body.message) ? body.message.join(', ') : body.message
        throw new Error(msg || `Server error ${res.status}`)
      }
      const json = await res.json()
      // Prepend so newest appears first
      messages.value.unshift(json.data)
      postOk.value = true
      return true
    } catch (err) {
      postError.value = err.message || 'Could not post message. Try again.'
      console.error('[useGuestbook] postMessage:', err)
      return false
    } finally {
      submitting.value = false
    }
  }

  const formatDate = (iso) => {
    if (!iso) return ''
    return new Date(iso).toLocaleDateString('en-PH', {
      year: 'numeric', month: 'short', day: 'numeric',
    })
  }

  return { messages, loading, submitting, fetchError, postError, postOk, fetchMessages, postMessage, formatDate }
}