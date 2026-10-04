import apiClient from './api';

// Get all innings
export const getAllInnings = async () => {
  try {
    const response = await apiClient.get('/innings');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get innings by ID
export const getInningsById = async (inningsId) => {
  try {
    const response = await apiClient.get(`/innings/${inningsId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get innings by match ID
export const getInningsByMatch = async (matchId) => {
  try {
    const response = await apiClient.get(`/innings/match/${matchId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Create new innings
export const createInnings = async (inningsData) => {
  try {
    const response = await apiClient.post('/innings', inningsData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update innings
export const updateInnings = async (inningsId, inningsData) => {
  try {
    const response = await apiClient.put(`/innings/${inningsId}`, inningsData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete innings
export const deleteInnings = async (inningsId) => {
  try {
    const response = await apiClient.delete(`/innings/${inningsId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
