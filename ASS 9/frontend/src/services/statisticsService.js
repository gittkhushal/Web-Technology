import apiClient from './api';

// Get batsman statistics for an innings
export const getBatsmanStats = async (inningsId) => {
  try {
    const response = await apiClient.get(`/statistics/batsmen/innings/${inningsId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get bowler statistics for an innings
export const getBowlerStats = async (inningsId) => {
  try {
    const response = await apiClient.get(`/statistics/bowlers/innings/${inningsId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
