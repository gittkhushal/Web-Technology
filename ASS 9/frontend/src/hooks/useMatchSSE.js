import { useEffect, useState, useCallback } from 'react';

/**
 * Custom hook for Server-Sent Events (SSE) integration
 * Connects to the backend SSE endpoint for real-time match updates
 * @param {number} matchId - The match ID to subscribe to
 * @returns {object} { events, isConnected, error, disconnect }
 */
export const useMatchSSE = (matchId) => {
  const [events, setEvents] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);
  const [eventSource, setEventSource] = useState(null);

  const disconnect = useCallback(() => {
    if (eventSource) {
      eventSource.close();
      setEventSource(null);
      setIsConnected(false);
    }
  }, [eventSource]);

  useEffect(() => {
    if (!matchId) return;

    try {
      // Create EventSource connection to SSE endpoint
      const url = `http://localhost:8080/api/matches/${matchId}/events`;
      const newEventSource = new EventSource(url);

      // Handle incoming events
      newEventSource.onmessage = (event) => {
        try {
          const eventData = JSON.parse(event.data);
          setEvents((prev) => [...prev, eventData]);
        } catch (err) {
          console.error('Error parsing SSE event:', err);
        }
      };

      // Handle connection open
      newEventSource.onopen = () => {
        setIsConnected(true);
        setError(null);
        console.log('SSE connection established for match:', matchId);
      };

      // Handle errors
      newEventSource.onerror = (err) => {
        console.error('SSE error:', err);
        setError('Connection error');
        setIsConnected(false);
        newEventSource.close();
      };

      setEventSource(newEventSource);

      // Cleanup on unmount or matchId change
      return () => {
        newEventSource.close();
      };
    } catch (err) {
      setError(err.message);
      console.error('Failed to establish SSE connection:', err);
    }
  }, [matchId]);

  return {
    events,
    isConnected,
    error,
    disconnect,
  };
};
