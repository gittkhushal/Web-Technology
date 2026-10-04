import { useState, useEffect } from 'react'
import { matchService, teamService } from '../services'
import './MatchCreation.css'

export default function MatchCreation() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    team1Id: '',
    team2Id: '',
    matchType: 'ODI',
    venue: '',
    matchDate: '',
    status: 'SCHEDULED',
  })

  useEffect(() => {
    loadTeams()
  }, [])

  const loadTeams = async () => {
    try {
      const data = await teamService.getAllTeams()
      setTeams(data)
    } catch (err) {
      setError('Failed to load teams')
      console.error(err)
    }
  }

  const handleCreateMatch = async (e) => {
    e.preventDefault()

    if (!formData.team1Id || !formData.team2Id) {
      setError('Please select both teams')
      return
    }

    if (formData.team1Id === formData.team2Id) {
      setError('Teams must be different')
      return
    }

    if (!formData.venue.trim()) {
      setError('Venue is required')
      return
    }

    if (!formData.matchDate) {
      setError('Match date and time is required')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const matchData = {
        team1Id: parseInt(formData.team1Id),
        team2Id: parseInt(formData.team2Id),
        matchType: formData.matchType,
        venue: formData.venue,
        matchDate: new Date(formData.matchDate).toISOString(),
        status: formData.status,
      }

      const response = await matchService.createMatch(matchData)
      alert(`Match created successfully! Match ID: ${response.id}`)

      // Reset form
      setFormData({
        team1Id: '',
        team2Id: '',
        matchType: 'ODI',
        venue: '',
        matchDate: '',
        status: 'SCHEDULED',
      })
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create match')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="match-creation">
      <div className="creation-header">
        <h2>Create a New Match</h2>
        <p>Set up a cricket match between two teams</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      <form className="match-form" onSubmit={handleCreateMatch}>
        <div className="form-row">
          <div className="form-group">
            <label>Team 1</label>
            <select
              value={formData.team1Id}
              onChange={(e) => setFormData({ ...formData, team1Id: e.target.value })}
            >
              <option value="">Select Team 1</option>
              {teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name} ({team.shortName})
                </option>
              ))}
            </select>
          </div>

          <div className="vs-separator">VS</div>

          <div className="form-group">
            <label>Team 2</label>
            <select
              value={formData.team2Id}
              onChange={(e) => setFormData({ ...formData, team2Id: e.target.value })}
            >
              <option value="">Select Team 2</option>
              {teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name} ({team.shortName})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Match Type</label>
            <select
              value={formData.matchType}
              onChange={(e) => setFormData({ ...formData, matchType: e.target.value })}
            >
              <option value="TEST">Test</option>
              <option value="ODI">ODI</option>
              <option value="T20">T20</option>
              <option value="T10">T10</option>
            </select>
          </div>

          <div className="form-group">
            <label>Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="SCHEDULED">Scheduled</option>
              <option value="LIVE">Live</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Venue</label>
          <input
            type="text"
            value={formData.venue}
            onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
            placeholder="Enter match venue (e.g., Wankhede Stadium, Mumbai)"
          />
        </div>

        <div className="form-group">
          <label>Match Date & Time</label>
          <input
            type="datetime-local"
            value={formData.matchDate}
            onChange={(e) => setFormData({ ...formData, matchDate: e.target.value })}
          />
        </div>

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Creating Match...' : '⚡ Create Match'}
        </button>
      </form>

      <div className="info-box">
        <h3>Match Status Explanation:</h3>
        <ul>
          <li><strong>Scheduled:</strong> Match not yet started</li>
          <li><strong>Live:</strong> Match is currently in progress</li>
          <li><strong>Completed:</strong> Match has finished</li>
        </ul>
      </div>
    </div>
  )
}
