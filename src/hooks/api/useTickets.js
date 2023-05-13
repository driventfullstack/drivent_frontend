import useAsync from '../useAsync';
import useToken from '../useToken';

import * as ticketApi from '../../services/ticketApi';

export default function useTickets() {
  const token = useToken();

  const response = useAsync(() => ticketApi.getTickets(token));

  return response;
}
