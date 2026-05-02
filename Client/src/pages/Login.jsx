import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { api } from '../api'
import { Btn, Input, Toast } from '../components/UI'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handle = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await api.login(form)
      login(res.token, res.Response)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

 return (
  <div style={{
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f8fafc, #eef2ff)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  }}>

    {/* Soft blobs (more subtle now) */}
    <div style={{
      position: 'absolute',
      top: '-150px',
      right: '-150px',
      width: '500px',
      height: '500px',
      background: 'radial-gradient(circle, rgba(99,102,241,0.08), transparent 70%)',
    }} />

    <div style={{
      position: 'absolute',
      bottom: '-120px',
      left: '-120px',
      width: '400px',
      height: '400px',
      background: 'radial-gradient(circle, rgba(56,189,248,0.08), transparent 70%)',
    }} />

    <div style={{
      width: '100%',
      maxWidth: '380px',
      padding: '0 20px',
      zIndex: 2,
    }}>

      {/* Logo */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{
          width: '50px',
          height: '50px',
          borderRadius: '14px',
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 700,
          fontSize: '20px',
          color: '#fff',
          margin: '0 auto 14px',
          boxShadow: '0 10px 25px rgba(99,102,241,0.25)'
        }}>
          F
        </div>

        <h1 style={{
          fontSize: '24px',
          fontWeight: 600,
          color: '#1f2937',
          marginBottom: '4px',
        }}>
          Welcome back
        </h1>

        <p style={{
          color: '#6b7280',
          fontSize: '14px'
        }}>
          Track your fitness journey
        </p>
      </div>

      {/* Card */}
      <div style={{
        background: 'rgba(255,255,255,0.7)',
        backdropFilter: 'blur(14px)',
        border: '1px solid rgba(255,255,255,0.4)',
        borderRadius: '16px',
        padding: '28px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.06)',
      }}>

        <form onSubmit={handle} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
            required
          />

          {error && (
            <div style={{
              background: 'rgba(239,68,68,0.08)',
              border: '1px solid rgba(239,68,68,0.2)',
              borderRadius: '10px',
              padding: '10px',
              fontSize: '13px',
              color: '#ef4444',
            }}>
              {error}
            </div>
          )}

          <Btn
            type="submit"
            loading={loading}
            fullWidth
            style={{
              marginTop: '6px',
              padding: '12px',
              borderRadius: '10px',
              fontWeight: 500,
            }}
          >
            Sign in
          </Btn>
        </form>
      </div>

      <p style={{
        textAlign: 'center',
        marginTop: '18px',
        fontSize: '14px',
        color: '#6b7280'
      }}>
        No account?{' '}
        <Link to="/register" style={{ color: '#6366f1', fontWeight: 500 }}>
          Create one
        </Link>
      </p>

    </div>
  </div>
)
}
