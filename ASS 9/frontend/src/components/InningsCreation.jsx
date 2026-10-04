import { useState } from 'react'
import { inningsService } from '../services'
import './InningsCreation.css'

export default function InningsCreation({ matchId, currentMatch, onInningsCreated }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [battingTeamId, setBattingTeamId] = useState('')
  const [inningsNumber, setInningsNumber] = useState(1)

  const handleCreateInnings = async (e) => {
    e.preventDefault()

    if (!battingTeamId) {
      setError('Please select batting team')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const inningsData = {
        matchId: matchId,
        battingTeamId: parseInt(battingTeamId),
        inningsNumber: parseInt(inningsNumber),
      }

      await inningsService.createInnings(inningsData)
      alert(`Innings ${inningsNumber} created successfully!`)

      // Reset form
      setBattingTeamId('')
      setInningsNumber(inningsNumber + 1)

      // Refresh innings list
      if (onInningsCreated) {
        onInningsCreated()
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create innings')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (!currentMatch) return null

  return (
    <div className="innings-creation">
      <h3>Start New Innings</h3>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleCreateInnings}>
        <div className="form-group">
          <label>Batting Team</label>
          <div className="team-options">
            <label className="team-option">
              <input
                type="radio"
                value={currentMatch.team1Id}
                checked={battingTeamId === String(currentMatch.team1Id)}
                onChange={(e) => setBattingTeamId(e.target.value)}
              />
              <span>{currentMatch.team1Name}</span>
            </label>
            <label className="team-option">
              <input
                type="radio"
                value={currentMatch.team2Id}
                checked={battingTeamId === String(currentMatch.team2Id)}
                onChange={(e) => setBattingTeamId(e.target.value)}
              />
              <span>{currentMatch.team2Name}</span>
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>Innings Number</label>
          <input
            type="number"
            value={inningsNumber}
            onChange={(e) => setInningsNumber(e.target.value)}
            min="1"
            max="4"
            disabled
          />
          <small>Auto-incremented based on previous innings</small>
        </div>

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Creating...' : '▶ Start Innings'}
        </button>
      </form>
    </div>
  )
}
