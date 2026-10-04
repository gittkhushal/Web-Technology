import { useState, useEffect } from 'react'
import { teamService } from '../services'
import './TeamManagement.css'

export default function TeamManagement() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [newTeam, setNewTeam] = useState({ name: '', shortName: '' })
  const [showForm, setShowForm] = useState(false)

  // Load teams on mount
  useEffect(() => {
    loadTeams()
  }, [])

  const loadTeams = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await teamService.getAllTeams()
      setTeams(data)
    } catch (err) {
      setError('Failed to load teams')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateTeam = async (e) => {
    e.preventDefault()

    if (!newTeam.name.trim()) {
      setError('Team name is required')
      return
    }

    setLoading(true)
    setError(null)

    try {
      await teamService.createTeam(newTeam)
      setNewTeam({ name: '', shortName: '' })
      setShowForm(false)
      loadTeams()
    } catch (err) {
      setError('Failed to create team')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteTeam = async (teamId) => {
    if (!window.confirm('Are you sure you want to delete this team?')) return

    setLoading(true)
    try {
      await teamService.deleteTeam(teamId)
      loadTeams()
    } catch (err) {
      setError('Failed to delete team')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="team-management">
      <div className="team-header">
        <h2>Teams Management</h2>
        <button className="add-button" onClick={() => setShowForm(!showForm)}>
          {showForm ? '✕ Cancel' : '+ Add Team'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {showForm && (
        <form className="team-form" onSubmit={handleCreateTeam}>
          <div className="form-group">
            <label>Team Name</label>
            <input
              type="text"
              value={newTeam.name}
              onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
              placeholder="Enter team name (e.g., Mumbai Indians)"
            />
          </div>
          <div className="form-group">
            <label>Short Name</label>
            <input
              type="text"
              value={newTeam.shortName}
              onChange={(e) => setNewTeam({ ...newTeam, shortName: e.target.value })}
              placeholder="Short name max 10 chars (e.g., MI)"
              maxLength="10"
            />
          </div>
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Creating...' : 'Create Team'}
          </button>
        </form>
      )}

      <div className="teams-grid">
        {loading && !teams.length && <p>Loading teams...</p>}
        {!loading && teams.length === 0 && <p>No teams yet. Create one to get started!</p>}

        {teams.map((team) => (
          <div key={team.id} className="team-card">
            <div className="team-info">
              <h3>{team.name}</h3>
              {team.shortName && <p className="short-name">{team.shortName}</p>}
              <p className="team-id">ID: {team.id}</p>
            </div>
            <button
              className="delete-button"
              onClick={() => handleDeleteTeam(team.id)}
              disabled={loading}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
