import { useState, useEffect } from 'react'
import { useMatch } from '../context/MatchContext'
import { matchService } from '../services'
import MatchList from './MatchList'
import MatchDetails from './MatchDetails'
import TeamManagement from './TeamManagement'
import PlayerManagement from './PlayerManagement'
import MatchCreation from './MatchCreation'
import './Dashboard.css'

export default function DashboardContainer() {
  const { updateMatch, setIsLoading, setError } = useMatch()
  const [activeTab, setActiveTab] = useState('live-matches')
  const [selectedMatchId, setSelectedMatchId] = useState(null)
  const [matches, setMatches] = useState([])

  // Fetch matches on tab change
  useEffect(() => {
    const fetchMatches = async () => {
      setIsLoading(true)
      try {
        let data
        if (activeTab === 'live-matches') {
          data = await matchService.getLiveMatches()
        } else {
          data = await matchService.getAllMatches()
        }
        setMatches(data)
      } catch (err) {
        setError('Failed to fetch matches')
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    if (activeTab === 'live-matches' || activeTab === 'all-matches') {
      fetchMatches()
    }
  }, [activeTab, setIsLoading, setError])

  const handleSelectMatch = (match) => {
    setSelectedMatchId(match.id)
    updateMatch(match)
    setActiveTab('match-details')  // Auto-switch to Match Details tab
  }

  return (
    <div className="dashboard">
      <div className="dashboard-tabs">
        <button
          className={`tab-button ${activeTab === 'live-matches' ? 'active' : ''}`}
          onClick={() => setActiveTab('live-matches')}
        >
          🔴 Live Matches
        </button>
        <button
          className={`tab-button ${activeTab === 'all-matches' ? 'active' : ''}`}
          onClick={() => setActiveTab('all-matches')}
        >
          📋 All Matches
        </button>
        <button
          className={`tab-button ${activeTab === 'create-match' ? 'active' : ''}`}
          onClick={() => setActiveTab('create-match')}
        >
          ⚡ Create Match
        </button>
        <button
          className={`tab-button ${activeTab === 'teams' ? 'active' : ''}`}
          onClick={() => setActiveTab('teams')}
        >
          👥 Teams
        </button>
        <button
          className={`tab-button ${activeTab === 'players' ? 'active' : ''}`}
          onClick={() => setActiveTab('players')}
        >
          🏏 Players
        </button>
        {selectedMatchId && (
          <button
            className={`tab-button ${activeTab === 'match-details' ? 'active' : ''}`}
            onClick={() => setActiveTab('match-details')}
          >
            📊 Match Details
          </button>
        )}
      </div>

      <div className="dashboard-content">
        {activeTab === 'live-matches' && (
          <MatchList
            matches={matches}
            onSelectMatch={handleSelectMatch}
            title="Live Matches"
          />
        )}

        {activeTab === 'all-matches' && (
          <MatchList
            matches={matches}
            onSelectMatch={handleSelectMatch}
            title="All Matches"
          />
        )}

        {activeTab === 'create-match' && (
          <MatchCreation />
        )}

        {activeTab === 'teams' && (
          <TeamManagement />
        )}

        {activeTab === 'players' && (
          <PlayerManagement />
        )}

        {activeTab === 'match-details' && selectedMatchId && (
          <MatchDetails matchId={selectedMatchId} />
        )}
      </div>
    </div>
  )
}
