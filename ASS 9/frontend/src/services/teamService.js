import apiClient from './api';

// Get all teams
export const getAllTeams = async () => {
  try {
    const response = await apiClient.get('/teams');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get team by ID
export const getTeamById = async (teamId) => {
  try {
    const response = await apiClient.get(`/teams/${teamId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Create new team
export const createTeam = async (teamData) => {
  try {
    const response = await apiClient.post('/teams', teamData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update team
export const updateTeam = async (teamId, teamData) => {
  try {
    const response = await apiClient.put(`/teams/${teamId}`, teamData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete team
export const deleteTeam = async (teamId) => {
  try {
    const response = await apiClient.delete(`/teams/${teamId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
