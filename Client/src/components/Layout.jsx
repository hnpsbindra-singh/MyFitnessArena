import Dock from './Dock'
import ThemeToggle from './ThemeToggle'

export default function Layout({ children }) {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      background: 'var(--bg)',
      position: 'relative'
    }}>

      {/* Top Right Toggle */}
      <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 1000
      }}>
        <ThemeToggle />
      </div>

      {/* Main Content */}
      <div style={{
        width: '100%',
        maxWidth: '1100px',
        padding: '40px 20px',
      }}>
        {children}
      </div>

      <Dock />
    </div>
  )
}