import useAsync from '../useAsync';
import useToken from '../useToken';

import * as ticketTypeApi from '../../services/ticketTypesApi';

export default function useTicketTypes() {
  const token = useToken();

  const response = useAsync(() => ticketTypeApi.getTicketTypes(token));

  return response;
}
