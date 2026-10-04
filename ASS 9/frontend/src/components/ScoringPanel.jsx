import { useState, useEffect } from 'react'
import { scoringService, playerService } from '../services'
import './ScoringPanel.css'

export default function ScoringPanel({ inningsId, match }) {
  const [selectedBatsman, setSelectedBatsman] = useState(null)
  const [selectedBowler, setSelectedBowler] = useState(null)
  const [ballType, setBallType] = useState('LEGAL')
  const [runs, setRuns] = useState(0)
  const [isWicket, setIsWicket] = useState(false)
  const [wicketType, setWicketType] = useState('BOWLED')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [batsmenList, setBatsmenList] = useState([])
  const [bowlersList, setBowlersList] = useState([])
  const [loadingPlayers, setLoadingPlayers] = useState(false)

  const LEGAL_BALL_RUNS = [0, 1, 2, 3, 4, 5, 6]
  const BALL_TYPES = ['LEGAL', 'WIDE', 'NO_BALL', 'BYE', 'LEG_BYE']
  const WICKET_TYPES = ['BOWLED', 'CAUGHT', 'LBW', 'RUN_OUT', 'STUMPED', 'HIT_WICKET']

  // Load players when component mounts or match changes
  useEffect(() => {
    if (!match) return

    const loadPlayers = async () => {
      setLoadingPlayers(true)
      try {
        const team1Players = await playerService.getPlayersByTeam(match.team1?.id)
        const team2Players = await playerService.getPlayersByTeam(match.team2?.id)
        
        // Batsmen are from batting team (you'd need to track this)
        // For now, show players from both teams
        setBatsmenList(team1Players)
        setBowlersList(team2Players)
      } catch (err) {
        console.error('Failed to load players:', err)
      } finally {
        setLoadingPlayers(false)
      }
    }

    loadPlayers()
  }, [match])

  const handleRecordDelivery = async () => {
    if (!selectedBatsman || !selectedBowler) {
      setError('Please select batsman and bowler')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const deliveryData = {
        inningsId,
        batsmanId: selectedBatsman,
        bowlerId: selectedBowler,
        ballType,
        runsScored: runs,
        isWicket,
        wicketType: isWicket ? wicketType : null,
      }

      await scoringService.recordDelivery(deliveryData)

      // Reset form
      setRuns(0)
      setIsWicket(false)
      setBallType('LEGAL')
      setWicketType('BOWLED')
    } catch (err) {
      setError('Failed to record delivery')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="scoring-panel">
      <h3>Record Delivery</h3>

      {error && <div className="error-message">{error}</div>}

      <div className="form-group">
        <label>Batsman</label>
        <select
          value={selectedBatsman || ''}
          onChange={(e) => setSelectedBatsman(e.target.value ? parseInt(e.target.value) : null)}
        >
          <option value="">Select Batsman</option>
          {batsmenList.map((player) => (
            <option key={player.id} value={player.id}>
              {player.name} ({player.role})
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Bowler</label>
        <select
          value={selectedBowler || ''}
          onChange={(e) => setSelectedBowler(e.target.value ? parseInt(e.target.value) : null)}
        >
          <option value="">Select Bowler</option>
          {bowlersList.map((player) => (
            <option key={player.id} value={player.id}>
              {player.name} ({player.role})
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Ball Type</label>
        <select value={ballType} onChange={(e) => setBallType(e.target.value)}>
          {BALL_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Runs</label>
        <div className="runs-buttons">
          {LEGAL_BALL_RUNS.map((run) => (
            <button
              key={run}
              className={`run-button ${runs === run ? 'active' : ''}`}
              onClick={() => setRuns(run)}
            >
              {run}
            </button>
          ))}
        </div>
      </div>

      <div className="form-group checkbox">
        <label>
          <input
            type="checkbox"
            checked={isWicket}
            onChange={(e) => setIsWicket(e.target.checked)}
          />
          Wicket
        </label>
      </div>

      {isWicket && (
        <div className="form-group">
          <label>Wicket Type</label>
          <select value={wicketType} onChange={(e) => setWicketType(e.target.value)}>
            {WICKET_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      )}

      <button
        className="submit-button"
        onClick={handleRecordDelivery}
        disabled={loading || !selectedBatsman || !selectedBowler || loadingPlayers}
      >
        {loading ? 'Recording...' : 'Record Delivery'}
      </button>
    </div>
  )
}
