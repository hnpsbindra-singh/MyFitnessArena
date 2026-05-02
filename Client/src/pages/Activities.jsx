
import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { api } from '../api'
import Layout from '../components/Layout'
import { Card, Btn, Input, Select, Badge, Spinner, Toast, Empty } from '../components/UI'


const ACTIVITY_TYPES = [
  'RUNNING', 'WALKING', 'CYCLING', 'SWIMMING', 'WEIGHT_TRAINING',
  'YOGA', 'HIIT', 'CARDIO', 'STRETCHING', 'OTHER'
]

const ICONS = {
  RUNNING: '🏃', WALKING: '🚶', CYCLING: '🚴', SWIMMING: '🏊', WEIGHT_TRAINING: '🏋',
  YOGA: '🧘', HIIT: '⚡', CARDIO: '❤️', STRETCHING: '🤸', OTHER: '⚽'
}

const COLORS = ['accent', 'blue', 'muted', 'accent', 'blue']

export default function Activities() {
  const { user } = useAuth()
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState(null)

  const [form, setForm] = useState({
    act: 'RUNNING',
    duration: '',
    CalorieBurn: '',
    starttime: new Date().toISOString().slice(0, 16),
    userId: user?.id || '',
  })

 const load = () => {
  if (!user?.id) return

  console.log("GET ACTIVITIES CALLED", user.id)

  api.getActivities(user.id)
    .then(data => {
      const sorted = data.sort((a, b) => new Date(b.starttime) - new Date(a.starttime))
      setActivities(sorted)
    })
    .catch(console.error)
    .finally(() => setLoading(false))
}

  useEffect(() => { load() }, [user])

  useEffect(() => {
    if (showForm) {
      document.querySelector('input')?.focus()
    }
  }, [showForm])

  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const payload = {
        ...form,
        duration: parseInt(form.duration),
        CalorieBurn: parseInt(form.CalorieBurn),
        userId: user.id,
        starttime: new Date(form.starttime).toISOString(),
      }

      await api.createActivity(payload)

      setShowForm(false)
      setToast({ msg: 'Activity logged!', type: 'success' })
      setTimeout(() => setToast(null), 3000)

      load()
    } catch (err) {
      setToast({ msg: err.message, type: 'error' })
      setTimeout(() => setToast(null), 3000)
    } finally {
      setSaving(false)
    }
  }

  return (
    <Layout>
      <div className="activities-container">

        {/* Header */}
       <div style={{
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '28px',
}}>

  <div>
    <h1 style={{
      fontSize: '26px',
      fontWeight: 700,
      color: '#f8fafc',
      marginBottom: '4px'
    }}>
      Activities
    </h1>

    <p style={{
      fontSize: '14px',
      color: '#6b7280'
    }}>
      🔥 {activities.length} workout{activities.length !== 1 ? 's' : ''} logged
    </p>
  </div>

  <Btn
    onClick={() => setShowForm(p => !p)}
    style={{
      borderRadius: '12px',
      padding: '10px 16px'
    }}
  >
    {showForm ? '✕ Cancel' : '+ Log Workout'}
  </Btn>

</div>

        {/* Form */}
        {showForm && (
          <Card style={{
  marginBottom: '20px',
  borderRadius: '16px',
  boxShadow: '0 20px 40px rgba(0,0,0,0.06)',
}}>
            <h3 style={{ marginBottom: '20px' }}>New Activity</h3>

            <form onSubmit={handleSubmit}>
              <div style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '14px'
}}>
                <Select label="Activity Type" value={form.act} onChange={set('act')}>
                  {ACTIVITY_TYPES.map(t => (
                    <option key={t} value={t}>
                      {ICONS[t]} {t.replace(/_/g, ' ')}
                    </option>
                  ))}
                </Select>

                <Input
                  label="Start Time"
                  type="datetime-local"
                  value={form.starttime}
                  onChange={set('starttime')}
                  required
                />

                <Input
                  label="Duration (minutes)"
                  type="number"
                  min="1"
                  placeholder="30"
                  value={form.duration}
                  onChange={set('duration')}
                  required
                />

                <Input
                  label="Calories Burned"
                  type="number"
                  min="0"
                  placeholder="250"
                  value={form.CalorieBurn}
                  onChange={set('CalorieBurn')}
                  required
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '16px' }}>
                <Btn type="button" variant="ghost" onClick={() => setShowForm(false)}>
                  Cancel
                </Btn>
                <Btn type="submit" loading={saving}>
                  Save Activity
                </Btn>
              </div>
            </form>
          </Card>
        )}

        {/* List */}
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '80px' }}>
            <Spinner size={28} />
          </div>
        ) : activities.length === 0 ? (
          <Card>
            <Empty
              icon="🏅"
              title="No workouts logged yet"
              subtitle="Hit the button above to record your first session"
            />
          </Card>
        ) : (
          <div className="activity-list">
            {activities.map((act, i) => (
              <Card key={act.id} className="activity-card">

                <div className="activity-icon">
                  {ICONS[act.act] || '🏅'}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 600 }}>
                      {act.act?.replace(/_/g, ' ')}
                    </span>

                    <Badge color={COLORS[i % COLORS.length]}>
                      {act.duration} min
                    </Badge>
                  </div>

                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    {act.starttime
                      ? new Date(act.starttime).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })
                      : 'No date recorded'}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div className="activity-calories">
                    {act.calorieBurn || act.CalorieBurn || 0}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    kcal burned
                  </div>
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

