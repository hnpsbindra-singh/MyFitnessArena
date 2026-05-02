import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { api } from '../api'
import Layout from '../components/Layout'
import { Card, Badge, Spinner, Empty } from '../components/UI'

const ACTIVITY_ICONS = {
  RUNNING: '🏃',
  WALKING: '🚶',
  CYCLING: '🚴',
  SWIMMING: '🏊',
  WEIGHT_TRAINING: '🏋',
  YOGA: '🧘',
  HIIT: '⚡',
  CARDIO: '❤️',
  STRETCHING: '🤸',
  OTHER: '⚽',
}

function StatCard({ label, value, unit, accent }) {
  return (
    <Card style={{ position: 'relative', overflow: 'hidden' }}>
      {accent && (
        <div style={{
          position: 'absolute',
          top: 0, right: 0,
          width: '80px', height: '80px',
          background: 'radial-gradient(circle at top right, var(--accent-glow), transparent 70%)',
          pointerEvents: 'none',
        }} />
      )}
      <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 500, marginBottom: '8px' }}>
        {label}
      </div>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: '36px',
        fontWeight: 800,
        color: accent ? 'var(--accent)' : 'var(--text)',
        letterSpacing: '-0.03em',
        lineHeight: 1,
      }}>
        {value}
        {unit && <span style={{ fontSize: '16px', color: 'var(--text-muted)', marginLeft: '4px', fontWeight: 500 }}>{unit}</span>}
      </div>
    </Card>
  )
}

export default function Dashboard() {
  const { user } = useAuth()
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user?.id) return
    api.getActivities(user.id)
      .then(setActivities)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [user])

  const totalCal = activities.reduce((s, a) => s + (a.calorieBurn || a.CalorieBurn || 0), 0)
  const totalMin = activities.reduce((s, a) => s + (a.duration || 0), 0)
  const recent = activities.slice(-5).reverse()

  return (
    <Layout>
      <div style={{ animation: 'fadeUp 0.4s ease' }}>
        {/* Header */}
        <div style={{
  marginBottom: '32px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}}>

  <div>
    <div style={{
      fontSize: '13px',
      color: '#6b7280',
      marginBottom: '6px',
    }}>
      Welcome back 👋
    </div>

    <h1 style={{
      fontWeight: 700,
      fontSize: '28px',
      color: '#dde1e8',
    }}>
      {user?.firstname}
    </h1>
  </div>

  {/* Mini profile */}
  <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    background: '#ffffff',
    border: '1px solid #e5e7eb',
    padding: '8px 12px',
    borderRadius: '12px',
  }}>
    <div style={{
      width: '34px',
      height: '34px',
      borderRadius: '50%',
      background: '#eef2ff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 600,
      color: '#6366f1',
    }}>
      {user?.firstname?.[0]}
    </div>
  </div>

</div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '36px' }}>
          <StatCard label="Total Activities" value={activities.length} accent />
          <StatCard label="Calories Burned" value={totalCal.toLocaleString()} unit="kcal" />
          <StatCard label="Total Time" value={totalMin} unit="min" />
        </div>

        {/* Recent Activities */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '18px', letterSpacing: '-0.02em' }}>
              Recent Activities
            </h2>
            <Link to="/activities" style={{ fontSize: '13px', color: 'var(--accent)', fontWeight: 500 }}>
              View all →
            </Link>
          </div>

          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}>
              <Spinner size={28} />
            </div>
          ) : recent.length === 0 ? (
            <Card>
              <Empty icon="⚡" title="No activities yet" subtitle="Log your first workout to get started" />
            </Card>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {recent.map((act, i) => (
                <Card key={act.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '16px 20px',
                  animationDelay: `${i * 0.05}s`,
                  animation: 'fadeUp 0.4s ease both',
                }}>
                  <div style={{
                    width: '40px', height: '40px',
                    background: 'var(--surface-2)',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                    flexShrink: 0,
                  }}>
                    {ACTIVITY_ICONS[act.act] || '🏅'}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '14px', marginBottom: '2px' }}>
                      {act.act?.replace(/_/g, ' ')}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      {act.starttime ? new Date(act.starttime).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'No date'}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '15px', color: 'var(--accent)' }}>
                      {act.calorieBurn || act.CalorieBurn || 0}
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 400, marginLeft: '3px' }}>kcal</span>
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{act.duration} min</div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}
