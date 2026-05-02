import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { api } from '../api'
import Layout from '../components/Layout'
import { Card, Btn, Input, Select, Spinner, Empty, Badge, Toast } from '../components/UI'

const EMPTY_FORM = {
  activityId: '',
  suggestions: [''],
  improvements: [''],
  safety: [''],
}

function TagInput({ label, color, icon, values, onChange }) {
  const add = () => onChange([...values, ''])
  const remove = (i) => onChange(values.filter((_, idx) => idx !== i))
  const update = (i, val) => onChange(values.map((v, idx) => idx === i ? val : v))

  return (
    <div>
      <div style={{
        fontSize: '11px', fontWeight: 600, letterSpacing: '0.07em',
        textTransform: 'uppercase', color, marginBottom: '8px',
        display: 'flex', alignItems: 'center', gap: '5px',
      }}>
        <span>{icon}</span> {label}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {values.map((val, i) => (
          <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <input
              value={val}
              onChange={e => update(i, e.target.value)}
              placeholder={`Add ${label.toLowerCase()} note...`}
              style={{
                flex: 1,
                background: 'var(--surface-2)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                padding: '8px 12px',
                color: 'var(--text)',
                fontSize: '13px',
                fontFamily: 'var(--font-body)',
              }}
              onFocus={e => e.target.style.borderColor = color}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
            {values.length > 1 && (
              <button
                type="button"
                onClick={() => remove(i)}
                style={{
                  background: 'none', border: 'none',
                  color: 'var(--text-muted)', cursor: 'pointer',
                  fontSize: '16px', lineHeight: 1, padding: '4px',
                  flexShrink: 0,
                }}
              >×</button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={add}
          style={{
            background: 'none', border: `1px dashed ${color}44`,
            borderRadius: 'var(--radius-sm)', padding: '7px',
            color, fontSize: '12px', cursor: 'pointer',
            fontFamily: 'var(--font-body)',
            transition: 'border-color 0.2s, background 0.2s',
          }}
          onMouseEnter={e => { e.target.style.borderColor = color; e.target.style.background = `${color}0d` }}
          onMouseLeave={e => { e.target.style.borderColor = `${color}44`; e.target.style.background = 'none' }}
        >
          + Add {label}
        </button>
      </div>
    </div>
  )
}

function Section({ title, items, color, icon }) {
  return (
    <div style={{ background: 'var(--surface-2)', borderRadius: 'var(--radius-sm)', padding: '14px 16px' }}>
      <div style={{
        fontSize: '11px', fontWeight: 600, letterSpacing: '0.07em',
        textTransform: 'uppercase', color, marginBottom: '10px',
        display: 'flex', alignItems: 'center', gap: '5px',
      }}>
        <span>{icon}</span> {title}
      </div>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {items.map((item, i) => (
          <li key={i} style={{
            fontSize: '13px', color: 'var(--text)',
            paddingLeft: '10px', borderLeft: `2px solid ${color}33`, lineHeight: 1.5,
          }}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

export default function Recommendations() {
  const { user } = useAuth()
  const [recs, setRecs] = useState([])
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)

  const load = () => {
    if (!user?.id) return
    Promise.all([
      api.getRecommendationsByUser(user.id),
      api.getActivities(user.id),
    ]).then(([r, a]) => {
      setRecs(r.reverse())
      setActivities(a.reverse())
    }).catch(console.error).finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [user])

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.activityId) return showToast('Please select an activity', 'error')

    const clean = (arr) => arr.map(s => s.trim()).filter(Boolean)
    const payload = {
      userId: user.id,
      activityId: form.activityId,
      suggestions: clean(form.suggestions),
      improvements: clean(form.improvements),
      safety: clean(form.safety),
    }

    if (!payload.suggestions.length && !payload.improvements.length && !payload.safety.length) {
      return showToast('Add at least one note in any section', 'error')
    }

    setSaving(true)
    try {
      await api.generateRecommendation(payload)
      setShowForm(false)
      setForm(EMPTY_FORM)
      showToast('Recommendation saved!')
      load()
    } catch (err) {
      showToast(err.message || 'Failed to save', 'error')
    } finally {
      setSaving(false)
    }
  }

  const ACTIVITY_LABELS = {
    RUNNING:'🏃 Running', WALKING:'🚶 Walking', CYCLING:'🚴 Cycling',
    SWIMMING:'🏊 Swimming', WEIGHT_TRAINING:'🏋 Weight Training',
    YOGA:'🧘 Yoga', HIIT:'⚡ HIIT', CARDIO:'❤️ Cardio',
    STRETCHING:'🤸 Stretching', OTHER:'⚽ Other',
  }

  return (
    <Layout>
      <div style={{ animation: 'fadeUp 0.4s ease' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '30px', letterSpacing: '-0.03em', marginBottom: '4px' }}>
              Recommendations
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
              Add workout notes — suggestions, improvements & safety tips
            </p>
          </div>
          <Btn onClick={() => setShowForm(p => !p)}>
            {showForm ? '✕ Cancel' : '+ Add Recommendation'}
          </Btn>
        </div>

        {/* Form */}
        {showForm && (
          <Card style={{
            marginBottom: '28px',
            borderColor: 'rgba(200,245,90,0.2)',
            boxShadow: 'var(--shadow-accent)',
            animation: 'fadeUp 0.3s ease',
          }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '16px', marginBottom: '20px' }}>
              New Recommendation
            </h3>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                  Activity
                </label>
                <select
                  value={form.activityId}
                  onChange={e => setForm(p => ({ ...p, activityId: e.target.value }))}
                  style={{
                    background: 'var(--surface-2)', border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-sm)', padding: '10px 14px',
                    color: form.activityId ? 'var(--text)' : 'var(--text-muted)',
                    fontSize: '14px', width: '100%', cursor: 'pointer',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  <option value="">— Select a workout —</option>
                  {activities.map(a => (
                    <option key={a.id} value={a.id}>
                      {ACTIVITY_LABELS[a.act] || a.act} — {a.starttime
                        ? new Date(a.starttime).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                        : 'no date'} · {a.duration}min
                    </option>
                  ))}
                </select>
                {activities.length === 0 && (
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '6px' }}>
                    No activities found. Log a workout first.
                  </p>
                )}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '24px' }}>
                <TagInput
                  label="Suggestions"
                  color="#c8f55a"
                  icon="→"
                  values={form.suggestions}
                  onChange={v => setForm(p => ({ ...p, suggestions: v }))}
                />
                <TagInput
                  label="Improvements"
                  color="#6aa0ff"
                  icon="↑"
                  values={form.improvements}
                  onChange={v => setForm(p => ({ ...p, improvements: v }))}
                />
                <TagInput
                  label="Safety"
                  color="#ffb347"
                  icon="⚠"
                  values={form.safety}
                  onChange={v => setForm(p => ({ ...p, safety: v }))}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <Btn type="button" variant="ghost" onClick={() => { setShowForm(false); setForm(EMPTY_FORM) }}>Cancel</Btn>
                <Btn type="submit" loading={saving}>Save Recommendation</Btn>
              </div>
            </form>
          </Card>
        )}

        {/* List */}
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '80px' }}>
            <Spinner size={28} />
          </div>
        ) : recs.length === 0 ? (
          <Card>
            <Empty icon="📋" title="No recommendations yet" subtitle="Hit the button above to add notes for a workout" />
          </Card>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {recs.map((rec, i) => (
              <Card key={rec.id} style={{
                animation: 'fadeUp 0.35s ease both',
                animationDelay: `${Math.min(i, 6) * 0.06}s`,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '32px', height: '32px',
                      background: 'var(--accent-dim)',
                      border: '1px solid rgba(200,245,90,0.2)',
                      borderRadius: '8px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '14px',
                    }}>📋</div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '14px' }}>
                        Recommendation #{recs.length - i}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                        {rec.createdat
                          ? new Date(rec.createdat).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                          : ''}
                      </div>
                    </div>
                  </div>
                  {rec.type && <Badge color="muted">{rec.type}</Badge>}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                  {rec.suggestions?.length > 0 && <Section title="Suggestions" items={rec.suggestions} color="#c8f55a" icon="→" />}
                  {rec.improvements?.length > 0 && <Section title="Improvements" items={rec.improvements} color="#6aa0ff" icon="↑" />}
                  {rec.safety?.length > 0 && <Section title="Safety" items={rec.safety} color="#ffb347" icon="⚠" />}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {toast && <Toast message={toast.msg} type={toast.type} />}
    </Layout>
  )
}
