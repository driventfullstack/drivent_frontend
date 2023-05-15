import useAsync from '../useAsync';
import useToken from '../useToken';
import * as paymentApi from '../../services/paymentApi';

export default async function useCreatePayment(body) {
  const token = useToken();
  
  const {
    loading: createPaymentLoading,
    error: createPaymentError,
    act: createPayment
  } = useAsync(() => paymentApi.createPayment(token, body), false);
  return {
    createPaymentLoading,
    createPaymentError,
    createPayment
  };
}

