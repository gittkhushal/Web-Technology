import { useState, useEffect } from 'react'
import { playerService, teamService } from '../services'
import './PlayerManagement.css'

export default function PlayerManagement() {
  const [players, setPlayers] = useState([])
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedTeam, setSelectedTeam] = useState(null)
  const [newPlayer, setNewPlayer] = useState({ name: '', role: '', jerseyNumber: '', teamId: '' })
  const [showForm, setShowForm] = useState(false)

  // Load teams and players on mount
  useEffect(() => {
    loadTeams()
    loadPlayers()
  }, [])

  const loadTeams = async () => {
    try {
      const data = await teamService.getAllTeams()
      setTeams(data)
      if (data.length > 0 && !selectedTeam) {
        setSelectedTeam(data[0].id)
      }
    } catch (err) {
      console.error('Failed to load teams:', err)
    }
  }

  const loadPlayers = async () => {
    setLoading(true)
    setError(null)
    try {
      let data
      if (selectedTeam) {
        data = await playerService.getPlayersByTeam(selectedTeam)
      } else {
        data = await playerService.getAllPlayers()
      }
      setPlayers(data)
    } catch (err) {
      setError('Failed to load players')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPlayers()
  }, [selectedTeam])

  const handleCreatePlayer = async (e) => {
    e.preventDefault()

    if (!newPlayer.name.trim() || !newPlayer.role.trim() || !newPlayer.jerseyNumber) {
      setError('All fields are required')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const playerData = {
        name: newPlayer.name,
        role: newPlayer.role,
        jerseyNumber: parseInt(newPlayer.jerseyNumber),
        teamId: selectedTeam,
      }
      await playerService.createPlayer(playerData)
      setNewPlayer({ name: '', role: '', jerseyNumber: '', teamId: '' })
      setShowForm(false)
      loadPlayers()
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create player')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDeletePlayer = async (playerId) => {
    if (!window.confirm('Are you sure you want to delete this player?')) return

    setLoading(true)
    try {
      await playerService.deletePlayer(playerId)
      loadPlayers()
    } catch (err) {
      setError('Failed to delete player')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="player-management">
      <div className="player-header">
        <h2>Players Management</h2>
        <button className="add-button" onClick={() => setShowForm(!showForm)}>
          {showForm ? '✕ Cancel' : '+ Add Player'}
        </button>
      </div>

      <div className="team-filter">
        <label>Select Team:</label>
        <select value={selectedTeam || ''} onChange={(e) => setSelectedTeam(e.target.value ? parseInt(e.target.value) : null)}>
          <option value="">All Teams</option>
          {teams.map((team) => (
            <option key={team.id} value={team.id}>
              {team.name} ({team.shortName})
            </option>
          ))}
        </select>
      </div>

      {error && <div className="error-message">{error}</div>}

      {showForm && (
        <form className="player-form" onSubmit={handleCreatePlayer}>
          <div className="form-group">
            <label>Player Name</label>
            <input
              type="text"
              value={newPlayer.name}
              onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
              placeholder="Enter player name"
            />
          </div>
          <div className="form-group">
            <label>Role</label>
            <select value={newPlayer.role} onChange={(e) => setNewPlayer({ ...newPlayer, role: e.target.value })}>
              <option value="">Select Role</option>
              <option value="BATSMAN">Batsman</option>
              <option value="BOWLER">Bowler</option>
              <option value="ALL_ROUNDER">All-Rounder</option>
              <option value="WICKET_KEEPER">Wicket Keeper</option>
            </select>
          </div>
          <div className="form-group">
            <label>Jersey Number</label>
            <input
              type="number"
              value={newPlayer.jerseyNumber}
              onChange={(e) => setNewPlayer({ ...newPlayer, jerseyNumber: e.target.value })}
              placeholder="1-99"
              min="1"
              max="99"
            />
          </div>
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Creating...' : 'Create Player'}
          </button>
        </form>
      )}

      <div className="players-grid">
        {loading && !players.length && <p>Loading players...</p>}
        {!loading && players.length === 0 && <p>No players yet for this team.</p>}

        {players.map((player) => (
          <div key={player.id} className="player-card">
            <div className="player-info">
              <div className="jersey-number">{player.jerseyNumber}</div>
              <h3>{player.name}</h3>
              <p className="role">{player.role}</p>
              <p className="player-id">ID: {player.id}</p>
            </div>
            <button
              className="delete-button"
              onClick={() => handleDeletePlayer(player.id)}
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
