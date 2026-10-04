import { useState, useEffect } from 'react'
import { MatchProvider } from './context/MatchContext'
import DashboardContainer from './components/Dashboard'
import './App.css'

function App() {
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    // Check if backend is accessible
    const checkBackend = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/matches')
        if (response.ok) {
          setIsConnected(true)
        }
      } catch (err) {
        console.error('Backend not accessible:', err)
        setIsConnected(false)
      }
    }

    checkBackend()
    const interval = setInterval(checkBackend, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <MatchProvider>
      <div className="App">
        <header className="app-header">
          <h1>🏏 Cricket Score Manager</h1>
          <div className="connection-status">
            <span className={`status-indicator ${isConnected ? 'connected' : 'disconnected'}`}></span>
            <span className="status-text">
              {isConnected ? 'Backend Connected' : 'Backend Disconnected'}
            </span>
          </div>
        </header>
        {isConnected ? (
          <DashboardContainer />
        ) : (
          <div className="connection-error">
            <h2>⚠️ Cannot connect to backend</h2>
            <p>Make sure the backend is running on <code>http://localhost:8080</code></p>
            <p>Run: <code>mvnw.cmd spring-boot:run</code> in the backend directory</p>
          </div>
        )}
      </div>
    </MatchProvider>
  )
}

export default App
