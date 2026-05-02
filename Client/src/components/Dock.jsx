import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const navItems = [
  { to: '/dashboard', icon: '◈', label: 'Dashboard' },
  { to: '/activities', icon: '⚡', label: 'Activities' },
  { to: '/recommendations', icon: '✦', label: 'Insights' },
   
]

export default function Dock() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      padding: '14px 22px',

      /* 🔥 BLACK DOCK */
      background: '#0f172a',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '20px',

      boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
      zIndex: 1000,
    }}>

      {/* NAV */}
      {navItems.map(item => (
        <NavLink
          key={item.to}
          to={item.to}
          style={({ isActive }) => ({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textDecoration: 'none',
            padding: '8px 12px',
            borderRadius: '12px',
            minWidth: '70px',

            color: isActive ? '#6366f1' : '#9ca3af',
            background: isActive ? 'rgba(99,102,241,0.15)' : 'transparent',

            transition: 'all 0.2s ease',
          })}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-3px)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          <span style={{ fontSize: '18px', marginBottom: '4px' }}>
            {item.icon}
          </span>

          <span style={{ fontSize: '12px' }}>
            {item.label}
          </span>
        </NavLink>
      ))}

      {/* Divider */}
      <div style={{
        width: '1px',
        height: '36px',
        background: 'rgba(255,255,255,0.1)'
      }} />

      {/* User */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      }}>
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: '#1e293b',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#6366f1',
          fontWeight: 600,
          fontSize: '13px',
        }}>
          {user?.firstname?.[0]?.toUpperCase() || '?'}
        </div>

        <button
          onClick={handleLogout}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#9ca3af',
            cursor: 'pointer',
            fontSize: '13px',
            padding: '6px 8px',
            borderRadius: '8px',
            transition: '0.2s'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.color = '#ef4444'
            e.currentTarget.style.background = 'rgba(239,68,68,0.15)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.color = '#9ca3af'
            e.currentTarget.style.background = 'transparent'
          }}
        >
          Sign out
        </button>
      </div>

    </div>
  )
}