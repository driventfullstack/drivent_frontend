import useAsync from '../useAsync';
import useToken from '../useToken';

import * as ticketApi from '../../services/ticketApi';

export default function useTickets() {
  const token = useToken();

  const response = useAsync(() => ticketApi.getTickets(token));

  return response;
}

export function useTicket() {
  const token = useToken();
  const { data: ticket, loading: ticketLoading, error: ticketError } = useAsync(() => ticketApi.getTickets(token));

  return {
    ticket,
    ticketLoading,
    ticketError,
  };
}

