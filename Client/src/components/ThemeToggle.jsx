import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    if (saved === 'dark') {
      document.documentElement.classList.add('dark')
      setDark(true)
    }
  }, [])

  const toggle = () => {
    if (dark) {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    } else {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    }
    setDark(!dark)
  }

  return (
    <button
      onClick={toggle}
      style={{
        borderRadius: '10px',
        padding: '8px 12px',
        fontSize: '13px',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        color: 'var(--text)',
      }}
    >
      {dark ? '☀ Light' : '🌙 Dark'}
    </button>
  )
}