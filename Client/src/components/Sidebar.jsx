import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const navItems = [
  { to: '/dashboard', icon: '◈', label: 'Dashboard' },
  { to: '/activities', icon: '⚡', label: 'Activities' },
  { to: '/recommendations', icon: '✦', label: 'Insights' },
]

export default function Sidebar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <aside style={{
      width: '220px',
      minHeight: '100vh',
      background: 'var(--surface)',
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      padding: '28px 0',
      position: 'fixed',
      top: 0,
      left: 0,
      bottom: 0,
      zIndex: 100,
    }}>
      {/* Logo */}
      <div style={{ padding: '0 24px 32px' }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: '18px',
          letterSpacing: '-0.02em',
          color: 'var(--accent)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <span style={{
            background: 'var(--accent)',
            color: '#0a0a0f',
            borderRadius: '6px',
            width: '26px',
            height: '26px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            fontWeight: 800,
          }}>F</span>
          MyFitness
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px', padding: '0 12px' }}>
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 12px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '14px',
              fontWeight: isActive ? 600 : 400,
              color: isActive ? 'var(--accent)' : 'var(--text-muted)',
              background: isActive ? 'var(--accent-dim)' : 'transparent',
              transition: 'all 0.15s ease',
              textDecoration: 'none',
            })}
          >
            <span style={{ fontSize: '16px', opacity: 0.8 }}>{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* User */}
      <div style={{ padding: '0 12px', borderTop: '1px solid var(--border)', paddingTop: '20px', marginTop: '20px' }}>
        <div style={{ padding: '10px 12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '32px', height: '32px',
            background: 'var(--accent-dim)',
            border: '1px solid rgba(200,245,90,0.2)',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '13px',
            color: 'var(--accent)',
            flexShrink: 0,
          }}>
            {user?.firstname?.[0]?.toUpperCase() || '?'}
          </div>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {user?.firstname} {user?.lastname}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {user?.email}
            </div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          style={{
            width: '100%',
            padding: '9px 12px',
            background: 'transparent',
            border: 'none',
            color: 'var(--text-muted)',
            fontSize: '13px',
            textAlign: 'left',
            cursor: 'pointer',
            borderRadius: 'var(--radius-sm)',
            transition: 'all 0.15s',
            marginTop: '4px',
          }}
          onMouseEnter={e => { e.target.style.color = '#ff6b6b'; e.target.style.background = 'rgba(255,107,107,0.08)' }}
          onMouseLeave={e => { e.target.style.color = 'var(--text-muted)'; e.target.style.background = 'transparent' }}
        >
          → Sign out
        </button>
      </div>
    </aside>
  )
}
