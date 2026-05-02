import { useState } from 'react'

export function Btn({ children, variant = 'primary', loading, fullWidth, ...props }) {

  const variants = {
    primary: {
      background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
      color: '#fff',
      border: 'none',
      boxShadow: '0 8px 20px rgba(99,102,241,0.25)',
    },
    ghost: {
      background: '#ffffff',
      color: '#374151',
      border: '1px solid #e5e7eb',
    },
    danger: {
      background: 'rgba(239,68,68,0.1)',
      color: '#ef4444',
      border: '1px solid rgba(239,68,68,0.2)',
    }
  }

  return (
    <button
      style={{
        ...variants[variant],
        padding: '12px 18px',
        borderRadius: '12px',
        fontWeight: 500,
        fontSize: '14px',
        transition: 'all 0.2s ease',
        width: fullWidth ? '100%' : 'auto',
        opacity: loading ? 0.7 : 1,
        cursor: loading ? 'wait' : 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
      }}
      onMouseEnter={e => {
        if (!loading) {
          e.currentTarget.style.transform = 'translateY(-2px)'
          e.currentTarget.style.boxShadow = '0 12px 28px rgba(99,102,241,0.3)'
        }
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = variants[variant].boxShadow || 'none'
      }}
      disabled={loading}
      {...props}
    >
      {loading && <Spinner size={14} />}
      {children}
    </button>
  )
}

export function Input({ label, error, ...props }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>

      {label && (
        <label style={{
          fontSize: '12px',
          color: '#6b7280',
          fontWeight: 500,
        }}>
          {label}
        </label>
      )}

      <input
        style={{
          background: '#ffffff',
          border: `1px solid ${error ? '#ef4444' : '#e5e7eb'}`,
          borderRadius: '10px',
          padding: '12px 14px',
          fontSize: '14px',
          transition: 'all 0.2s',
          width: '100%',
          outline: 'none',
        }}
        onFocus={e => {
          e.target.style.borderColor = '#6366f1'
          e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.1)'
        }}
        onBlur={e => {
          e.target.style.borderColor = error ? '#ef4444' : '#e5e7eb'
          e.target.style.boxShadow = 'none'
        }}
        {...props}
      />

      {error && (
        <span style={{ fontSize: '12px', color: '#ef4444' }}>
          {error}
        </span>
      )}

    </div>
  )
}

// ── Select ───────────────────────────────────────────────
export function Select({ label, children, ...props }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      {label && (
        <label style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          {label}
        </label>
      )}
      <select
        style={{
          background: 'var(--surface-2)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-sm)',
          padding: '10px 14px',
          color: 'var(--text)',
          fontSize: '14px',
          width: '100%',
          cursor: 'pointer',
        }}
        onFocus={e => e.target.style.borderColor = 'var(--accent)'}
        onBlur={e => e.target.style.borderColor = 'var(--border)'}
        {...props}
      >
        {children}
      </select>
    </div>
  )
}

// ── Card ─────────────────────────────────────────────────
export function Card({ children, style, glow }) {
  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius)',
      padding: '24px',
      boxShadow: glow ? 'var(--shadow-accent)' : 'none',
      transition: 'border-color 0.2s, box-shadow 0.2s',
      ...style
    }}>
      {children}
    </div>
  )
}

// ── Spinner ──────────────────────────────────────────────
export function Spinner({ size = 20 }) {
  return (
    <div style={{
      width: size,
      height: size,
      border: `2px solid var(--text-subtle)`,
      borderTop: `2px solid var(--accent)`,
      borderRadius: '50%',
      animation: 'spin 0.7s linear infinite',
      flexShrink: 0,
    }} />
  )
}

// ── Badge ────────────────────────────────────────────────
export function Badge({ children, color = 'accent' }) {
  const colors = {
    accent: { bg: 'var(--accent-dim)', text: 'var(--accent)', border: 'rgba(200,245,90,0.2)' },
    muted: { bg: 'rgba(255,255,255,0.05)', text: 'var(--text-muted)', border: 'var(--border)' },
    blue: { bg: 'rgba(100,160,255,0.12)', text: '#6aa0ff', border: 'rgba(100,160,255,0.2)' },
  }
  const c = colors[color] || colors.muted
  return (
    <span style={{
      background: c.bg,
      color: c.text,
      border: `1px solid ${c.border}`,
      borderRadius: '6px',
      padding: '2px 8px',
      fontSize: '11px',
      fontWeight: 600,
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
      fontFamily: 'var(--font-display)',
    }}>
      {children}
    </span>
  )
}

export function Toast({ message, type = 'success' }) {
  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      background: '#ffffff',
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      padding: '14px 18px',
      color: type === 'error' ? '#ef4444' : '#22c55e',
      fontSize: '14px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
      zIndex: 9999,
    }}>
      {message}
    </div>
  )
}

// ── Empty State ──────────────────────────────────────────
export function Empty({ icon, title, subtitle }) {
  return (
    <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
      <div style={{ fontSize: '40px', marginBottom: '12px', opacity: 0.4 }}>{icon}</div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', color: 'var(--text)', marginBottom: '6px' }}>{title}</div>
      <div style={{ fontSize: '14px' }}>{subtitle}</div>
    </div>
  )
}
