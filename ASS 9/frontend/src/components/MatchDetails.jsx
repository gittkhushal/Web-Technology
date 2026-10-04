import { useState, useEffect, useCallback } from 'react'
import { useMatch } from '../context/MatchContext'
import { matchService, inningsService, statisticsService } from '../services'
import { useMatchSSE } from '../hooks'
import InningsCreation from './InningsCreation'
import ScoringPanel from './ScoringPanel'
import './MatchDetails.css'

export default function MatchDetails({ matchId }) {
  const { currentMatch, innings, updateMatch, updateInnings } = useMatch()
  const { events, isConnected } = useMatchSSE(matchId)
  const [activeInnings, setActiveInnings] = useState(null)
  const [batsmanStats, setBatsmanStats] = useState([])
  const [bowlerStats, setBowlerStats] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Load match details - use useCallback so it can be called from child components
  const loadMatchDetails = useCallback(async () => {
    setLoading(true)
    try {
      const match = await matchService.getMatchById(matchId)
      updateMatch(match)

      const inningsList = await inningsService.getInningsByMatch(matchId)
      updateInnings(inningsList)

      if (inningsList.length > 0) {
        setActiveInnings(inningsList[inningsList.length - 1])
      }
    } catch (err) {
      setError('Failed to load match details')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [matchId, updateMatch, updateInnings])

  // Load match details on mount
  useEffect(() => {
    loadMatchDetails()
  }, [loadMatchDetails])

  // Update statistics when active innings changes
  useEffect(() => {
    if (!activeInnings) return

    const loadStats = async () => {
      try {
        const batsmen = await statisticsService.getBatsmanStats(activeInnings.id)
        const bowlers = await statisticsService.getBowlerStats(activeInnings.id)
        setBatsmanStats(batsmen)
        setBowlerStats(bowlers)
      } catch (err) {
        console.error('Failed to load statistics:', err)
      }
    }

    loadStats()
  }, [activeInnings])

  if (loading) return <div className="match-details"><p>Loading...</p></div>
  if (error) return <div className="match-details error"><p>{error}</p></div>
  if (!currentMatch) return <div className="match-details"><p>No match data</p></div>

  return (
    <div className="match-details">
      <div className="match-header-detail">
        <h2>{currentMatch.team1Name} vs {currentMatch.team2Name}</h2>
        <div className="match-meta">
          <span className={`status ${currentMatch.status?.toLowerCase()}`}>
            {currentMatch.status}
          </span>
          <span className="connection-indicator">
            {isConnected ? '✓ Live' : '○ Offline'}
          </span>
        </div>
      </div>

      <div className="match-content">
        <div className="innings-section">
          <h3>Innings</h3>
          {innings.length === 0 ? (
            <InningsCreation
              matchId={matchId}
              currentMatch={currentMatch}
              onInningsCreated={loadMatchDetails}
            />
          ) : (
            <>
              {innings.map((inning) => (
                <div
                  key={inning.id}
                  className={`innings-tab ${activeInnings?.id === inning.id ? 'active' : ''}`}
                  onClick={() => setActiveInnings(inning)}
                >
                  <span>{inning.battingTeam?.name}</span>
                  <span className="runs">{inning.totalRuns || 0}/{inning.wicketsLost || 0}</span>
                  <span className="overs">{inning.totalOvers || 0}</span>
                </div>
              ))}
              <InningsCreation
                matchId={matchId}
                currentMatch={currentMatch}
                onInningsCreated={loadMatchDetails}
              />
            </>
          )}
        </div>

        {activeInnings && (
          <div className="active-innings-details">
            <div className="scoring-section">
              <ScoringPanel inningsId={activeInnings.id} match={currentMatch} />
            </div>

            <div className="statistics-section">
              <div className="stats">
                <h4>Batsmen Statistics</h4>
                <table className="stats-table">
                  <thead>
                    <tr>
                      <th>Player</th>
                      <th>Runs</th>
                      <th>Balls</th>
                      <th>SR</th>
                    </tr>
                  </thead>
                  <tbody>
                    {batsmanStats.map((stat) => (
                      <tr key={stat.playerId}>
                        <td>{stat.playerName}</td>
                        <td>{stat.runsScored}</td>
                        <td>{stat.ballsFaced}</td>
                        <td>{stat.strikeRate?.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="stats">
                <h4>Bowlers Statistics</h4>
                <table className="stats-table">
                  <thead>
                    <tr>
                      <th>Player</th>
                      <th>Runs</th>
                      <th>Wickets</th>
                      <th>Overs</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bowlerStats.map((stat) => (
                      <tr key={stat.playerId}>
                        <td>{stat.playerName}</td>
                        <td>{stat.runsGiven}</td>
                        <td>{stat.wickets}</td>
                        <td>{stat.oversBowled}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {events.length > 0 && (
        <div className="events-log">
          <h4>Recent Events ({events.length})</h4>
          <div className="events-list">
            {events.slice(-10).map((event, idx) => (
              <div key={idx} className="event-item">
                <span className="event-type">{event.type}</span>
                <span className="event-description">{event.description}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
