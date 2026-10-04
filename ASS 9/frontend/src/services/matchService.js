import apiClient from './api';

// Get all matches
export const getAllMatches = async () => {
  try {
    const response = await apiClient.get('/matches');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get match by ID
export const getMatchById = async (matchId) => {
  try {
    const response = await apiClient.get(`/matches/${matchId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get live matches
export const getLiveMatches = async () => {
  try {
    const response = await apiClient.get('/matches?status=LIVE');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Create new match
export const createMatch = async (matchData) => {
  try {
    const response = await apiClient.post('/matches', matchData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update match status
export const updateMatchStatus = async (matchId, status) => {
  try {
    const response = await apiClient.put(`/matches/${matchId}/status`, { status });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete match
export const deleteMatch = async (matchId) => {
  try {
    const response = await apiClient.delete(`/matches/${matchId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get live match state
export const getLiveMatchState = async (matchId) => {
  try {
    const response = await apiClient.get(`/matches/${matchId}/live`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
