import apiClient from './api';

// Record a delivery (scoring event)
export const recordDelivery = async (deliveryData) => {
  try {
    const response = await apiClient.post('/deliveries', deliveryData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get recent deliveries for an innings
export const getRecentDeliveries = async (inningsId, limit = 10) => {
  try {
    const response = await apiClient.get(`/deliveries/innings/${inningsId}/recent`, {
      params: { limit }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get all deliveries for an innings
export const getInningsDeliveries = async (inningsId) => {
  try {
    const response = await apiClient.get(`/deliveries/innings/${inningsId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
