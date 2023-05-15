import api from "./api";
import { getTickets } from "./ticketApi";

export async function createPayment(token, body) {
    const response = await api.post('/payments/process', body, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
}

export async function getPayment(token) {
    const ticket = await getTickets(token);
    const response = await api.get(`/payments?ticketId=${ticket.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    return response.data;
  };
//