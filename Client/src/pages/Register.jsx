import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { api } from '../api'
import { Btn, Input, Toast } from '../components/UI'

export default function Register() {
  const [form, setForm] = useState({ firstname: '', lastname: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handle = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await api.register(form)
      navigate('/login')
    } catch (err) {
      setError(err.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  const set = (key) => (e) => setForm(p => ({ ...p, [key]: e.target.value }))

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        top: '-200px',
        left: '-200px',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(200,245,90,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        width: '100%',
        maxWidth: '420px',
        padding: '0 24px',
        animation: 'fadeUp 0.5s ease',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '48px', height: '48px',
            background: 'var(--accent)',
            borderRadius: '12px',
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: '22px',
            color: '#0a0a0f',
            marginBottom: '16px',
          }}>F</div>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '26px',
            letterSpacing: '-0.03em',
            marginBottom: '6px',
          }}>Create account</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Start tracking your fitness today</p>
        </div>

        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          padding: '32px',
        }}>
          <form onSubmit={handle} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <Input label="First name" placeholder="John" value={form.firstname} onChange={set('firstname')} required />
              <Input label="Last name" placeholder="Doe" value={form.lastname} onChange={set('lastname')} required />
            </div>
            <Input label="Email" type="email" placeholder="you@example.com" value={form.email} onChange={set('email')} required />
            <Input label="Password" type="password" placeholder="Min. 8 characters" value={form.password} onChange={set('password')} required />

            {error && (
              <div style={{
                background: 'rgba(255,107,107,0.08)',
                border: '1px solid rgba(255,107,107,0.2)',
                borderRadius: 'var(--radius-sm)',
                padding: '10px 14px',
                fontSize: '13px',
                color: '#ff9999',
              }}>
                {error}
              </div>
            )}
            <Btn type="submit" loading={loading} fullWidth style={{ marginTop: '4px', padding: '13px' }}>
              Create account
            </Btn>
          </form>
        </div>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: 'var(--text-muted)' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--accent)', fontWeight: 500 }}>Sign in</Link>
        </p>
      </div>
    </div>
  )
}
