import { useEffect, useState } from "react"
import { api } from "../api"

export default function Insights() {
  const [data, setData] = useState(null)
const [adv, setAdv] = useState(null)
  useEffect(() => {
    api.getSummary()
      .then(setData)
      .catch(console.error)
  }, [])


useEffect(() => {
  api.getAdvancedInsights()
    .then(setAdv)
    .catch(console.error)
}, [])

  if (!data) return <div>Loading insights...</div>

  return (

    
    <div style={{ padding: "20px" }}>
      <h2>🔥 Your Insights</h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "16px",
        marginTop: "20px"
      }}>

        <Card title="Total Calories" value={`${data.totalCalories} kcal`} icon="🔥" />
        <Card title="Workouts" value={data.totalWorkouts} icon="⚡" />

      </div>
      <div style={{
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "16px",
  marginTop: "20px"
}}>

  <Card title="🔥 Streak" value={`${adv?.streak || 0} days`} icon="🔥" />
  <Card title="💪 Score" value={`${adv?.score || 0}/100`} icon="💪" />

</div>
    </div>
  )
}

function Card({ title, value, icon }) {
  return (
    <div style={{
      background: "#0f172a",
      borderRadius: "16px",
      padding: "20px",
      color: "white",
      boxShadow: "0 10px 25px rgba(0,0,0,0.3)"
    }}>
      <div style={{ fontSize: "14px", opacity: 0.7 }}>{title}</div>
      <div style={{ fontSize: "22px", fontWeight: "bold", marginTop: "8px" }}>
        {icon} {value}
      </div>
    </div>
  )
}