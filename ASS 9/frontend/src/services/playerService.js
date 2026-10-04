import apiClient from './api';

// Get all players
export const getAllPlayers = async () => {
  try {
    const response = await apiClient.get('/players');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get player by ID
export const getPlayerById = async (playerId) => {
  try {
    const response = await apiClient.get(`/players/${playerId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get players by team ID
export const getPlayersByTeam = async (teamId) => {
  try {
    const response = await apiClient.get(`/players/team/${teamId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Create new player
export const createPlayer = async (playerData) => {
  try {
    const response = await apiClient.post('/players', playerData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update player
export const updatePlayer = async (playerId, playerData) => {
  try {
    const response = await apiClient.put(`/players/${playerId}`, playerData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete player
export const deletePlayer = async (playerId) => {
  try {
    const response = await apiClient.delete(`/players/${playerId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
