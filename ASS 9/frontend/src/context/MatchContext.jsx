import React, { createContext, useContext, useState, useCallback } from 'react';

/**
 * MatchContext provides global state management for cricket match data
 * Includes match details, innings, deliveries, and statistics
 */
const MatchContext = createContext(null);

export const MatchProvider = ({ children }) => {
  // Current match state
  const [currentMatch, setCurrentMatch] = useState(null);
  const [innings, setInnings] = useState([]);
  const [deliveries, setDeliveries] = useState([]);
  const [batsmanStats, setBatsmanStats] = useState([]);
  const [bowlerStats, setBowlerStats] = useState([]);
  const [sseEvents, setSseEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Update current match
  const updateMatch = useCallback((match) => {
    setCurrentMatch(match);
  }, []);

  // Update innings
  const updateInnings = useCallback((inningsList) => {
    setInnings(inningsList);
  }, []);

  // Add delivery (for real-time updates)
  const addDelivery = useCallback((delivery) => {
    setDeliveries((prev) => [...prev, delivery]);
  }, []);

  // Add SSE event (for real-time updates)
  const addSseEvent = useCallback((event) => {
    setSseEvents((prev) => [...prev, event]);
  }, []);

  // Update statistics
  const updateStatistics = useCallback((batsmen, bowlers) => {
    setBatsmanStats(batsmen);
    setBowlerStats(bowlers);
  }, []);

  // Clear match state
  const clearMatch = useCallback(() => {
    setCurrentMatch(null);
    setInnings([]);
    setDeliveries([]);
    setBatsmanStats([]);
    setBowlerStats([]);
    setSseEvents([]);
  }, []);

  const value = {
    // State
    currentMatch,
    innings,
    deliveries,
    batsmanStats,
    bowlerStats,
    sseEvents,
    isLoading,
    error,

    // Actions
    updateMatch,
    updateInnings,
    addDelivery,
    addSseEvent,
    updateStatistics,
    clearMatch,
    setIsLoading,
    setError,
  };

  return (
    <MatchContext.Provider value={value}>
      {children}
    </MatchContext.Provider>
  );
};

/**
 * Hook to use MatchContext
 */
export const useMatch = () => {
  const context = useContext(MatchContext);
  if (!context) {
    throw new Error('useMatch must be used within MatchProvider');
  }
  return context;
};
