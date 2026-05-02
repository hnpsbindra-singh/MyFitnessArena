export default function Background() {
  return (
    <>
      {/* Grid pattern */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
        pointerEvents: 'none',
      }} />

      {/* Glow blobs */}
      <div style={{
        position: 'absolute',
        top: '-150px',
        left: '-150px',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(99,102,241,0.12), transparent 70%)',
      }} />

      <div style={{
        position: 'absolute',
        bottom: '-150px',
        right: '-150px',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(34,197,94,0.12), transparent 70%)',
      }} />

      {/* Soft center glow */}
      <div style={{
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '500px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(99,102,241,0.08), transparent 70%)',
      }} />

      {/* Ultra subtle fitness words */}
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '80px',
        fontWeight: 800,
        color: 'rgba(0,0,0,0.02)',
        userSelect: 'none',
        pointerEvents: 'none',
      }}>
        TRAIN
      </div>
    </>
  )
}