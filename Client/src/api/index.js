const BASE = 'http://localhost:8080/api'

function getToken() {
  return localStorage.getItem('fit_token')
}

function authHeaders() {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getToken()}`
  }
}

async function handle(res) {
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || `Error ${res.status}`)
  }
  return res.json()
}

// Auth
export const api = {
  register: (data) =>
    fetch(`${BASE}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(handle),

  login: (data) =>
    fetch(`${BASE}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(handle),

 getActivities: (userId) => {
  const token = localStorage.getItem("fit_token")

  console.log("TOKEN USED:", token)

  return fetch("http://localhost:8080/api/activities", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
      "X-User-ID": userId
    }
  }).then(handle)
},

getAdvancedInsights: () => {
  const token = localStorage.getItem("fit_token")

  return fetch(`http://localhost:8080/api/activities/insights/advanced`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(handle)
},
getSummary: () => {
  const token = localStorage.getItem("fit_token")

  return fetch(`http://localhost:8080/api/activities/insights/summary`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(handle)
}
,
  createActivity: (data) =>
    fetch(`${BASE}/activities`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(data)
    }).then(handle),

  // Recommendations
  getRecommendationsByUser: (userId) =>
    fetch(`${BASE}/recommendation/user/${userId}`, {
      headers: authHeaders()
    }).then(handle),

  getRecommendationsByActivity: (activityId) =>
    fetch(`${BASE}/recommendation/activity/${activityId}`, {
      headers: authHeaders()
    }).then(handle),

  generateRecommendation: (data) =>
    fetch(`${BASE}/recommendation/generate`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(data)
    }).then(handle),
}
