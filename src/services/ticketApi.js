import api from './api';

export async function chooseOption(ticketType, token) {
  const response = await api.post('/tickets/types', ticketType, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
