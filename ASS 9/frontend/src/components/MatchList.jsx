import './MatchList.css'

export default function MatchList({ matches, onSelectMatch, title }) {
  if (!matches || matches.length === 0) {
    return (
      <div className="match-list">
        <h2>{title}</h2>
        <div className="empty-state">
          <p>No matches found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="match-list">
      <h2>{title}</h2>
      <div className="matches-grid">
        {matches.map((match) => (
          <div key={match.id} className="match-card" onClick={() => onSelectMatch(match)}>
            <div className="match-header">
              <span className={`status-badge ${match.status?.toLowerCase()}`}>
                {match.status}
              </span>
              <span className="match-format">{match.matchType || match.format || 'Cricket'}</span>
            </div>

            <div className="match-teams">
              <div className="team">
                <h3>{match.team1Name || match.team1?.name || 'Team 1'}</h3>
              </div>
              <span className="vs">vs</span>
              <div className="team">
                <h3>{match.team2Name || match.team2?.name || 'Team 2'}</h3>
              </div>
            </div>

            <div className="match-venue">
              <p>📍 {match.venue}</p>
            </div>

            <div className="match-date">
              <p>{new Date(match.matchDate).toLocaleString()}</p>
            </div>

            <button className="view-button">View Details →</button>
          </div>
        ))}
      </div>
    </div>
  )
}
