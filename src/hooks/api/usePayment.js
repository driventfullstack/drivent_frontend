import useAsync from '../useAsync';
import * as paymentApi from '../../services/paymentApi';
import useToken from '../useToken';

export default async function usePayment(ticket) {
  const token = useToken();

  const {
    data: payment,
    loading: paymentLoading,
    error: paymentError,
    act: getPayment
  } = useAsync(() => paymentApi.getPayment(token, ticket.id));

  return {
    payment,
    paymentLoading,
    paymentError,
    getPayment
  };
}

